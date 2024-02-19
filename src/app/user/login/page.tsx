'use client'

import { store } from '../../redux/store/configureStore'
import LoginForm from '@/app/components/LoginForm'
import { loginUserAction } from '@/app/redux/slice/user/userSlice/loginUserAction'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

// Get the specific dispatch type from the store
type AppDispatch = typeof store.dispatch

export default function Login() {
  const dispatch = useDispatch<AppDispatch>()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = () => {
    dispatch(loginUserAction({ email, password }))
  }

  return (
    // VStack
    <div className={'flex flex-col items-center'}>
      <LoginForm
        email={email}
        password={password}
        onSubmit={(event) => {
          event.preventDefault()
          handleLogin()
        }}
        onEmailChange={(event) => {
          setEmail(event.target.value)
        }}
        onPasswordChange={(event) => {
          setPassword(event.target.value)
        }}
      />
    </div>
  )
}
