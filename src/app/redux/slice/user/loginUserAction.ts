import { createAsyncThunk } from '@reduxjs/toolkit'

export const loginUserAction = createAsyncThunk<
  { accessToken: string; refreshToken: string },
  { email: string; password: string },
  { rejectValue: { error: string } }
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
  const data = await response.json()
  if (!response.ok) {
    return rejectWithValue({ error: data.error })
  }
  return { accessToken: data.access_token, refreshToken: data.refresh_token }
})
