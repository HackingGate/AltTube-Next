import { combineReducers } from 'redux'
import searchReducer from '../slice/searchSlice'
import searchResultsSlice from '@/app/redux/slice/searchResultsSlice'
import streamResultSlice from '@/app/redux/slice/streamResultSlice'
import searchSuggestionsSlice from '@/app/redux/slice/searchSuggestionsSlice'
import userSlice from '@/app/redux/slice/user/userSlice/userSlice'
import devicesSlice from '@/app/redux/slice/user/devicesSlice'
import likeVideoSlice from '@/app/redux/slice/like-video/likeVideoSlice'

const rootReducer = combineReducers({
  search: searchReducer,
  searchResults: searchResultsSlice,
  streamResult: streamResultSlice,
  user: userSlice,
  searchSuggestions: searchSuggestionsSlice,
  devices: devicesSlice,
  likeVideo: likeVideoSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
