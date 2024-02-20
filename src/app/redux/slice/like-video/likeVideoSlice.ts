import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface LikeVideoItem {
  id: string
  title: string
  thumbnailUrl: string
}

interface LikeVideoResultState {
  items: LikeVideoItem[]
  liked: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

export const initialState: LikeVideoResultState = {
  items: [],
  liked: false,
  status: 'idle',
  error: undefined,
}

export const fetchLikedVideos = createAsyncThunk<
  LikeVideoItem[],
  void,
  { rejectValue: string }
>('likeVideos/fetchLikedVideos', async (_, { rejectWithValue }) => {
  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/like`
  const response = await fetch(fetchUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
  if (!response.ok) {
    return rejectWithValue('Server error')
  }
  const data = await response.json()
  return data.items
})

export const fetchLikeVideo = createAsyncThunk<
  boolean,
  string,
  { rejectValue: string }
>('likeVideos/fetchLikeVideo', async (videoID, { rejectWithValue }) => {
  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/like/${videoID}`
  const response = await fetch(fetchUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
  if (!response.ok) {
    return rejectWithValue('Server error')
  }
  return await response.json()
})

export const addLikeVideo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('likeVideos/addLikeVideo', async (videoID, { rejectWithValue }) => {
  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/like/${videoID}`
  const response = await fetch(fetchUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
  if (!response.ok) {
    return rejectWithValue('Server error')
  }
  const data = await response.json()
  return await data.is_liked
})

export const removeLikeVideo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('likeVideos/removeLikeVideo', async (videoID, { rejectWithValue }) => {
  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/like/${videoID}`
  const response = await fetch(fetchUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
  if (!response.ok) {
    return rejectWithValue('Server error')
  }
  return videoID
})

const likeVideosSlice = createSlice({
  name: 'likeVideos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikedVideos.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchLikedVideos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchLikedVideos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(addLikeVideo.fulfilled, (state, action) => {
        state.liked = true
      })
      .addCase(removeLikeVideo.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload)
        state.liked = false
      })
      .addCase(fetchLikeVideo.fulfilled, (state, action) => {
        state.liked = action.payload
        console.log('fetchLikeVideo.fulfilled', action.payload)
      })
  },
})

export default likeVideosSlice.reducer
