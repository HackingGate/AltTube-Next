'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store/rootReducer'
import { store } from '../redux/store/configureStore'
import { loginUser } from '@/app/redux/slice/userSlice'
import Link from 'next/link'

// Get the specific dispatch type from the store
type AppDispatch = typeof store.dispatch

function AuthButton() {
  const dispatch = useDispatch<AppDispatch>()

  const { accessToken, refreshToken } = useSelector(
    (state: RootState) => state.user,
  )

  if (accessToken && refreshToken) {
    return <button>Logout</button>
  } else {
    // return <button onClick={handleLogin}>Login</button>
    return <Link href={'/login'}>Login</Link>
  }
}

export default AuthButton
