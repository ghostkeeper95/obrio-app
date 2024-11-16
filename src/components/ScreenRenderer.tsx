'use client'

import { memo, useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import ChoiceQuestion from './ChoiceQuestion'
import SurveyLayout from './common/SurveyLayout'
import InfoPage from './InfoPage'
import surveyData from '@/data/surveyData.json'
import { parseTemplate } from '@/helpers'
import { RootState } from '@/store'
import { addAvailablePages, updateAnswer } from '@/store/surveySlice'
import { ChoiceOption, QuestionType } from '@/types/survey'

interface ScreenRendererProps {
  screen: QuestionType
}

const ScreenRenderer = ({ screen }: ScreenRendererProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const survey = useSelector((state: RootState) => state.survey)

  const { answers, variables, availablePages, nextPageId } = survey

  const header = useMemo(() => {
    if (screen.isDynamicTemplate) {
      return parseTemplate(screen.question, variables)
    }
    return screen.question
  }, [screen.question, variables])

  const handleAnswer = useCallback(
    (option: ChoiceOption) => {
      const goTo = screen.next.goTo || screen.next[String(option.value)]

      if (goTo) {
        dispatch(
          updateAnswer({
            screenId: screen.id,
            question: header,
            answer: option,
            nextPageId: goTo,
          }),
        )
        router.push(`/survey/${goTo}`)
      } else {
        dispatch(
          updateAnswer({
            screenId: screen.id,
            question: header,
            answer: option,
            nextPageId: '',
          }),
        )
        router.push('/survey/results')
      }
    },
    [screen.id, header, screen.next, dispatch, router],
  )

  const handleNext = useCallback(() => {
    const currentScreenNext = screen.next

    let nextQuestionId: string | null | undefined = null

    if (currentScreenNext.dependsOn) {
      const dependsOnAnswer = answers[currentScreenNext.dependsOn]

      if (dependsOnAnswer) {
        nextQuestionId = currentScreenNext[String(dependsOnAnswer.value)]
      }
    } else if (currentScreenNext.goTo) {
      nextQuestionId = currentScreenNext.goTo
    }

    if (nextQuestionId) {
      dispatch(addAvailablePages([nextQuestionId]))

      router.push(`/survey/${nextQuestionId}`)
    } else {
      console.error('No valid nextQuestionId found')
    }
  }, [screen.next, answers, dispatch, router])

  useEffect(() => {
    const firstScreenId = surveyData.screens[0]?.id

    if (!availablePages.includes(screen.id) && screen.id !== firstScreenId) {
      const redirectTo = `/survey/unavailable?previousPageId=${nextPageId || firstScreenId}`
      router.push(redirectTo)
    }
  }, [availablePages, screen.id, nextPageId, router])

  switch (screen.screenType) {
    case 'choice':
      return (
        <SurveyLayout>
          <ChoiceQuestion
            question={header}
            description={screen.description}
            options={screen.options || []}
            onAnswer={value => handleAnswer(value)}
          />
        </SurveyLayout>
      )
    case 'info':
      return (
        <SurveyLayout>
          <InfoPage
            question={header}
            description={screen.description}
            buttonText={screen.buttonText || 'Next'}
            onNext={handleNext}
          />
        </SurveyLayout>
      )
    default:
      return <p>Unsupported screen type</p>
  }
}

export default memo(ScreenRenderer)
