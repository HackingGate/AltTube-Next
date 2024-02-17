import { combineReducers } from 'redux'
import searchReducer from '../slice/searchSlice'
import searchResultsSlice from '@/app/redux/slice/searchResultsSlice'
import streamResultSlice from '@/app/redux/slice/streamResultSlice'
import userSlice from '@/app/redux/slice/userSlice'

const rootReducer = combineReducers({
  search: searchReducer,
  searchResults: searchResultsSlice,
  streamResult: streamResultSlice,
  user: userSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
