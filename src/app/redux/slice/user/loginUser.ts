
// Async thunk for user login
import { createAsyncThunk } from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk<
  { accessToken: string; refreshToken: string },
  { email: string; password: string },
  { rejectValue: string }
>('user/loginUser', async ({ email, password }, { rejectWithValue }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
  )
  if (!response.ok) {
    return rejectWithValue('Login failed')
  }
  const data = await response.json()
  return { accessToken: data.access_token, refreshToken: data.refresh_token }
})