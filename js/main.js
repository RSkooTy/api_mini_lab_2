import {setFormValue, submitSignUpForm, validateEmail, validatePassword, getValidationStatus, validatePasswordRepeat, validateEmpty, submitSignInForm} from "./utils.js"

// Выписываем все айдишники HTMl-элементов в константы для переиспользования
const first_name_id = 'first_name'
const last_name_id = 'last_name'
const password_id = 'password'
const email_id = 'email'
const password_repeat_id = 'password-repeat'

const sign_in_link_id = 'sign_in_link'
const sign_up_form_id = 'sign_up_form'
const sign_in_btn_id = 'log_in_btn'
const sign_up_btn_id = 'sign_up_btn'
const sign_in_form_id = 'sign_in_form'
const sign_in_email_id = 'sign_in_email'
const sign_in_password_id = 'sign_in_password'
const return_btn_id = 'return_btn'



// Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
// Значение, которое мы присваеваем этому аттрибуту - это функция, определённая в стрелочном стиле
// Гуглить по тегам "события JS", "onchange/oninput HTML", "стрелочные функции JS", ...

const first_name = document.getElementById(first_name_id);
first_name.oninput = (e) => setFormValue(first_name_id, e.target.value, validateEmpty)

const last_name = document.getElementById(last_name_id);
last_name.oninput = (e) => setFormValue(last_name_id, e.target.value, validateEmpty)

const email = document.getElementById(email_id);
email.oninput = (e) => setFormValue(email_id, e.target.value, validateEmail)

const password = document.getElementById(password_id)
password.oninput = (e) => {
    setFormValue(password_id, e.target.value, validatePassword);
    password_repeat.value ? setFormValue(password_repeat_id, password_repeat.value, validatePasswordRepeat) : () => {};
}

const password_repeat = document.getElementById(password_repeat_id)
password_repeat.oninput = (e) => setFormValue(password_repeat_id, e.target.value, validatePasswordRepeat)

const sign_in_email = document.getElementById(sign_in_email_id)
sign_in_email.oninput = (e) => setFormValue(sign_in_email_id, e.target.value, validateEmail)

const sign_in_password = document.getElementById(sign_in_password_id)
sign_in_password.oninput = (e) => setFormValue(sign_in_password_id, e.target.value, validatePassword)


// Меняем стили объекта DOM дерева. Это позволяет скрыть форму регистрации и показать форму авторизации
// Объект формы не исключается из DOM дерева, а просто становистя невидимым
const switch_to_sign_in = document.getElementById(sign_in_link_id);
switch_to_sign_in.onclick = (e) => {
  document.getElementById(sign_up_form_id).style.display = "none"
  document.getElementById(sign_in_form_id).style.display = ""
}

const return_btn = document.getElementById(return_btn_id);
return_btn.onclick = (e) => {
  document.getElementById(sign_up_form_id).style.display = ""
  document.getElementById(sign_in_form_id).style.display = "none"
}


const sign_up_btn = document.getElementById(sign_up_btn_id);
sign_up_btn.onclick = (e) => {
  // При нажатии кнопки в форме по умолчанию происходит перезагрузка страницы.
  // Чтобы отключить его, нужно отменить стандартное поведение события
  e.preventDefault()
  submitSignUpForm()
}

const sign_up_inputs = document.querySelectorAll('.sign-up')
console.log(sign_up_inputs)

const updateSignUpButtonState = () => {
    sign_up_btn.disabled = !getValidationStatus();
}

const handleInput = (field) => {
    setFormValue(field.id, field.value, validateEmpty);
    updateSignUpButtonState();
}

sign_up_inputs.forEach((field) => {
    field.oniput = (e) => handleInput(field);
})

updateSignUpButtonState();

const sign_in_btn = document.getElementById(sign_in_btn_id)
sign_in_btn.onclick = (e) =>{
  e.preventDefault()
  submitSignUpForm(email_in_id, password_in_id)
}

const sign_in_inputs = document.querySelectorAll('.sign-in')
const signInValues = {}

const updateSignInValue = (field) =>{
    signInValues[field.id] = field.value;
    setFormValue(field.id, field. value);
    sign_in_btn.disabled = !Object.values(signInValues).every((val) => String(val).length > 0);
};

const setSignInInput = (field) => {
    field.oniput = (e) => {
        updateSignInValue(field);
    };
};

sign_in_inputs.forEach((field) => {
    updateSignInValue(field);
    setSignInInput(field);
});

sign_in_btn.disabled = !getValidationStatus();
