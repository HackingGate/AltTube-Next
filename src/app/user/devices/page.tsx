'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchDevices,
  deleteDevices,
} from '../../redux/slice/user/devicesSlice'
import { store } from '@/app/redux/store/configureStore'
import { RootState } from '@/app/redux/store/rootReducer'

// Get the specific dispatch type from the store
type AppDispatch = typeof store.dispatch

export default function Devices() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchDevices())
  }, [dispatch])

  const devices = useSelector((state: RootState) => state.devices)

  if (devices.status === 'loading') {
    return <div>Loading...</div>
  }

  if (devices.status === 'failed') {
    return <div>Error: {devices.error}</div>
  }

  return (
    <div>
      <h1>Devices</h1>
      {devices.deviceList.devices.map((device) => (
        <div key={device.id}>
          {devices.deviceList.current_device_id === device.id ? (
            <p>Current Device</p>
          ) : null}
          <p>{device.user_agent}</p>
          <p>{device.ip_address}</p>
          <p>{device.last_active}</p>
          <button onClick={() => dispatch(deleteDevices([device.id]))}>
            Logout
          </button>
        </div>
      ))}
      <button
        onClick={() => {
          const deviceIdsToDelete = devices.deviceList.devices
            .filter(
              (device) => device.id !== devices.deviceList.current_device_id,
            )
            .map((device) => device.id)
          dispatch(deleteDevices(deviceIdsToDelete))
        }}
      >
        Logout All Except Current
      </button>
    </div>
  )
}
