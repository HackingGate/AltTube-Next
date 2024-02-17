'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store/rootReducer'
import { store } from '../redux/store/configureStore'
import { logoutUser } from '@/app/redux/slice/userSlice'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Get the specific dispatch type from the store
type AppDispatch = typeof store.dispatch

function AuthButton() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const { accessToken, refreshToken } = useSelector(
    (state: RootState) => state.user,
  )

  useEffect(() => {
    if (accessToken && refreshToken) {
      router.push('/')
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    }
  }, [accessToken, refreshToken, router])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  if (accessToken && refreshToken) {
    return <button onClick={handleLogout}>Logout</button>
  } else {
    // return <button onClick={handleLogin}>Login</button>
    return (
      <div>
        <Link href={'/login'}>Login</Link>
      </div>
    )
  }
}

export default AuthButton
