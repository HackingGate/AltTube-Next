'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDevices } from '../../redux/slice/user/devicesSlice'
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
      {devices.items &&
        devices.items.map((device) => (
          <div key={device.id}>
            <p>{device.userAgent}</p>
            <p>{device.ipAddress}</p>
            <p>{device.lastActive}</p>
          </div>
        ))}
    </div>
  )
}
