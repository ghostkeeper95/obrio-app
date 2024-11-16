import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ChoiceOption } from '@/types/survey'

interface SurvayState {
  answers: { [key: string]: ChoiceOption }
  questions: { [key: string]: string }
  variables: { [key: string]: string | boolean }
  nextPageId: string | null
  availablePages: string[]
}

interface SurveyPayload {
  screenId: string
  question: string
  answer: ChoiceOption
  nextPageId: string
}

const initialState: SurvayState = {
  answers: {},
  questions: {},
  variables: {},
  nextPageId: null,
  availablePages: [],
}

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    updateAnswer: (
      state,
      {
        payload,
      }: {
        payload: SurveyPayload
      },
    ) => {
      const { screenId, answer, question, nextPageId } = payload

      state.answers[screenId] = answer
      state.questions[screenId] = question
      state.nextPageId = nextPageId

      if (answer.var) {
        state.variables[answer.var] = answer.value
      }

      state.availablePages = Array.from(new Set([...state.availablePages, screenId, nextPageId]))
    },
    addAvailablePages: (state, action: PayloadAction<string[]>) => {
      state.availablePages = Array.from(new Set([...state.availablePages, ...action.payload]))
    },
    resetAnswers: () => initialState,
  },
})

export const { updateAnswer, resetAnswers, addAvailablePages } = surveySlice.actions

export default surveySlice.reducer
