'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store/rootReducer'
import { store } from '../redux/store/configureStore'
import { logoutUserAction } from '@/app/redux/slice/user/userSlice/logoutUserAction'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { refreshTokenAction } from '@/app/redux/slice/user/userSlice/refreshTokenAction'
import { deleteUserAction } from '@/app/redux/slice/user/userSlice/deleteUserAction'

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
        <button onClick={() => router.push('/user/devices')}>Devices</button>
        <button onClick={() => router.push('/user/likes')}>Likes</button>
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
