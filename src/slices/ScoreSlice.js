import { createSlice } from '@reduxjs/toolkit'

export const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        score: [],
    },
    reducers: {
        addScore: (state, action) => {
            for (let i = 0; i < state.score.length; i++) {
                if (state.score[i].student === action.payload.student && state.score[i].question === action.payload.question) {
                    return;
                }
            }
            state.score.push(action.payload);
        },
    },
})

// Action creators are generated for each case reducer function
export const { addScore } = scoreSlice.actions

export default scoreSlice.reducer