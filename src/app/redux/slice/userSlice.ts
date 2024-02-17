import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface UserItem {
  name: string
  email: string
  accessToken: string | null
  refreshToken: string | null
}

const initialState: UserItem = {
  name: '',
  email: '',
  accessToken: null,
  refreshToken: null,
}

// Async thunk for user login
export const loginUser = createAsyncThunk<
  { accessToken: string, refreshToken: string },
  { email: string; password: string },
  { rejectValue: string }
>('user/loginUser', async ({ email, password }, { rejectWithValue }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  if (!response.ok) {
    return rejectWithValue('Login failed')
  }
  const data = await response.json()
  return { accessToken: data.access_token, refreshToken: data.refresh_token }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.accessToken = null
        state.refreshToken = null
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ accessToken: string, refreshToken: string }>) => {
          state.accessToken = action.payload.accessToken
          state.refreshToken = action.payload.refreshToken
        },
      )
      .addCase(loginUser.rejected, (state) => {
        state.accessToken = null
        state.refreshToken = null
      })
  },
})

export default userSlice.reducer