const _quizData = {};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleOptions(q) {
  const isMulti = Array.isArray(q.answer);
  const correctTexts = isMulti
    ? q.answer.map(i => q.options[i])
    : [q.options[q.answer]];
  const shuffled = shuffle(q.options);
  const newAnswer = isMulti
    ? correctTexts.map(t => shuffled.indexOf(t))
    : shuffled.indexOf(correctTexts[0]);
  return { ...q, options: shuffled, answer: newAnswer };
}

function renderQuiz(containerId, originalQuestions) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const questions = shuffle(originalQuestions).map(shuffleOptions);
  _quizData[containerId] = questions;

  questions.forEach((q, qi) => {
    const isMulti = Array.isArray(q.answer);
    const block = document.createElement('div');
    block.className = 'quiz-block';

    const questionEl = document.createElement('div');
    questionEl.className = 'quiz-question';
    questionEl.innerHTML = `${qi + 1}. ${q.q}`;
    block.appendChild(questionEl);

    if (isMulti) {
      const hint = document.createElement('div');
      hint.className = 'quiz-multi-hint';
      hint.textContent = `Select all that apply (${q.answer.length} correct answers)`;
      block.appendChild(hint);
    }

    const ul = document.createElement('ul');
    ul.className = 'quiz-options';
    q.options.forEach((opt, oi) => {
      const li = document.createElement('li');
      const label = document.createElement('label');
      label.className = 'quiz-option-label';
      const input = document.createElement('input');
      input.type = isMulti ? 'checkbox' : 'radio';
      input.name = `q${containerId}-${qi}`;
      input.value = oi;
      const indicator = document.createElement('span');
      indicator.className = isMulti ? 'quiz-check-box' : 'quiz-radio-dot';
      const text = document.createElement('span');
      text.className = 'quiz-option-text';
      text.textContent = opt;
      label.appendChild(input);
      label.appendChild(indicator);
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
  const q = _quizData[containerId][qi];
  const isMulti = Array.isArray(q.answer);
  const feedback = document.getElementById(`feedback-${containerId}-${qi}`);

  if (isMulti) {
    const checked = [...document.querySelectorAll(`input[name="q${containerId}-${qi}"]:checked`)]
      .map(el => parseInt(el.value));
    if (checked.length === 0) {
      feedback.style.display = 'block';
      feedback.className = 'quiz-feedback';
      feedback.textContent = 'Please select at least one answer.';
      return;
    }
    const isCorrect = checked.slice().sort().toString() === q.answer.slice().sort().toString();
    feedback.style.display = 'block';
    feedback.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      feedback.textContent = '✓ Correct!';
    } else {
      const correctLabels = q.answer.map(i => q.options[i]).join(', ');
      feedback.textContent = `✗ Incorrect. Correct answers: ${correctLabels}. ${q.explanation || ''}`;
    }
  } else {
    const selected = document.querySelector(`input[name="q${containerId}-${qi}"]:checked`);
    if (!selected) {
      feedback.style.display = 'block';
      feedback.className = 'quiz-feedback';
      feedback.textContent = 'Please select an answer.';
      return;
    }
    const isCorrect = parseInt(selected.value) === q.answer;
    feedback.style.display = 'block';
    feedback.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'incorrect');
    feedback.textContent = isCorrect ? '✓ Correct!' : `✗ Incorrect. ${q.explanation || ''}`;
  }
}

function showScore(containerId) {
  const questions = _quizData[containerId];
  let correct = 0;
  questions.forEach((q, qi) => {
    const isMulti = Array.isArray(q.answer);
    if (isMulti) {
      const checked = [...document.querySelectorAll(`input[name="q${containerId}-${qi}"]:checked`)]
        .map(el => parseInt(el.value));
      if (checked.slice().sort().toString() === q.answer.slice().sort().toString()) correct++;
    } else {
      const selected = document.querySelector(`input[name="q${containerId}-${qi}"]:checked`);
      if (selected && parseInt(selected.value) === q.answer) correct++;
    }
  });
  const scoreDiv = document.getElementById(`score-${containerId}`);
  scoreDiv.style.display = 'block';
  scoreDiv.textContent = `Score: ${correct} / ${questions.length}`;
}
