import { combineReducers } from 'redux'
import searchReducer from './searchSlice'

const rootReducer = combineReducers({
  // other reducers...
  search: searchReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
