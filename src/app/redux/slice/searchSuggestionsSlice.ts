import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface SearchSuggestionItem {
  title: string
}

interface SearchSuggestionsState {
  items: SearchSuggestionItem[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}

const initialState: SearchSuggestionsState = {
  items: [],
  status: 'idle',
  error: undefined,
}

export const fetchSearchSuggestions = createAsyncThunk<
  SearchSuggestionItem[],
  string,
  { rejectValue: string }
>(
  'searchSuggestions/fetchSearchSuggestions',
  async (query, { rejectWithValue }) => {
    const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/piped/opensearch/suggestions?query=${encodeURIComponent(query)}`
    const response = await fetch(fetchUrl)
    if (!response.ok) {
      return rejectWithValue('Server error')
    }
    const data = await response.json()
    return data[1]
  },
)

const searchSuggestionsSlice = createSlice({
  name: 'searchSuggestions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchSuggestions.pending, (state) => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(
        fetchSearchSuggestions.fulfilled,
        (state, action) => {
          state.status = 'succeeded'
          state.items = action.payload
        },
      )
      .addCase(fetchSearchSuggestions.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload
        } else {
          state.error = 'Unknown error'
        }
        state.status = 'failed'
      })
  },
})

export default searchSuggestionsSlice.reducer
