import { createSlice } from '@reduxjs/toolkit'

export const quizQuestionSlice = createSlice({
  name: 'quizquestion',
  initialState: {
    quizQuestions: [],
  },
  reducers: {
    setQuizQuestion: (state,action) => {
      state.quizQuestions = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setQuizQuestion } = quizQuestionSlice.actions

export default quizQuestionSlice.reducer