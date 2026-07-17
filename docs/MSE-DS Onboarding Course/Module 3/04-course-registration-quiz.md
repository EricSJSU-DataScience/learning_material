---
layout: default
title: Course Registration Quiz
parent: Module 3
grand_parent: MSE-DS Onboarding Course
nav_order: 4
---

# Module 3 Quiz: Course Registration

Test your understanding of course registration, academic expectations, and Path@Penn features. Select your answers and click "Check" to get feedback.

---

<style>
.quiz-block {
  margin: 2rem 0;
  padding: 1.25rem 1.5rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  background: #f8f8f8;
  color: #1a1a1a;
}

.quiz-question {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.5;
  color: #1a1a1a;
}

.quiz-options {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

.quiz-options li {
  list-style: none !important;
  margin: 0.4rem 0 !important;
  padding: 0 !important;
}

.quiz-options li::before {
  display: none !important;
}

.quiz-option-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  background: #fff;
  color: #1a1a1a;
  font-size: 1rem;
  transition: border-color 0.15s, background 0.15s;
  user-select: none;
}

.quiz-option-label:hover {
  border-color: #5050d0;
  background: #f0f0ff;
}

.quiz-option-label input[type=radio] {
  display: none;
}

.quiz-radio-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #aaa;
  flex-shrink: 0;
  transition: border-color 0.15s, background 0.15s;
  box-sizing: border-box;
}

.quiz-option-label input[type=radio]:checked ~ .quiz-radio-dot {
  border-color: #5050d0;
  background: #5050d0;
  box-shadow: inset 0 0 0 3px #fff;
}

.quiz-option-label input[type=radio]:checked ~ .quiz-option-text {
  color: #3030a0;
  font-weight: 300;
}

.quiz-submit {
  margin-top: 1rem;
  padding: 0.45rem 1.2rem;
  background: #5050d0;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.quiz-submit:hover {
  background: #3838b0;
}

.quiz-score-btn {
  margin-top: 1.5rem;
  padding: 0.5rem 1.4rem;
  background: #fff;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s;
  display: block;
}

.quiz-score-btn:hover {
  background: #f0f0f0;
}

.quiz-feedback {
  margin-top: 0.6rem;
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  font-size: 0.88rem;
}

.quiz-feedback.correct {
  background: #edfaed;
  color: #1a6b1a;
  border: 1px solid #80c880;
}

.quiz-feedback.incorrect {
  background: #faeaea;
  color: #8b1a1a;
  border: 1px solid #e08080;
}

.quiz-score-display {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  background: #f0f0ff;
  border: 1px solid #5050d0;
  color: #3030a0;
}
</style>

<div id="quiz-container"></div>

<script>
const quizData = [
  {
    q: "Which of the following can you do through Path@Penn?",
    options: [
      "Update your emergency contacts and address information",
      "Access Library Services",
      "View student billing and payment information",
      "View academic records and transcript orders"
    ],
    answer: 0,
    explanation: "Path@Penn provides access to academic records, financial information, and student profile updates. Library services are accessed through a separate library portal. Correct answers: items 1, 3, and 4."
  },
  {
    q: "If the onboarding course is not completed by the due date then a registration hold may be placed on a student's account.",
    options: ["True", "False"],
    answer: 0,
    explanation: "Completing the onboarding course by its deadline is important. Failure to complete it may result in a registration hold being placed on your account, which would prevent you from registering for courses."
  },
  {
    q: "Students can expect to dedicate 15 hours or more to each course per week.",
    options: ["True", "False"],
    answer: 0,
    explanation: "MSE-DS Online courses are rigorous and require substantial time investment. Students should expect to dedicate an average of 15+ hours per week per course, with some weeks requiring 20-25 hours."
  },
  {
    q: "Students must register for at least one course unit during the Fall and Spring semesters in order to remain continuously enrolled in their programs.",
    options: ["True", "False"],
    answer: 0,
    explanation: "In the fall and spring terms, a student may not drop a course if it is the only course for which they are registered. In this case, they would need to request a Leave of Absence (or deferral in your first term)."
  },
  {
    q: "If I choose to work ahead, course staff will be available to help me with questions regarding modules that are in a future week of the course.",
    options: ["True", "False"],
    answer: 1,
    explanation: "Course staff will prioritize answering questions about current week's content. Questions about future weeks may take significantly longer to answer."
  },
  {
    q: "When is the last day to drop a course without financial obligation?",
    options: [
      "The late course drop deadline (typically weeks three through six of term)",
      "The course withdrawal deadline (typically begins at week seven of the term)",
      "The first day of classes (first day of week 1)",
      "The course drop deadline (typically the first two weeks of term)"
    ],
    answer: 3,
    explanation: "The course drop deadline, typically occurring in the first two weeks of the term, is when you can drop a course without any financial obligation and receive a 100% tuition refund."
  },
  {
    q: "Penn Engineering Online Courses end with which section number?",
    options: ["001", "501", "101", "401"],
    answer: 1,
    explanation: "Penn Engineering Online courses have a section number of 501 (e.g., CIT 5920-501). When searching for online courses in Path@Penn, look for courses ending in 501."
  }
];

