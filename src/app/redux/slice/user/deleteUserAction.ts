import { createAsyncThunk } from '@reduxjs/toolkit'

export const deleteUserAction = createAsyncThunk(
  'user/deleteUser',
  async (_, { rejectWithValue }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )
    if (!response.ok) {
      return rejectWithValue('Delete failed')
    }
    // Clear the access token from local storage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

    return await response.json()
  },
)
