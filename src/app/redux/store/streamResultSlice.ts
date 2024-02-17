import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface StreamResultItem {
  title: string
  hls: string
}

interface StreamState {
  item: StreamResultItem
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: StreamState = {
  item: {
    title: '',
    hls: '',
  },
  status: 'idle',
  error: null,
}

// Async thunk for fetching stream data
export const fetchStreamResult = createAsyncThunk<
  StreamResultItem,
  string,
  { rejectValue: string }
>('streamResult/fetchStreamResult', async (videoId, { rejectWithValue }) => {
  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/streams/${encodeURIComponent(videoId)}`
  const response = await fetch(fetchUrl)
  if (!response.ok) {
    return rejectWithValue('Server error')
  }
  return await response.json()
})

const streamResultSlice = createSlice({
  name: 'streamResult',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStreamResult.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(
        fetchStreamResult.fulfilled,
        (state, action: PayloadAction<StreamResultItem>) => {
          state.status = 'succeeded'
          state.item = action.payload
        },
      )
      .addCase(fetchStreamResult.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Failed to fetch stream'
      })
  },
})

export default streamResultSlice.reducer
