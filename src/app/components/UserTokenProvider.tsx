'use client'

import { useDispatch, useSelector } from 'react-redux'
import { store } from '../redux/store/configureStore'
import { useEffect, useState } from 'react'
import { refreshTokenAction } from '@/app/redux/slice/user/userSlice/refreshTokenAction'
import { RootState } from '@/app/redux/store/rootReducer'
import { useRouter } from 'next/navigation'
import {
  resetNeedToPushToHome,
  resetNeedToPushToLogin,
  setTokensAction,
} from '../redux/slice/user/userSlice/userSlice'

// Get the specific dispatch type from the store
type AppDispatch = typeof store.dispatch

export default function UserTokenProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const { accessToken, refreshToken, needToPushToHome, needToPushToLogin } =
    useSelector((state: RootState) => state.user)

  const [loadedTokenFromLocalStorage, setLoadedTokenFromLocalStorage] =
    useState<boolean>(false)

  useEffect(() => {
    if (!loadedTokenFromLocalStorage) {
      const storedAccessToken = localStorage.getItem('accessToken')
      const storedRefreshToken = localStorage.getItem('refreshToken')

      if (storedAccessToken && storedRefreshToken) {
        // Dispatch an action to set the tokens in your state or context
        dispatch(
          setTokensAction({
            accessToken: storedAccessToken,
            refreshToken: storedRefreshToken,
          }),
        )
      }
      setLoadedTokenFromLocalStorage(true)
    }
  }, [dispatch, loadedTokenFromLocalStorage])

  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    }
    if (!accessToken && !refreshToken) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }, [accessToken, refreshToken, router])

  useEffect(() => {
    if (needToPushToHome) {
      router.push('/')
      dispatch(resetNeedToPushToHome())
    }
  }, [dispatch, needToPushToHome, router])

  useEffect(() => {
    if (needToPushToLogin) {
      router.push('/user/login')
      dispatch(resetNeedToPushToLogin())
    }
  }, [dispatch, needToPushToLogin, router])

  useEffect(() => {
    if (refreshToken) {
      dispatch(refreshTokenAction({ refreshToken: refreshToken }))
      const interval = setInterval(() => {
        if (refreshToken) {
          dispatch(refreshTokenAction({ refreshToken: refreshToken }))
        }
      }, 180000) // 180000 milliseconds = 3 minutes

      return () => {
        clearInterval(interval)
      }
    }
  }, [dispatch, refreshToken])

  if (!loadedTokenFromLocalStorage) {
    return <div>Loading...</div>
  }

  return <div>{children}</div>
}
