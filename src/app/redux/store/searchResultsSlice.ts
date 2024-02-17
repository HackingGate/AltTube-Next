// store/searchResultsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define the type for individual search result items.
interface SearchResultItem {
  url: string;
  thumbnail: string;
  title: string;
}

// Define the type for the state shape of the search results.
interface SearchResultsState {
  items: SearchResultItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

// Define the initial state of search results.
const initialState: SearchResultsState = {
  items: [],
  status: 'idle',
  error: undefined,
};

// Define the type for the fetch arguments if necessary.
interface FetchSearchResultsArg {
  query: string;
}

// Create an async thunk for fetching search results.
export const fetchSearchResults = createAsyncThunk<SearchResultItem[], FetchSearchResultsArg, { rejectValue: string }>(
  'searchResults/fetchSearchResults',
  async ({ query }, { rejectWithValue }) => {
    try {
      const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/piped/search?q=${encodeURIComponent(query)}`;
      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error('Server error');
      }
      // The response should be an object with an 'items' property
      const data = await response.json();
      return data.items;
    } catch (error) {
      // If an error occurs, we pass the error message to the rejected action
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

// Create a slice for search results.
const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    // You can add reducers here for other synchronous actions if needed.
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action: PayloadAction<SearchResultItem[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // action.payload contains the rejected value from the rejectWithValue function
      });
  },
});

export default searchResultsSlice.reducer;
