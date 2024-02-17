'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store/configureStore'

interface ContextProviderProps {
  children: React.ReactNode
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>
}
