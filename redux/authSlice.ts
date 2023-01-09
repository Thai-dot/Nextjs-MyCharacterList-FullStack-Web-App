import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import axios from 'axios';

export interface AuthState {
  accessToken: string;
}

const initialState: AuthState = {
  accessToken: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getAuthUser: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearAuthUser: (state) =>{
      state.accessToken = "";
    }
  },
});

// Action creators are generated for each case reducer function
export const { getAuthUser,clearAuthUser } = authSlice.actions;

export default authSlice.reducer;
