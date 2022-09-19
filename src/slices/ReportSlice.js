import { createSlice } from '@reduxjs/toolkit'

export const reportSlice = createSlice({
  name: 'report',
  initialState: {
    reports: [],
  },
  reducers: {
    addReport: (state,action) => {
      state.reports.push(action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { addReport } = reportSlice.actions

export default reportSlice.reducer