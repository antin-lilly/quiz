const quiz = {
  quizzes: [
    {
      id: 1,
      title: "General Knowledge Quiz",
      description: "Test your knowledge on a variety of topics.",
      unique_identifier: "GK-123",
      created_at: "2023-08-25 10:00:00",
      updated_at: "2023-08-25 10:30:00",
    },
    {
      id: 2,
      title: "General Knowledge Quiz",
      description: "Test your knowledge on a variety of topics.",
      unique_identifier: "GK-123",
      created_at: "2023-08-25 10:00:00",
      updated_at: "2023-08-25 10:30:00",
    },
  ],
  questions: [
    {
      id: 1,
      quiz_id: 1,
      question_text: "What is the capital of France?",
      question_type: 1,
      created_at: "2023-08-25 10:05:00",
      updated_at: "2023-08-25 10:05:00",
      options: [
        {
          id: 1,
          question_id: 1,
          option_text: "Paris",
          is_correct: true,
          created_at: "2023-08-25 10:06:00",
          updated_at: "2023-08-25 10:06:00",
        },
        {
          id: 2,
          question_id: 1,
          option_text: "London",
          is_correct: false,
          created_at: "2023-08-25 10:07:00",
          updated_at: "2023-08-25 10:07:00",
        },
        {
          id: 3,
          question_id: 1,
          option_text: "Berlin",
          is_correct: false,
          created_at: "2023-08-25 10:08:00",
          updated_at: "2023-08-25 10:08:00",
        },
        {
          id: 4,
          question_id: 1,
          option_text: "Rome",
          is_correct: false,
          created_at: "2023-08-25 10:09:00",
          updated_at: "2023-08-25 10:09:00",
        },
      ],
    },
    {
      id: 2,
      quiz_id: 1,
      question_text: "Which planet is known as the Red Planet?",
      question_type: 1,
      created_at: "2023-08-25 10:10:00",
      updated_at: "2023-08-25 10:10:00",
      options: [
        {
          id: 5,
          question_id: 2,
          option_text: "Mars",
          is_correct: true,
          created_at: "2023-08-25 10:11:00",
          updated_at: "2023-08-25 10:11:00",
        },
        {
          id: 6,
          question_id: 2,
          option_text: "Jupiter",
          is_correct: false,
          created_at: "2023-08-25 10:12:00",
          updated_at: "2023-08-25 10:12:00",
        },
        {
          id: 7,
          question_id: 2,
          option_text: "Venus",
          is_correct: false,
          created_at: "2023-08-25 10:13:00",
          updated_at: "2023-08-25 10:13:00",
        },
        {
          id: 8,
          question_id: 2,
          option_text: "Saturn",
          is_correct: false,
          created_at: "2023-08-25 10:14:00",
          updated_at: "2023-08-25 10:14:00",
        },
      ],
    },
    {
      id: 3,
      quiz_id: 2,
      question_text: "What is the capital of France?",
      question_type: 1,
      created_at: "2023-08-25 10:05:00",
      updated_at: "2023-08-25 10:05:00",
      options: [
        {
          id: 9,
          question_id: 1,
          option_text: "Paris",
          is_correct: true,
          created_at: "2023-08-25 10:06:00",
          updated_at: "2023-08-25 10:06:00",
        },
        {
          id: 10,
          question_id: 1,
          option_text: "London",
          is_correct: false,
          created_at: "2023-08-25 10:07:00",
          updated_at: "2023-08-25 10:07:00",
        },
        {
          id: 11,
          question_id: 1,
          option_text: "Berlin",
          is_correct: false,
          created_at: "2023-08-25 10:08:00",
          updated_at: "2023-08-25 10:08:00",
        },
        {
          id: 12,
          question_id: 1,
          option_text: "Rome",
          is_correct: false,
          created_at: "2023-08-25 10:09:00",
          updated_at: "2023-08-25 10:09:00",
        },
      ],
    },
    {
      id: 4,
      quiz_id: 2,
      question_text: "What is the capital of France?",
      question_type: 1,
      created_at: "2023-08-25 10:05:00",
      updated_at: "2023-08-25 10:05:00",
      options: [
        {
          id: 13,
          question_id: 1,
          option_text: "Paris",
          is_correct: true,
          created_at: "2023-08-25 10:06:00",
          updated_at: "2023-08-25 10:06:00",
        },
        {
          id: 14,
          question_id: 1,
          option_text: "London",
          is_correct: false,
          created_at: "2023-08-25 10:07:00",
          updated_at: "2023-08-25 10:07:00",
        },
        {
          id: 15,
          question_id: 1,
          option_text: "Berlin",
          is_correct: false,
          created_at: "2023-08-25 10:08:00",
          updated_at: "2023-08-25 10:08:00",
        },
        {
          id: 16,
          question_id: 1,
          option_text: "Rome",
          is_correct: false,
          created_at: "2023-08-25 10:09:00",
          updated_at: "2023-08-25 10:09:00",
        },
      ],
    },
  ],
};
export default quiz;
