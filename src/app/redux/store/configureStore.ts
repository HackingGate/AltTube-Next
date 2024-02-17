import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer' // You'll create this file next

export const store = configureStore({
  reducer: rootReducer,
})
