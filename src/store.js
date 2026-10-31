import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_URL = import.meta.env.VITE_API_URL || '';

export const fetchPuppies = createAsyncThunk('puppies/fetch', async (filters = {}, { rejectWithValue }) => {
  const params = new URLSearchParams(Object.entries(filters).filter(([, value]) => value));
  const response = await fetch(`${API_URL}/api/puppies${params.size ? `?${params}` : ''}`);
  const result = await response.json();
  if (!response.ok) return rejectWithValue(result.message || 'Could not load puppies.');
  return result.data;
});

export const fetchGoneHomePuppies = createAsyncThunk('puppies/fetchGoneHome', async (_, { rejectWithValue }) => {
  const response = await fetch(`${API_URL}/api/puppies?status=gone-home`);
  const result = await response.json();
  if (!response.ok) return rejectWithValue(result.message || 'Could not load puppy stories.');
  return result.data;
});

export const fetchPuppyBySlug = createAsyncThunk('puppies/fetchBySlug', async (slug, { rejectWithValue }) => {
  const response = await fetch(`${API_URL}/api/puppies/${encodeURIComponent(slug)}`);
  const result = await response.json();
  if (!response.ok) return rejectWithValue(result.message || 'Could not load this puppy.');
  return result.data;
});

export const sendInquiry = createAsyncThunk('inquiries/send', async (inquiry, { rejectWithValue }) => {
  const response = await fetch(`${API_URL}/api/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiry),
  });
  const result = await response.json();
  if (!response.ok) return rejectWithValue(result.message || 'Could not send your message.');
  return result.message;
});

const puppiesSlice = createSlice({
  name: 'puppies',
  initialState: { items: [], goneHome: [], status: 'idle', error: null, currentRequestId: null, selected: null, selectedStatus: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPuppies.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchPuppies.fulfilled, (state, action) => {
        if (state.currentRequestId && state.currentRequestId !== action.meta.requestId) return;
        state.status = 'succeeded';
        state.items = action.payload;
        state.currentRequestId = null;
      })
      .addCase(fetchPuppies.rejected, (state, action) => {
        if (state.currentRequestId && state.currentRequestId !== action.meta.requestId) return;
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        state.currentRequestId = null;
      })
      .addCase(fetchGoneHomePuppies.fulfilled, (state, action) => {
        state.goneHome = action.payload;
      })
      .addCase(fetchGoneHomePuppies.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchPuppyBySlug.pending, (state) => {
        state.selectedStatus = 'loading';
        state.selected = null;
      })
      .addCase(fetchPuppyBySlug.fulfilled, (state, action) => {
        state.selectedStatus = 'succeeded';
        state.selected = action.payload;
      })
      .addCase(fetchPuppyBySlug.rejected, (state, action) => {
        state.selectedStatus = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

const inquirySlice = createSlice({
  name: 'inquiries',
  initialState: { status: 'idle', message: null, error: null },
  reducers: { resetInquiry: () => ({ status: 'idle', message: null, error: null }) },
  extraReducers: (builder) => {
    builder
      .addCase(sendInquiry.pending, (state) => {
        state.status = 'loading';
        state.message = null;
        state.error = null;
      })
      .addCase(sendInquiry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(sendInquiry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetInquiry } = inquirySlice.actions;
export const store = configureStore({
  reducer: { puppies: puppiesSlice.reducer, inquiries: inquirySlice.reducer },
});
