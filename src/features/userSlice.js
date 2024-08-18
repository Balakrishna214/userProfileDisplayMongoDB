import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://backend-production-da28.up.railway.app';

export const fetchProfiles = createAsyncThunk('users/fetchProfiles', async () => {
    const response = await axios.get(`${API_BASE_URL}/getProfiles`);
    return response.data;
});

export const sortProfiles = createAsyncThunk('users/sortProfiles', async () => {
    const response = await axios.get(`${API_BASE_URL}/sort`);
    return response.data;
});

export const addProfile = createAsyncThunk('users/addProfile', async (newProfile) => {
    const response = await axios.post(`${API_BASE_URL}/createProfile`, newProfile);
    return response.data; // Ensure the response contains the created profile
});

const userSlice = createSlice({
    name: 'users',
    initialState: {
        profiles: [],
        status: 'loading',
        error: null,
        currentPage: 1,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfiles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProfiles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profiles = action.payload;
                console.log(action.payload);
                
            })
            .addCase(fetchProfiles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(sortProfiles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sortProfiles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profiles = action.payload;
                state.currentPage = 1; // Reset to first page after sorting
            })
            .addCase(sortProfiles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profiles.push(action.payload); // Add the new profile to the list
            })
            .addCase(addProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setCurrentPage } = userSlice.actions;

export default userSlice.reducer;
