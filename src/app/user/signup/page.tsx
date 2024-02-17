'use client'

import { store } from '../../redux/store/configureStore'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import SignupForm from '@/app/components/SignupForm'
import { signupUser } from '@/app/redux/slice/user/signupUser'

// Get the specific dispatch type from the store
type AppDispatch = typeof store.dispatch

export default function Login() {
  const dispatch = useDispatch<AppDispatch>()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    dispatch(signupUser({ email, password }))
  }

  return (
    <div className={'flex flex-col items-center'}>
      <SignupForm
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        onSubmit={(event) => {
          event.preventDefault()
          handleSignup()
        }}
        onEmailChange={(event) => {
          setEmail(event.target.value)
        }}
        onPasswordChange={(event) => {
          setPassword(event.target.value)
        }}
        onConfirmPasswordChange={(event) => {
          setConfirmPassword(event.target.value)
        }}
      />
    </div>
  )
}
