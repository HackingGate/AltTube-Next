import React from 'react'

interface LoginFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onEmailChange,
  onPasswordChange,
}) => {
  return (
    <form onSubmit={onSubmit} className={'flex flex-col space-y-4'}>
      <input type="text" placeholder="Username" onChange={onEmailChange} />
      <input
        type="password"
        placeholder="Password"
        onChange={onPasswordChange}
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
