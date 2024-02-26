import { createSlice } from '@reduxjs/toolkit';

export const favouriteSlice = createSlice({
    name: 'favourite',
    initialState: { favourite: [] }, // Initial data goes here
    reducers: {
      addToFavourite: (state, action) => {
        state.favourites =  [ ...state.favourite, action.payload.favourite ]
      },
      deletefavourite: (state, action) => {
        state.favourites = state.favourites.filter((favourite) => favourite.id !== action.payload);
      },
    },
  });

  export const { addToFavourite, deletefavourite } = favouriteSlice.actions;
