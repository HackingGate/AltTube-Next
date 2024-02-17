'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store/rootReducer'
import { store } from '../redux/store/configureStore'
import { loginUser } from '@/app/redux/slice/userSlice'

// Get the specific dispatch type from the store
type AppDispatch = typeof store.dispatch

function AuthButton() {
  const dispatch = useDispatch<AppDispatch>()

  const { accessToken, refreshToken } = useSelector(
    (state: RootState) => state.user,
  )

  const handleLogin = () => {
    dispatch(loginUser({ email: 'user1@example.com', password: 'password' }))
  }

  if (accessToken && refreshToken) {
    return <button>Logout</button>
  } else {
    return <button onClick={handleLogin}>Login</button>
  }
}

export default AuthButton
