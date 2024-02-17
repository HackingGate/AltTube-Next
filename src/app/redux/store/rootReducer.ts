import { combineReducers } from 'redux'
import searchReducer from './searchSlice'
import searchResultsSlice from '@/app/redux/store/searchResultsSlice'

const rootReducer = combineReducers({
  search: searchReducer,
  searchResults: searchResultsSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
