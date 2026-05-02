let quizData = [];
let current = 0;
let answers = [];
let timeLeft = 1200;
let timerInterval;

// STUDENT NAME
let studentName = localStorage.getItem("studentName");

document.getElementById("student").innerText =
  "Student: " + studentName;

// LOAD QUESTIONS
fetch("questions.json")
.then(res => res.json())
.then(data => {

  quizData = data;

  answers = new Array(quizData.length);

  loadQuestion();

  startTimer();

});

// TIMER
function startTimer(){

  timerInterval = setInterval(() => {

    let minutes = Math.floor(timeLeft / 60);

    let seconds = timeLeft % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("timer").innerText =
      "Time: " + minutes + ":" + seconds;

    timeLeft--;

    if(timeLeft < 0){
      clearInterval(timerInterval);
      submitQuiz();
    }

  },1000);

}

// LOAD QUESTION
function loadQuestion(){

  let q = quizData[current];

  document.getElementById("progress").innerText =
    "Question " + (current + 1) + " of " + quizData.length;

  document.getElementById("question").innerText =
    q.question;

  let html = "";

  q.options.forEach(opt => {

    let checked =
      answers[current] === opt ? "checked" : "";

    html += `
      <label>
        <input type="radio"
        name="option"
        value="${opt}"
        ${checked}
        onchange="saveAnswer('${opt}')">

        ${opt}
      </label>
    `;

  });

  document.getElementById("options").innerHTML = html;

}

// SAVE ANSWER
function saveAnswer(val){
  answers[current] = val;
}

// NEXT
function next(){

  if(current < quizData.length - 1){
    current++;
    loadQuestion();
  }

}

// PREVIOUS
function prev(){

  if(current > 0){
    current--;
    loadQuestion();
  }

}

// SUBMIT
function submitQuiz(){

  clearInterval(timerInterval);

  let score = 0;

  for(let i = 0; i < quizData.length; i++){

    if(answers[i] === quizData[i].answer){
      score++;
    }

  }

  document.getElementById("result").innerHTML =
    `
      <h2>Exam Finished</h2>
      <p>${studentName}</p>
      <p>Score: ${score} / ${quizData.length}</p>
    `;
}