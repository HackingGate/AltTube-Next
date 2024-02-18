import { createAsyncThunk } from '@reduxjs/toolkit'

export const signupUserAction = createAsyncThunk<
  { message: string },
  { email: string; password: string },
  { rejectValue: { error: string } }
>('user/signupUser', async ({ email, password }, { rejectWithValue }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/signup`,
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
  return { message: data.message }
})
