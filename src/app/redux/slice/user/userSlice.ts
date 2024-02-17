import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { loginUser } from '@/app/redux/slice/user/loginUser'
import { logoutUser } from '@/app/redux/slice/user/logoutUser'

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
        (
          state,
          action: PayloadAction<{ accessToken: string; refreshToken: string }>,
        ) => {
          state.accessToken = action.payload.accessToken
          state.refreshToken = action.payload.refreshToken
        },
      )
      .addCase(loginUser.rejected, (state) => {
        state.accessToken = null
        state.refreshToken = null
      })
      .addCase(logoutUser.pending, (state) => {
        state.accessToken = null
        state.refreshToken = null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.accessToken = null
        state.refreshToken = null
      })
      .addCase(logoutUser.rejected, (state) => {
        state.accessToken = null
        state.refreshToken = null
      })
  },
})

export default userSlice.reducer
