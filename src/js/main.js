const hidePass = document.querySelector(".icon-hide-pass");
const openPass = document.querySelector(".icon-open-pass");
const inputPass = document.getElementById("password");
const iconPass = document.querySelector(".iconPass");
const iconText = document.querySelector(".iconText");
const inputMail = document.getElementById("email");
const loginBtn = document.querySelector(".content__form-btn");
const startModal = document.getElementById("startModal");
/* тестовые пользователи */
const oUsers = [
  {
      login: "student@lad24.ru",
      password: "#01Study9",
      category: "student"
  },
  {
      login: "school@lad24.ru",
      password: "#01Study8",
      category: "student"
  },
  {
      login: "child@lad24.ru",
      password: "#01Study7",
      category: "student"
  },
  {
      login: "teacher@lad24.ru",
      password: "#01Study0",
      category: "teacher"
  },
  {
      login: "mentor@lad24.ru",
      password: "#01Study9",
      category: "teacher"
  }
]

hidePass.addEventListener("click", () => {
  if (inputPass.getAttribute("type") === "password") {
    inputPass.type = "text";
    iconPass.classList.toggle("d-none");
    iconText.classList.toggle("d-none");
  } else if (inputPass.getAttribute("type") === "text") {
    inputPass.type = "password";
    iconText.classList.toggle("d-none");
    iconPass.classList.toggle("d-none");
  }
});

openPass.addEventListener("click", () => {
  if (inputPass.getAttribute("type") === "password") {
    inputPass.type = "text";
    iconPass.classList.toggle("d-none");
    iconText.classList.toggle("d-none");
  } else if (inputPass.getAttribute("type") === "text") {
    inputPass.type = "password";
    iconText.classList.toggle("d-none");
    iconPass.classList.toggle("d-none");
  }
});

loginBtn.addEventListener("click", () => {
  if (inputMail.value == "") {
    inputMail.style.borderColor = "rgba(208, 33, 33, 1)";
    inputMail.labels[1].style.display = "block";
    inputMail.labels[1].innerHTML = "Обязательное поле для ввода";
  }
  if (inputPass.value == "") {
    inputPass.style.borderColor = "rgba(208, 33, 33, 1)";
    inputPass.labels[1].style.display = "block";
    inputPass.labels[1].innerHTML = "Обязательное поле для ввода";
  }
  if (inputMail.value != "" && inputPass.value != "") {
    let validUser = oUsers.some(function(item) {
      return inputMail.value === item.login && inputPass.value === item.password
    })
    let checkedUser = oUsers.filter(function(item) {
      return inputMail.value === item.login && inputPass.value === item.password
    })
    if (validUser) {
      if (checkedUser[0].category === "student") window.location.href = "../studentMain.html";
      else window.location.href = "../teacherMain.html";
    } else {
      inputMail.style.marginBottom = "2px";
      inputMail.style.borderColor = "rgba(208, 33, 33, 1)";
      inputMail.labels[0].style.color = "rgba(208, 33, 33, 1)";
      inputMail.labels[1].style.display = "block";
      inputMail.labels[1].innerHTML = "Текст с ошибкой , делаете что-то не так";

      inputPass.style.marginBottom = "2px";
      inputPass.style.borderColor = "rgba(208, 33, 33, 1)";
      inputPass.labels[0].style.color = "rgba(208, 33, 33, 1)";
      inputPass.labels[1].style.display = "block";
      inputPass.labels[1].innerHTML = "Текст с ошибкой , делаете что-то не так";
    }
  }
});
password.onblur = function () {
  if (password.value != "") {
    password.style.borderColor = "rgba(93, 33, 208, 0.5)";
    password.labels[0].style.color = "rgba(93, 33, 208, 0.5)";
  } else {
    password.style.borderColor = "rgba(21, 24, 28, 0.2)";
    password.labels[0].style.color = "rgba(21, 24, 28, 0.3)";
  }
};
password.onfocus = function () {
  password.style.borderColor = "rgba(93, 33, 208, 1)";
  password.labels[0].style.color = "rgba(93, 33, 208, 1)";
  password.labels[1].style.display = "none";
};
email.onblur = function () {
  if (email.value != "") {
    email.style.borderColor = "rgba(93, 33, 208, 0.5)";
    email.labels[0].style.color = "rgba(93, 33, 208, 0.5)";
  } else {
    email.style.borderColor = "rgba(21, 24, 28, 0.2)";
    email.labels[0].style.color = "rgba(21, 24, 28, 0.3)";
  }
};
email.onfocus = function () {
  email.style.borderColor = "rgba(93, 33, 208, 1)";
  email.labels[0].style.color = "rgba(93, 33, 208, 1)";
  email.labels[1].style.display = "none";
};
function passLength() {
  if (inputPass.value.length > 20) {
    inputPass.style.marginBottom = "2px";
    inputPass.labels[1].style.display = "block";
    inputPass.labels[1].innerHTML = "Текст с ошибкой , делаете что-то не так";
  } else {
    inputPass.labels[1].style.display = "none";
  }
}