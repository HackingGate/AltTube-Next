import { createAsyncThunk } from '@reduxjs/toolkit'

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/logout`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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
  },
)
