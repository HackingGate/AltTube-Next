import { combineReducers } from 'redux'
import searchReducer from '../slice/searchSlice'
import searchResultsSlice from '@/app/redux/slice/searchResultsSlice'
import streamResultSlice from '@/app/redux/slice/streamResultSlice'

const rootReducer = combineReducers({
  search: searchReducer,
  searchResults: searchResultsSlice,
  stream: streamResultSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
