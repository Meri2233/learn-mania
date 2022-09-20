import { createSlice } from '@reduxjs/toolkit'

export const reportSlice = createSlice({
  name: 'report',
  initialState: {
    reports: [],
  },
  reducers: {
    addReport: (state,action) => {
      for (let i = 0; i < state.reports.length; i++) {
        if (state.reports._id === action.payload._id) {
          return;
        }
      }
      state.reports.push(action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { addReport } = reportSlice.actions

export default reportSlice.reducer