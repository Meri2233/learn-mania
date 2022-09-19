import { createSlice } from '@reduxjs/toolkit'

export const templateSlice = createSlice({
  name: 'template',
  initialState: {
    templates: [],
  },
  reducers: {
    addTemplate: (state, action) => {
      console.log(action.payload._id)
      for (let i = 0; i < state.templates.length; i++) {
        if (state.templates._id === action.payload._id) {
          return;
        }
      }
      state.templates.push(action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { addTemplate } = templateSlice.actions

export default templateSlice.reducer