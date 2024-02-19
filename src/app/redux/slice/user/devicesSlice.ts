import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface deviceList {
  current_device_id: number
  devices: device[]
}

interface deleteDevicesResponse {
  message: string
  deleted: number[]
}

interface device {
  id: number
  last_active: string
  user_agent: string
  ip_address: string
}

export interface devicesState {
  deviceList: deviceList
  deleteDevicesResponse: deleteDevicesResponse
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

const initialState: devicesState = {
  deviceList: {
    current_device_id: 0,
    devices: [],
  },
  deleteDevicesResponse: {
    message: '',
    deleted: [],
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

export const deleteDevices = createAsyncThunk<
  deleteDevicesResponse,
  number[],
  { rejectValue: string }
>('devices/deleteDevices', async (ids, { rejectWithValue }) => {
  const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/user/devices`
  const response = await fetch(fetchUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    body: JSON.stringify(ids),
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
      .addCase(deleteDevices.pending, (state) => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(
        deleteDevices.fulfilled,
        (state, action: PayloadAction<deleteDevicesResponse>) => {
          state.status = 'succeeded'
          if (action.payload.deleted) {
            state.deviceList.devices = state.deviceList.devices.filter(
              (device) => !action.payload.deleted.includes(device.id),
            )
          }
        },
      )
      .addCase(deleteDevices.rejected, (state, action) => {
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
