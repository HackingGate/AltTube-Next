'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store/rootReducer'
import { store } from '../redux/store/configureStore'
import { logoutUserAction } from '@/app/redux/slice/user/logoutUserAction'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { refreshTokenAction } from '@/app/redux/slice/user/refreshTokenAction'
import { deleteUserAction } from '@/app/redux/slice/user/deleteUserAction'
import { setTokensAction } from '@/app/redux/slice/user/setTokensAction'

// Get the specific dispatch type from the store
type AppDispatch = typeof store.dispatch

function AuthButton() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const {
    accessToken,
    refreshToken,
    loginRejectedMessage,
    signupFulfilledMessage,
    signupRejectedMessage,
    deleteFulfilledMessage,
  } = useSelector((state: RootState) => state.user)

  useEffect(() => {
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
  }, [dispatch])

  useEffect(() => {
    if (accessToken && refreshToken) {
      router.push('/')
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    }
    if (!accessToken && !refreshToken) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }, [accessToken, refreshToken, router])

  useEffect(() => {
    if (signupFulfilledMessage) {
      alert(signupFulfilledMessage)
      router.push('/user/login')
    }
  }, [router, signupFulfilledMessage])

  useEffect(() => {
    if (signupRejectedMessage) {
      alert(signupRejectedMessage)
    }
  }, [signupRejectedMessage])

  useEffect(() => {
    dispatch(refreshTokenAction())
    const interval = setInterval(() => {
      if (refreshToken) {
        dispatch(refreshTokenAction())
      }
    }, 180000) // 180000 milliseconds = 3 minutes

    return () => {
      clearInterval(interval)
    }
  }, [dispatch, refreshToken])

  const handleLogout = () => {
    dispatch(logoutUserAction())
  }

  const handleDeleteAccount = () => {
    dispatch(deleteUserAction())
  }

  useEffect(() => {
    if (deleteFulfilledMessage) {
      alert(deleteFulfilledMessage)
      router.push('/')
    }
  }, [deleteFulfilledMessage, router])

  useEffect(() => {
    if (loginRejectedMessage) {
      alert(loginRejectedMessage)
    }
  }, [loginRejectedMessage])

  if (accessToken && refreshToken) {
    return (
      <div className={'space-x-4'}>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    )
  } else {
    return (
      <div className={'space-x-4'}>
        <Link href={'/user/login'}>Login</Link>
        <Link href={'/user/signup'}>Signup</Link>
      </div>
    )
  }
}

export default AuthButton
