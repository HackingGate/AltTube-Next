import { createAsyncThunk } from '@reduxjs/toolkit'

export const setTokensAction = createAsyncThunk(
  'user/setTokens',
  async ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string
    refreshToken: string
  }) => {
    return { accessToken, refreshToken }
  },
)
