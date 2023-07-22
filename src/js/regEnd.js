let currentTab = 0; // Текущая вкладка будет первой вкладкой (0)
showStepRegistration(currentTab); // Отображение текущей вкладки

function showStepRegistration(numStep) {
  // Эта функция отобразит указанную вкладку формы ...
  let stepReg = document.getElementsByClassName("step");
  stepReg[numStep].style.display = "block";
  // ... и зафиксируйте кнопки Назад/Вперед:
  if (numStep == 0) {
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("btnBack").style.display = "inline";
  } else {
    document.getElementById("btnBack").style.display = "none";
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (numStep == stepReg.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Зарегистрироваться";
  } else {
    document.getElementById("nextBtn").innerHTML = "Далее";
  }
}

function nextPrev(numStep) {
  // Эта функция определит, какую вкладку отображать
  let stepReg = document.getElementsByClassName("step");
  // Выйдите из функции, если какое-либо поле на вкладке текущий является недопустимым:
  if (numStep == 1 && !validateForm()) return false;
  // Скрыть текущую вкладку:
  stepReg[currentTab].style.display = "none";
  // Увеличение или уменьшение текущей вкладки на 1:
  currentTab = currentTab + numStep;
  // если вы дошли до конца формы... :
  if (currentTab >= stepReg.length) {
    //...форма будет отправлена:
    document.getElementById("nextBtn").href = "#openModalReg";
    document.getElementById("content").style.display = "none";
    return false;
  }
  // В противном случае отобразите правильную вкладку:
  showStepRegistration(currentTab);
}

const inputLastName = document.getElementById("lastName");
const inputFirstName = document.getElementById("firstName");
const inputPatronymic = document.getElementById("patronymic");
const inputMailReg = document.getElementById("emailReg");
const inputPassReg = document.getElementById("passwordReg");
function inputValLength(inputName, limitLength) {
  if (inputName.value.length > limitLength) {
    inputName.style.marginBottom = "2px";
    inputName.style.borderColor = "rgba(208, 33, 33, 1)";
    inputName.labels[1].style.display = "block";
    inputName.labels[1].innerHTML = "Текст с ошибкой , делаете что-то не так";
  } else {
    inputName.style.borderColor = "rgba(93, 33, 208, 1)";
    inputName.labels[1].style.display = "none";
  }
}
function validateForm() {
  // Эта функция занимается проверкой полей формы
  let stepReg,
    inputOfStep,
    i,
    select,
    valid = true;
  const mail =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{8,20}/;
  stepReg = document.getElementsByClassName("step");
  inputOfStep = stepReg[currentTab].getElementsByTagName("input");
  select = stepReg[currentTab].getElementsByTagName("select");

  for (i = 0; i < select.length; i++) {
    if (select[i].value == "") {
      /* если хотя бы одно поле не заполнено, изменяем  на false */
      select[i].parentElement.className += ' select2-container--required';
      valid = false;
    }
  }

  // Цикл, который проверяет каждое поле ввода на текущей вкладке:
  for (i = 0; i < inputOfStep.length; i++) {
    // Если поле пустое...
    if (inputOfStep[i].value == "") {
      // добавьте в поле "invalid" класс:
      if (inputOfStep[i].id != "patronymic") {
        inputOfStep[i].style.borderColor = "rgba(208, 33, 33, 1)";
        inputOfStep[i].labels[1].style.display = "block";
        inputOfStep[i].labels[1].innerHTML = "Обязательное поле для ввода";

        // и установите текущий допустимый статус в false:
        valid = false;
      }
    }
    if (inputOfStep[i].getAttribute("type") == "email") {
      if (inputOfStep[i].value != "") {
        let isValid = mail.test(inputOfStep[i].value);
        if (!isValid) {
          inputOfStep[i].labels[1].style.display = "block";
          inputOfStep[i].labels[1].innerHTML = "Текст с ошибкой, делаете что-то не так";
          inputOfStep[i].style.marginBottom = "2px";
          inputOfStep[i].style.borderColor = "rgba(93, 33, 208, 1)";
          inputOfStep[i].style.borderColor = "rgba(208, 33, 33, 1)";
          inputOfStep[i].labels[0].style.color = "rgba(208, 33, 33, 1)";
        }
      }
    }
    if (inputOfStep[i].getAttribute("type") == "password") {
      if (inputOfStep[i].value != "") {
        let isValid = pass.test(inputOfStep[i].value);
        if (isValid == false) {
          inputOfStep[i].labels[1].style.display = "block";
          inputOfStep[i].labels[1].innerHTML = "Текст с ошибкой, делаете что-то не так";
          inputOfStep[i].style.marginBottom = "2px";
          inputOfStep[i].style.borderColor = "rgba(93, 33, 208, 1)";
          inputOfStep[i].style.borderColor = "rgba(208, 33, 33, 1)";
          inputOfStep[i].labels[0].style.color = "rgba(208, 33, 33, 1)";
          valid = false;
        }
      }
    }
    if (inputOfStep[i].getAttribute("type") == "text" && inputOfStep[i].id == "passwordReg") {
      if (inputOfStep[i].value != "") {
        let isValid = pass.test(inputOfStep[i].value);
        if (isValid == false) {
          inputOfStep[i].labels[1].innerHTML = "Текст с ошибкой, делаете что-то не так";
          inputOfStep[i].labels[1].style.display = "block";
          inputOfStep[i].style.marginBottom = "2px";
          inputOfStep[i].style.borderColor = "rgba(93, 33, 208, 1)";
          inputOfStep[i].style.borderColor = "rgba(208, 33, 33, 1)";
          inputOfStep[i].labels[0].style.color = "rgba(208, 33, 33, 1)";
          valid = false;
        }
      }
    }
  }
  return valid; // верните действительный статус
}
lastName.onblur = function () {
  if (lastName.value != "") {
    lastName.style.borderColor = "rgba(93, 33, 208, 0.5)";
    lastName.labels[0].style.color = "rgba(93, 33, 208, 0.5)";
  } else {
    lastName.style.borderColor = "rgba(21, 24, 28, 0.3)";
    lastName.labels[0].style.color = "rgba(21, 24, 28, 0.3)";
  }
};
lastName.onfocus = function () {
  lastName.style.borderColor = "rgba(93, 33, 208, 1)";
  lastName.labels[0].style.color = "rgba(93, 33, 208, 1)";
  lastName.labels[1].style.display = "none";
};
firstName.onblur = function () {
  if (firstName.value != "") {
    firstName.style.borderColor = "rgba(93, 33, 208, 0.5)";
    firstName.labels[0].style.color = "rgba(93, 33, 208, 0.5)";
  } else {
    firstName.style.borderColor = "rgba(21, 24, 28, 0.3)";
    firstName.labels[0].style.color = "rgba(21, 24, 28, 0.3)";
  }
};
firstName.onfocus = function () {
  firstName.style.borderColor = "rgba(93, 33, 208, 1)";
  firstName.labels[0].style.color = "rgba(93, 33, 208, 1)";
  firstName.labels[1].style.display = "none";
};
patronymic.onblur = function () {
  if (patronymic.value != "") {
    patronymic.style.borderColor = "rgba(93, 33, 208, 0.5)";
    patronymic.labels[0].style.color = "rgba(93, 33, 208, 0.5)";
  } else {
    patronymic.style.borderColor = "rgba(21, 24, 28, 0.3)";
    patronymic.labels[0].style.color = "rgba(21, 24, 28, 0.3)";
  }
};
patronymic.onfocus = function () {
  patronymic.style.borderColor = "rgba(93, 33, 208, 1)";
  patronymic.labels[0].style.color = "rgba(93, 33, 208, 1)";
  patronymic.labels[1].style.display = "none";
};

emailReg.onblur = function () {
  if (emailReg.value != "") {
    emailReg.style.borderColor = "rgba(93, 33, 208, 0.5)";
    emailReg.labels[0].style.color = "rgba(93, 33, 208, 0.5)";
  } else {
    emailReg.style.borderColor = "rgba(21, 24, 28, 0.3)";
    emailReg.labels[0].style.color = "rgba(21, 24, 28, 0.3)";
  }
};
emailReg.onfocus = function () {
  emailReg.style.borderColor = "rgba(93, 33, 208, 1)";
  emailReg.labels[0].style.color = "rgba(93, 33, 208, 1)";
  emailReg.labels[1].style.display = "none";
};
passwordReg.onblur = function () {
  if (passwordReg.value != "") {
    passwordReg.style.borderColor = "rgba(93, 33, 208, 0.5)";
    passwordReg.labels[0].style.color = "rgba(93, 33, 208, 0.5)";
  } else {
    passwordReg.style.borderColor = "rgba(21, 24, 28, 0.3)";
    passwordReg.labels[0].style.color = "rgba(21, 24, 28, 0.3)";
  }
};
passwordReg.onfocus = function () {
  passwordReg.style.borderColor = "rgba(93, 33, 208, 1)";
  passwordReg.labels[0].style.color = "rgba(93, 33, 208, 1)";
  passwordReg.labels[1].style.display = "none";
};
const hidePass = document.querySelector(".icon-hide-pass");
const openPass = document.querySelector(".icon-open-pass");
const iconPass = document.querySelector(".iconPass");
const iconText = document.querySelector(".iconText");
hidePass.addEventListener("click", () => {
  if (inputPassReg.getAttribute("type") === "password") {
    inputPassReg.type = "text";
    iconPass.classList.toggle("d-none");
    iconText.classList.toggle("d-none");
  } else if (inputPassReg.getAttribute("type") === "text") {
    inputPassReg.type = "password";
    iconText.classList.toggle("d-none");
    iconPass.classList.toggle("d-none");
  }
});

openPass.addEventListener("click", () => {
  if (inputPassReg.getAttribute("type") === "password") {
    inputPassReg.type = "text";
    iconPass.classList.toggle("d-none");
    iconText.classList.toggle("d-none");
  } else if (inputPassReg.getAttribute("type") === "text") {
    inputPassReg.type = "password";
    iconText.classList.toggle("d-none");
    iconPass.classList.toggle("d-none");
  }
});