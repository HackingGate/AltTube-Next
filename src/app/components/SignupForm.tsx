import React from 'react'

interface SignupFormProps {
  email: string
  password: string
  confirmPassword: string
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onConfirmPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SignupForm: React.FC<SignupFormProps> = ({
  email,
  password,
  confirmPassword,
  onSubmit,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
}) => {
  return (
    <form onSubmit={onSubmit} className={'flex flex-col space-y-4'}>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
        style={{ color: 'black' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
        style={{ color: 'black' }}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        style={{ color: 'black' }}
      />
      <button type="submit">Signup</button>
    </form>
  )
}

export default SignupForm
