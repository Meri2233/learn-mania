import { createSlice } from '@reduxjs/toolkit'

export const roomNoSlice = createSlice({
  name: 'room',
  initialState: {
    number: null,
  },
  reducers: {
    setNumber: (state,action) => {
      state.number = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setNumber } = roomNoSlice.actions

export default roomNoSlice.reducer