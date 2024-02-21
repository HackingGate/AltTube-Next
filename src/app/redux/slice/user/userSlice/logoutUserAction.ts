import { createAsyncThunk } from '@reduxjs/toolkit'

export const logoutUserAction = createAsyncThunk<
  unknown,
  { accessToken: string }, // accessToken as argument
  { rejectValue: string }
>('user/logoutUser', async ({ accessToken }, { rejectWithValue }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/logout`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
  if (!response.ok) {
    return rejectWithValue('Logout failed')
  }
  // Clear the access token from local storage
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')

  return await response.json()
})
