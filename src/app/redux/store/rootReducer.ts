import { combineReducers } from 'redux'
import searchReducer from '../slice/searchSlice'
import searchResultsSlice from '@/app/redux/slice/searchResultsSlice'
import streamResultSlice from '@/app/redux/slice/streamResultSlice'
import searchSuggestionsSlice from '@/app/redux/slice/searchSuggestionsSlice'
import userSlice from '@/app/redux/slice/user/userSlice/userSlice'

const rootReducer = combineReducers({
  search: searchReducer,
  searchResults: searchResultsSlice,
  streamResult: streamResultSlice,
  user: userSlice,
  searchSuggestions: searchSuggestionsSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
