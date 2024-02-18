import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface deviceList {
  current_device_id: number
  devices: device[]
}

interface device {
  id: number
  last_active: string
  user_agent: string
  ip_address: string
}

export interface devicesState {
  deviceList: deviceList
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

const initialState: devicesState = {
  deviceList: {
    current_device_id: 0,
    devices: [],
  },
  status: 'idle',
  error: undefined,
}

export const fetchDevices = createAsyncThunk<
  deviceList,
  void,
  { rejectValue: string }
>('devices/fetchDevices', async (_, { rejectWithValue }) => {
  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/user/devices`
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

// Create slice for devices
const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.deviceList = action.payload
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload
        } else {
          state.error = 'Unknown error'
        }
        state.status = 'failed'
      })
  },
})

export default devicesSlice.reducer
