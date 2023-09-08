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
      title: "Not So General Knowledge Quiz",
      description:
        "Test your knowledge on a variety of topics. Test your knowledge on a variety of topics. Test your knowledge on a variety of topics. asdsdas",
      unique_identifier: "GK-123",
      created_at: "2023-08-25 10:00:00",
      updated_at: "2023-08-25 10:30:00",
    },
    {
      id: 3,
      title: "Animals Quiz",
      description:
        "Test your knowledge on a variety of topics. Test your knowledge on a variety of topics. Test your knowledge on a variety of topics. asdsdas",
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
      quiz_id: 2,
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
      quiz_id: 3,
      question_text: "What is the fastest land animal?",
      question_type: 1,
      created_at: "2023-08-25 12:30:00",
      updated_at: "2023-08-25 12:30:00",
      options: [
        {
          id: 9,
          question_id: 3,
          option_text: "Cheetah",
          is_correct: true,
          created_at: "2023-08-25 12:31:00",
          updated_at: "2023-08-25 12:31:00"
        },
        {
          id: 10,
          question_id: 3,
          option_text: "Lion",
          is_correct: false,
          created_at: "2023-08-25 12:32:00",
          updated_at: "2023-08-25 12:32:00"
        },
        {
          id: 11,
          question_id: 3,
          option_text: "Giraffe",
          is_correct: false,
          created_at: "2023-08-25 12:33:00",
          updated_at: "2023-08-25 12:33:00"
        },
        {
          id: 12,
          question_id: 3,
          option_text: "Elephant",
          is_correct: false,
          created_at: "2023-08-25 12:34:00",
          updated_at: "2023-08-25 12:34:00"
        }
      ]
    },
    {
      id: 4,
      quiz_id: 3,
      question_text: "What is the largest species of shark?",
      question_type: 1,
      created_at: "2023-08-26 14:00:00",
      updated_at: "2023-08-26 14:00:00",
      options: [
        {
          id: 11,
          question_id: 4,
          option_text: "Great White Shark",
          is_correct: false,
          created_at: "2023-08-26 14:01:00",
          updated_at: "2023-08-26 14:01:00"
        },
        {
          id: 12,
          question_id: 4,
          option_text: "Hammerhead Shark",
          is_correct: false,
          created_at: "2023-08-26 14:02:00",
          updated_at: "2023-08-26 14:02:00"
        },
        {
          id: 13,
          question_id: 4,
          option_text: "Whale Shark",
          is_correct: true,
          created_at: "2023-08-26 14:03:00",
          updated_at: "2023-08-26 14:03:00"
        },
        {
          id: 14,
          question_id: 4,
          option_text: "Tiger Shark",
          is_correct: false,
          created_at: "2023-08-26 14:04:00",
          updated_at: "2023-08-26 14:04:00"
        }
      ]
    },    
    {
      id: 5,
      quiz_id: 3,
      question_text: "Which animal is known as the king of the jungle?",
      question_type: 1,
      created_at: "2023-08-26 14:10:00",
      updated_at: "2023-08-26 14:10:00",
      options: [
        {
          id: 15,
          question_id: 5,
          option_text: "Giraffe",
          is_correct: false,
          created_at: "2023-08-26 14:11:00",
          updated_at: "2023-08-26 14:11:00"
        },
        {
          id: 16,
          question_id: 5,
          option_text: "Lion",
          is_correct: true,
          created_at: "2023-08-26 14:12:00",
          updated_at: "2023-08-26 14:12:00"
        },
        {
          id: 17,
          question_id: 5,
          option_text: "Elephant",
          is_correct: false,
          created_at: "2023-08-26 14:13:00",
          updated_at: "2023-08-26 14:13:00"
        },
        {
          id: 18,
          question_id: 5,
          option_text: "Hippopotamus",
          is_correct: false,
          created_at: "2023-08-26 14:14:00",
          updated_at: "2023-08-26 14:14:00"
        }
      ]
    },   
    {
      id: 6,
      quiz_id: 3,
      question_text: "Which bird is known for its distinctive hoo-hoo sound at night?",
      question_type: 1,
      created_at: "2023-08-26 14:20:00",
      updated_at: "2023-08-26 14:20:00",
      options: [
        {
          id: 19,
          question_id: 6,
          option_text: "Eagle",
          is_correct: false,
          created_at: "2023-08-26 14:21:00",
          updated_at: "2023-08-26 14:21:00"
        },
        {
          id: 20,
          question_id: 6,
          option_text: "Owl",
          is_correct: true,
          created_at: "2023-08-26 14:22:00",
          updated_at: "2023-08-26 14:22:00"
        },
        {
          id: 21,
          question_id: 6,
          option_text: "Penguin",
          is_correct: false,
          created_at: "2023-08-26 14:23:00",
          updated_at: "2023-08-26 14:23:00"
        },
        {
          id: 22,
          question_id: 6,
          option_text: "Parrot",
          is_correct: false,
          created_at: "2023-08-26 14:24:00",
          updated_at: "2023-08-26 14:24:00"
        }
      ]
    },    
    {
      id: 7,
      quiz_id: 3,
      question_text: "Which mammal is capable of sustained flight?",
      question_type: 1,
      created_at: "2023-08-26 14:30:00",
      updated_at: "2023-08-26 14:30:00",
      options: [
        {
          id: 23,
          question_id: 7,
          option_text: "Bat",
          is_correct: true,
          created_at: "2023-08-26 14:31:00",
          updated_at: "2023-08-26 14:31:00"
        },
        {
          id: 24,
          question_id: 7,
          option_text: "Kangaroo",
          is_correct: false,
          created_at: "2023-08-26 14:32:00",
          updated_at: "2023-08-26 14:32:00"
        },
        {
          id: 25,
          question_id: 7,
          option_text: "Gorilla",
          is_correct: false,
          created_at: "2023-08-26 14:33:00",
          updated_at: "2023-08-26 14:33:00"
        },
        {
          id: 26,
          question_id: 7,
          option_text: "Dolphin",
          is_correct: false,
          created_at: "2023-08-26 14:34:00",
          updated_at: "2023-08-26 14:34:00"
        }
      ]
    },
    {
      id: 8,
      quiz_id: 3,
      question_text: "Which reptile is known for its ability to change color to match its surroundings?",
      question_type: 1,
      created_at: "2023-08-26 14:40:00",
      updated_at: "2023-08-26 14:40:00",
      options: [
        {
          id: 27,
          question_id: 8,
          option_text: "Turtle",
          is_correct: false,
          created_at: "2023-08-26 14:41:00",
          updated_at: "2023-08-26 14:41:00"
        },
        {
          id: 28,
          question_id: 8,
          option_text: "Crocodile",
          is_correct: false,
          created_at: "2023-08-26 14:42:00",
          updated_at: "2023-08-26 14:42:00"
        },
        {
          id: 29,
          question_id: 8,
          option_text: "Chameleon",
          is_correct: true,
          created_at: "2023-08-26 14:43:00",
          updated_at: "2023-08-26 14:43:00"
        },
        {
          id: 30,
          question_id: 8,
          option_text: "Iguana",
          is_correct: false,
          created_at: "2023-08-26 14:44:00",
          updated_at: "2023-08-26 14:44:00"
        }
      ]
    }
    
    
 
    
  ],
};
export default quiz;
