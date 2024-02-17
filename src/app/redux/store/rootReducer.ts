import { combineReducers } from 'redux'
import searchReducer from './searchSlice'
import searchResultsSlice from '@/app/redux/store/searchResultsSlice'
import streamResultSlice from '@/app/redux/store/streamResultSlice'

const rootReducer = combineReducers({
  search: searchReducer,
  searchResults: searchResultsSlice,
  stream: streamResultSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
