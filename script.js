 // === Data storage simulation ===
  // Registered users: array of objects {username, password, role}
  const users = [];

  // Active quizzes, keyed by quiz code: {teacherUsername, questions: [...]}
  const quizzes = {};

  // Current logged-in user info
  let currentUser = null;
  let currentQuizCode = null;
  let studentCurrentQuiz = null;
  let studentCurrentQuestionIndex = 0;
  let studentScore = 0;

  // === ELEMENTS ===
  const loginRegisterSection = document.getElementById('login-register-section');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const toRegisterLink = document.getElementById('to-register');
  const toLoginLink = document.getElementById('to-login');
  const formTitle = document.getElementById('form-title');

  const teacherDashboard = document.getElementById('teacher-dashboard');
  const teacherNameSpan = document.getElementById('teacher-name');
  const quizCodeInput = document.getElementById('quiz-code');
  const generateCodeBtn = document.getElementById('generate-code');
  const addQuestionForm = document.getElementById('add-question-form');
  const questionList = document.getElementById('question-list');
  const logoutTeacherBtn = document.getElementById('logout-teacher');

  const studentDashboard = document.getElementById('student-dashboard');
  const studentNameSpan = document.getElementById('student-name');
  const studentQuizCodeInput = document.getElementById('student-quiz-code');
  const startQuizBtn = document.getElementById('start-quiz-btn');
  const quizSection = document.getElementById('quiz-section');
  const quizQuestionText = document.getElementById('quiz-question-text');
  const opt1Text = document.getElementById('opt1-text');
  const opt2Text = document.getElementById('opt2-text');
  const opt3Text = document.getElementById('opt3-text');
  const opt4Text = document.getElementById('opt4-text');
  const submitAnswerBtn = document.getElementById('submit-answer-btn');
  const quizProgress = document.getElementById('quiz-progress');
  const quizResult = document.getElementById('quiz-result');
  const finalScoreSpan = document.getElementById('final-score');
  const totalQuestionsSpan = document.getElementById('total-questions');
  const finishQuizBtn = document.getElementById('finish-quiz-btn');
  const logoutStudentBtn = document.getElementById('logout-student');

  // === Functions ===

  // Switch to Register form
  toRegisterLink.onclick = () => {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    toRegisterLink.classList.add('hidden');
    toLoginLink.classList.remove('hidden');
    formTitle.textContent = 'Register';
  };

  // Switch to Login form
  toLoginLink.onclick = () => {
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    toLoginLink.classList.add('hidden');
    toRegisterLink.classList.remove('hidden');
    formTitle.textContent = 'Login';
  };

  // Register user
  registerForm.onsubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;
    const password2 = document.getElementById('register-password2').value;
    const role = document.getElementById('register-role').value;

    if (!username || !password || !password2 || !role) {
      alert('Please fill all fields');
      return;
    }
    if(password !== password2){
      alert('Passwords do not match');
      return;
    }
    if(users.find(u => u.username === username)){
      alert('Username already exists');
      return;
    }

    users.push({username, password, role});
    alert('Registration successful! Please login.');
    registerForm.reset();
    toLoginLink.click();
  };

  // Login user
  loginForm.onsubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const role = document.getElementById('login-role').value;

    if (!username || !password || !role) {
      alert('Please fill all fields');
      return;
    }

    const user = users.find(u => u.username === username && u.password === password && u.role === role);

    if (!user) {
      alert('Invalid credentials or role');
      return;
    }
    currentUser = user;

    if(role === 'teacher'){
      showTeacherDashboard();
    } else {
      showStudentDashboard();
    }

    loginForm.reset();
  };

  // Show Teacher Dashboard
  function showTeacherDashboard(){
    loginRegisterSection.classList.add('hidden');
    studentDashboard.classList.add('hidden');
    teacherDashboard.classList.remove('hidden');

    teacherNameSpan.textContent = currentUser.username;

    // If teacher already has a quiz, show code; else generate new code
    if(quizzes[currentUser.username]){
      quizCodeInput.value = quizzes[currentUser.username].code;
    } else {
      generateNewQuizCode();
    }

    renderQuestionList();
  }

  // Show Student Dashboard
  function showStudentDashboard(){
    loginRegisterSection.classList.add('hidden');
    teacherDashboard.classList.add('hidden');
    studentDashboard.classList.remove('hidden');

    studentNameSpan.textContent = currentUser.username;

    // Reset quiz UI
    studentQuizCodeInput.value = '';
    quizSection.classList.add('hidden');
    quizResult.classList.add('hidden');
    submitAnswerBtn.disabled = false;
  }

  // Generate random quiz code
  function generateNewQuizCode(){
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    quizzes[currentUser.username] = {
      code: code,
      questions: []
    };
    quizCodeInput.value = code;
    renderQuestionList();
  }

  generateCodeBtn.onclick = () => {
    generateNewQuizCode();
    alert('New quiz code generated: ' + quizCodeInput.value);
  };

  // Add question form submit
  addQuestionForm.onsubmit = (e) => {
    e.preventDefault();
    const questionText = document.getElementById('question-text').value.trim();
    const option1 = document.getElementById('option1').value.trim();
    const option2 = document.getElementById('option2').value.trim();
    const option3 = document.getElementById('option3').value.trim();
    const option4 = document.getElementById('option4').value.trim();
    const correctOption = Number(document.getElementById('correct-option').value);

    if(!questionText || !option1 || !option2 || !option3 || !option4 || !(correctOption >=1 && correctOption <=4)){
      alert('Please fill all fields correctly');
      return;
    }

    quizzes[currentUser.username].questions.push({
      question: questionText,
      options: [option1, option2, option3, option4],
      correct: correctOption
    });

    addQuestionForm.reset();
    renderQuestionList();
  };

  // Render question list for teacher
  function renderQuestionList(){
    const questions = quizzes[currentUser.username].questions;
    questionList.innerHTML = '';
    if(questions.length === 0){
      questionList.innerHTML = '<li>No questions added yet.</li>';
      return;
    }
    questions.forEach((q,i) => {
      const li = document.createElement('li');
      li.textContent = `${i+1}. ${q.question} (Correct: Option ${q.correct})`;
      questionList.appendChild(li);
    });
  }

  // Logout buttons
  logoutTeacherBtn.onclick = () => {
    currentUser = null;
    currentQuizCode = null;
    teacherDashboard.classList.add('hidden');
    loginRegisterSection.classList.remove('hidden');
  };
  logoutStudentBtn.onclick = () => {
    currentUser = null;
    currentQuizCode = null;
    studentDashboard.classList.add('hidden');
    loginRegisterSection.classList.remove('hidden');
  };

  // STUDENT QUIZ LOGIC

  startQuizBtn.onclick = () => {
    const enteredCode = studentQuizCodeInput.value.trim().toUpperCase();
    if(!enteredCode){
      alert('Please enter quiz code');
      return;
    }
    // Find quiz by code
    let foundQuiz = null;
    for(const teacher in quizzes){
      if(quizzes[teacher].code === enteredCode){
        foundQuiz = quizzes[teacher];
        break;
      }
    }
    if(!foundQuiz){
      alert('Invalid quiz code');
      return;
    }
    if(foundQuiz.questions.length === 0){
      alert('Quiz has no questions yet');
      return;
    }

    currentQuizCode = enteredCode;
    studentCurrentQuiz = foundQuiz;
    studentCurrentQuestionIndex = 0;
    studentScore = 0;

    // Show quiz UI
    quizSection.classList.remove('hidden');
    quizResult.classList.add('hidden');
    document.getElementById('join-quiz-section').classList.add('hidden');
    loadQuestion();
  };

  // Load current question
  function loadQuestion(){
    const q = studentCurrentQuiz.questions[studentCurrentQuestionIndex];
    quizQuestionText.textContent = `Q${studentCurrentQuestionIndex+1}: ${q.question}`;
    opt1Text.textContent = q.options[0];
    opt2Text.textContent = q.options[1];
    opt3Text.textContent = q.options[2];
    opt4Text.textContent = q.options[3];
    submitAnswerBtn.disabled = false;
    quizProgress.textContent = `Question ${studentCurrentQuestionIndex+1} of ${studentCurrentQuiz.questions.length}`;

    // Clear previous selection
    const options = document.getElementsByName('quiz-option');
    options.forEach(opt => opt.checked = false);
  }

  submitAnswerBtn.onclick = () => {
    // Check selected answer
    const options = document.getElementsByName('quiz-option');
    let selected = null;
    options.forEach(opt => {
      if(opt.checked) selected = Number(opt.value);
    });
    if(!selected){
      alert('Please select an option');
      return;
    }
    // Check correct
    if(selected === studentCurrentQuiz.questions[studentCurrentQuestionIndex].correct){
      studentScore++;
    }
    studentCurrentQuestionIndex++;
    if(studentCurrentQuestionIndex >= studentCurrentQuiz.questions.length){
      // Quiz finished
      showResult();
    } else {
      loadQuestion();
    }
  };

  function showResult(){
    quizSection.classList.add('hidden');
    quizResult.classList.remove('hidden');
    finalScoreSpan.textContent = studentScore;
    totalQuestionsSpan.textContent = studentCurrentQuiz.questions.length;
  }

  finishQuizBtn.onclick = () => {
    // Reset for new quiz
    quizResult.classList.add('hidden');
    document.getElementById('join-quiz-section').classList.remove('hidden');
    studentQuizCodeInput.value = '';
  };