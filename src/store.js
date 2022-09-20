import { configureStore } from "@reduxjs/toolkit"
import QuestionSlice from "./slices/QuestionSlice"
import quizQuestionSlice from "./slices/QuizQuestions"
import reportSlice from "./slices/ReportSlice"
import roomNoSlice from "./slices/RoomNoSlice"
import scoreSlice from "./slices/ScoreSlice"
import StudentSlice from "./slices/StudentSlice"
import TemplateSlice from "./slices/TemplateSlice"

export default configureStore({
    reducer: {
        template: TemplateSlice,
        question: QuestionSlice,
        student: StudentSlice,
        room: roomNoSlice,
        quizquestion: quizQuestionSlice,
        score: scoreSlice,
        report: reportSlice
    }
})