import { createSlice } from '@reduxjs/toolkit'

export const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
  },
  reducers: {
    addStudent: (state,action) => {
      for(let i = 0; i<state.students.length; i++){
        if(state.students[i] === action.payload){
          return;
        }
      }
      state.students.push(action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { addStudent } = studentSlice.actions

export default studentSlice.reducer