let currentUser = [];
let guestLogin;

getItemLoginDatas();


/*--------------------------------------------------------------------------------------*/

function checkRememberMe() {
  if (currentUser[0] && currentUser[0]['rememberMe'] == true) {
    window.location.href = "summary.html";
  } else { }
}

async function initLogin() {
  checkRememberMe();
  await init();

}

async function login() {
  currentUser = [];

  let email = document.getElementById('email_login').value;
  let password = document.getElementById('password_login').value;
  let wrongUserAlert = document.getElementById('wrongUser');
  let rememberMeCheckbox = document.getElementById('rememberMe');

  // document.getElementById('login-btn').disabled = true;
  await getCurrentUser(email, currentUser);

  if (currentUser.length == 1 && currentUser[0]['password'] == password) {
    await saveLoginSettings(rememberMeCheckbox, wrongUserAlert);
    await importDatas();
  } else {
    wrongUserAlert.innerHTML = 'E-Mail or Password is wrong';
  }
}

async function saveLoginSettings(rememberMeCheckbox, wrongUserAlert) {
  if (rememberMeCheckbox.checked == true) {
    currentUser[0]['rememberMe'] = true;
  } else if (rememberMeCheckbox.checked == false) {
    currentUser[0]['rememberMe'] = false;
  }
  wrongUserAlert.innerHTML = '';
}

async function importDatas() {
  await importUserTasks(currentUser[0]['email']);
  await importUserContacts(currentUser[0]['email']);
}

async function defineContactsIDs() {
  contactsIDs = [];
  for (let c = 0; c < contacts.length; c++) {
    let contactID = contacts[c]['id'];
    contactsIDs.push(contactID);
  }
}

async function loginAsGuest() {
  guestLogin = [];
  guestLogin = { name: 'name', disableWindow: false };
  await setItem();
  setItemLoginDatas();
  location.href = "summary.html";
}

function setIconChars() {
  if (currentUser[0]) {
    document.getElementById('userChars').innerHTML = `${currentUser[0]['name'].charAt(0).toUpperCase()}`;
  } else if (guestLogin) {
    document.getElementById('userChars').innerHTML = 'U';
  }
}


function openSignUpSection() {
  document.getElementById('login_container').classList.add('d-none');
  document.getElementById('signUp_container').classList.remove('d-none');
  resetSignUpForm();
}

function closeSignUpSection() {
  document.getElementById('wrongUser').innerHTML = '';
  document.getElementById('loginForm').reset();
  document.getElementById('login_container').classList.remove('d-none');
  document.getElementById('signUp_container').classList.add('d-none');
}

async function addNewUser() {
  let email = document.getElementById("email_signUp").value;
  let name = document.getElementById("name_signUp").value;
  let password = document.getElementById("password_signUp").value;
  let comparePassword = document.getElementById("comparePassword_signUp").value;

  let signUpMessage = document.getElementById('wrongSignUp');
  let policy_checkbox = document.getElementById('policy_checkbox');

  let userCheck = [];
  await checkUserExistence(email, userCheck);
  if (userCheck[0] == true) {
    signUpMessage.innerHTML = 'User already exists';
  }
  else {
    await createNewUserInFirebase(email, name, password, comparePassword, signUpMessage, policy_checkbox);
  }
}

async function createNewUserInFirebase(email, name, password, comparePassword, signUpMessage, policy_checkbox) {
  if (policy_checkbox.checked == false) {
    signUpMessage.innerHTML = 'Please accept our privacy policies';
  } else {
    if (password.value == comparePassword.value) {
      await addUser_firebase(email, name, password, false, false);
      resetSignUpForm();
      closeSignUpSection();
      signUpMessage.innerHTML = '';
    } else {
      signUpMessage.innerHTML = `Password's don't match`;
    };
  }
}

function resetSignUpForm() {
  document.getElementById('wrongSignUp').innerHTML = '';
  document.getElementById('signUpForm').reset();
}







async function setItemLoginDatas() {
  let currentUserToText = JSON.stringify(currentUser);
  localStorage.setItem('currentUserStorage', currentUserToText);

  let guestLoginToText = JSON.stringify(guestLogin);
  localStorage.setItem('guestLoginStorage', guestLoginToText);
}

function getItemLoginDatas() {
  let currentUserToArray = localStorage.getItem('currentUserStorage');
  if (currentUserToArray) {
    if (currentUserToArray == 'undefined') { }
    else { currentUser = JSON.parse(currentUserToArray); }
  }

  let guestLoginToArray = localStorage.getItem('guestLoginStorage');
  if (guestLoginToArray) {
    if (guestLoginToArray == 'undefined') { }
    else { guestLogin = JSON.parse(guestLoginToArray); }
  }
}





function open_close_LogoutMenu() {
  let logOutMenu = document.getElementById('log_out_container');
  if (logOutMenu.classList.contains('d-none'))
    logOutMenu.classList.remove('d-none');
  else {
    logOutMenu.classList.add('d-none');
  }
}

async function logOut() {
  resetArraysAndLogOut();
}

async function resetArraysAndLogOut() {
  tasks = tasksReset;
  contacts = contactsReset;
  contactsIDs = [];
  currentUser = [];
  guestLogin = [];
  setItemLoginDatas();
  await setItem();
  window.location.href = "index.html";
}

function goBackHome() {
  location.replace('summary.html');
}

function goToHelp() {
  location.replace('help.html');
}