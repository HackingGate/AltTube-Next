import React from 'react'

interface LoginFormProps {
  email: string
  password: string
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onSubmit,
  onEmailChange,
  onPasswordChange,
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
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
