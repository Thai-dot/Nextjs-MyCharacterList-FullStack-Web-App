import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAuthUser } from '../redux/authSlice';

export const GlobalState = createContext();

//@ts-ignored
export const DataProvider = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get('/api/auth/refreshToken');
        dispatch(getAuthUser(res.data.accesstoken));
        setTimeout(() => {
          refreshToken();
        }, 10*60 * 1000);
      };
      refreshToken();
    }
  }, []);
  
  const state = {
    token: '',
  };


  return (
    <GlobalState.Provider value={state}>
        {children}
    </GlobalState.Provider>
)
};
