import { z } from 'zod'

export const ChoiceOptionSchema = z.object({
  label: z.string(),
  value: z.union([z.string(), z.boolean()]),
  var: z.string().optional(),
})

export const LogicRuleSchema = z
  .object({
    goTo: z.string().optional(),
    dependsOn: z.string().optional(),
  })
  .catchall(z.string().optional())

export const QuestionTypeSchema = z.object({
  id: z.string(),
  question: z.string(),
  screenType: z.enum(['choice', 'info']),
  isDynamicTemplate: z.boolean().optional(),
  options: z.array(ChoiceOptionSchema).optional(),
  description: z.string().optional(),
  buttonText: z.string().optional(),
  next: LogicRuleSchema,
})

export const SurveyDataSchema = z.object({
  surveyId: z.string(),
  title: z.string(),
  screens: z.array(QuestionTypeSchema),
})

export type SurveyData = z.infer<typeof SurveyDataSchema>
export type ChoiceOption = z.infer<typeof ChoiceOptionSchema>
export type QuestionType = z.infer<typeof QuestionTypeSchema>
