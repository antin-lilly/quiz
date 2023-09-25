
export const QuestionType = {
  Single: 1,
  Multiple: 2,

  isSingle: (value = 0) => value === QuestionType.Single,
  isMultiple: (value = 0) => value === QuestionType.Multiple,
}


export const getQuestionTypes = [
  {value: QuestionType.Single, label: 'Single'},
  {value: QuestionType.Multiple, label: 'Multiple'},
]