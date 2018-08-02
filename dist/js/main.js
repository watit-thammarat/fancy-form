const questions = [
  { question: 'Enter your first name' },
  { question: 'Enter your last name' },
  { question: 'Enter you email', pattern: /\S+@\S+\.\S+/ },
  { question: 'Create a password', type: 'password' }
];

const shakeTime = 100;
const switchTime = 200;

let position = 0;

const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

document.addEventListener('DOMContentLoaded', getQuestion);

nextBtn.addEventListener('click', validate);

inputField.addEventListener('keyup', e => {
  if (e.keyCode == 13) {
    validate();
  }
});

function validate() {
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

function inputFail() {
  formBox.className = 'error';
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const x = ((i % 2) * 2 - 1) * 20;
      const y = 0;
      transform(x, y);
    }, shakeTime * i);

    setTimeout(() => {
      transform(0, 0);
    }, shakeTime * 6);

    inputField.focus();
  }
}

function inputPass() {
  formBox.className = '';

  setTimeout(() => {
    transform(0, 10);
  }, shakeTime * 0);

  setTimeout(() => {
    transform(0, 0);
  }, shakeTime * 1);

  questions[position].answer = inputField.value;
  position += 1;

  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';
    formComplete();
  }
}

function getQuestion() {
  const q = questions[position];

  inputLabel.innerHTML = q.question;
  inputField.type = q.type || 'text';
  inputField.value = q.answer || '';
  inputField.focus();

  progress.style.width = (position * 100) / questions.length + '%';

  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();
}

function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.width = '100%';
}

function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
}

function formComplete() {
  const h1 = document.createElement('h1');
  h1.className = 'end';
  h1.appendChild(
    document.createTextNode(
      `Thanks ${
        questions[0].answer
      }  You are register and will get email shortly`
    )
  );
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => {
      h1.style.opacity = 1;
    }, 50);
  }, 1000);
}
