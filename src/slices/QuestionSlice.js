import { createSlice } from '@reduxjs/toolkit'

export const questionSlice = createSlice({
  name: 'question',
  initialState: {
    questions: [],
  },
  reducers: {
    addQuestion: (state, action) => {
      for (let i = 0; i < state.questions.length; i++) {
        if (state.questions._id === action.payload._id) {
          return;
        }
      }
      state.questions.push(action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { addQuestion } = questionSlice.actions

export default questionSlice.reducer