function renderQuiz(containerId, questions) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  window._quizData = { [containerId]: questions };
  
  questions.forEach((q, qi) => {
    const block = document.createElement('div');
    block.className = 'quiz-block';
    
    const questionEl = document.createElement('div');
    questionEl.className = 'quiz-question';
    questionEl.innerHTML = `${qi + 1}. ${q.q}`;
    block.appendChild(questionEl);
    
    const ul = document.createElement('ul');
    ul.className = 'quiz-options';
    
    q.options.forEach((opt, oi) => {
      const li = document.createElement('li');
      const label = document.createElement('label');
      label.className = 'quiz-option-label';
      
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${containerId}-${qi}`;
      input.value = oi;
      
      const dot = document.createElement('span');
      dot.className = 'quiz-radio-dot';
      
      const text = document.createElement('span');
      text.className = 'quiz-option-text';
      text.textContent = opt;
      
      label.appendChild(input);
      label.appendChild(dot);
      label.appendChild(text);
      li.appendChild(label);
      ul.appendChild(li);
    });
    
    block.appendChild(ul);
    
    const btn = document.createElement('button');
    btn.className = 'quiz-submit';
    btn.textContent = 'Check';
    btn.addEventListener('click', () => checkAnswer(containerId, qi));
    block.appendChild(btn);
    
    const feedback = document.createElement('div');
    feedback.className = 'quiz-feedback';
    feedback.id = `feedback-${containerId}-${qi}`;
    feedback.style.display = 'none';
    block.appendChild(feedback);
    
    container.appendChild(block);
  });
  
  const scoreBtn = document.createElement('button');
  scoreBtn.className = 'quiz-score-btn';
  scoreBtn.textContent = 'Show Score';
  scoreBtn.addEventListener('click', () => showScore(containerId));
  container.appendChild(scoreBtn);
  
  const scoreDiv = document.createElement('div');
  scoreDiv.className = 'quiz-score-display';
  scoreDiv.id = `score-${containerId}`;
  scoreDiv.style.display = 'none';
  container.appendChild(scoreDiv);
}

function checkAnswer(containerId, qi) {
  const q = window._quizData[containerId][qi];
  const selected = document.querySelector(`input[name="q${containerId}-${qi}"]:checked`);
  const feedback = document.getElementById(`feedback-${containerId}-${qi}`);
  
  if (!selected) {
    feedback.style.display = 'block';
    feedback.className = 'quiz-feedback';
    feedback.textContent = 'Please select an answer.';
    return;
  }
  
  const isCorrect = parseInt(selected.value) === q.answer;
  feedback.style.display = 'block';
  feedback.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'incorrect');
  feedback.textContent = isCorrect ? '✓ Correct! ' + q.explanation : '✗ Incorrect. ' + q.explanation;
}

function showScore(containerId) {
  const questions = window._quizData[containerId];
  let correct = 0;
  
  questions.forEach((q, qi) => {
    const selected = document.querySelector(`input[name="q${containerId}-${qi}"]:checked`);
    if (selected && parseInt(selected.value) === q.answer) correct++;
  });
  
  const scoreDiv = document.getElementById(`score-${containerId}`);
  scoreDiv.style.display = 'block';
  scoreDiv.textContent = `Score: ${correct} / ${questions.length}`;
}

document.addEventListener('DOMContentLoaded', function() {
  renderQuiz('quiz-container', quizData);
});
</script>

---

**Next:** [Module 4: Coming Soon](../Module%204/index.md)
