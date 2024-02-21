import { createAsyncThunk } from '@reduxjs/toolkit'

export const deleteUserAction = createAsyncThunk<
  { message: string },
  { accessToken: string }, // accessToken as argument
  { rejectValue: string }
>('user/deleteUser', async ({ accessToken }, { rejectWithValue }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (!response.ok) {
    return rejectWithValue('Delete failed')
  }
  // Clear the access token from local storage
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')

  return await response.json()
})
