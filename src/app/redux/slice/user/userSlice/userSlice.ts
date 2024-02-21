import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginUserAction } from '@/app/redux/slice/user/userSlice/loginUserAction'
import { logoutUserAction } from '@/app/redux/slice/user/userSlice/logoutUserAction'
import { signupUserAction } from '@/app/redux/slice/user/userSlice/signupUserAction'
import { refreshTokenAction } from '@/app/redux/slice/user/userSlice/refreshTokenAction'
import { deleteUserAction } from '@/app/redux/slice/user/userSlice/deleteUserAction'

interface UserItem {
  name: string
  email: string
  accessToken: string | null
  refreshToken: string | null
  loginRejectedMessage?: string
  signupFulfilledMessage?: string
  signupRejectedMessage?: string
  deleteFulfilledMessage?: string
  needToPushToHome?: boolean
  needToPushToLogin?: boolean
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
  reducers: {
    setTokensAction: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    resetNeedToPushToHome: (state) => {
      state.needToPushToHome = false
    },
    resetNeedToPushToLogin: (state) => {
      state.needToPushToLogin = false
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUserAction.pending, (state) => {
        state.accessToken = null
        state.refreshToken = null
      })
      .addCase(
        loginUserAction.fulfilled,
        (
          state,
          action: PayloadAction<{ accessToken: string; refreshToken: string }>,
        ) => {
          state.accessToken = action.payload.accessToken
          state.refreshToken = action.payload.refreshToken
          state.needToPushToHome = true
        },
      )
      .addCase(loginUserAction.rejected, (state, action) => {
        state.accessToken = null
        state.refreshToken = null
        if (action.payload) {
          state.loginRejectedMessage = action.payload.error
        } else {
          state.loginRejectedMessage = action.error.message
        }
      })
      // signup
      .addCase(signupUserAction.pending, (state) => {
        state.accessToken = null
        state.refreshToken = null
      })
      .addCase(
        signupUserAction.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.signupFulfilledMessage = action.payload.message
          state.needToPushToLogin = true
        },
      )
      .addCase(signupUserAction.rejected, (state, action) => {
        if (action.payload) {
          state.signupRejectedMessage = action.payload.error
        } else {
          state.signupRejectedMessage = action.error.message
        }
      })
      // logout
      .addCase(logoutUserAction.fulfilled, (state) => {
        state.accessToken = null
        state.refreshToken = null
      })
      // refresh token
      .addCase(
        refreshTokenAction.fulfilled,
        (
          state,
          action: PayloadAction<{ accessToken: string; refreshToken: string }>,
        ) => {
          state.accessToken = action.payload.accessToken
          state.refreshToken = action.payload.refreshToken
        },
      )
      .addCase(refreshTokenAction.rejected, (state) => {
        state.accessToken = null
        state.refreshToken = null
      })
      // delete account
      .addCase(
        deleteUserAction.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.accessToken = null
          state.refreshToken = null
          state.deleteFulfilledMessage = action.payload.message
        },
      )
  },
})

export const {
  setTokensAction,
  resetNeedToPushToHome,
  resetNeedToPushToLogin,
} = userSlice.actions

export default userSlice.reducer
