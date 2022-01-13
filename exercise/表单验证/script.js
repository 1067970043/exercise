const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if(!checkRequired([username, email, password, password2])){
        checkLength(username, 3, 15);
        checkLength(password, 6, 25);
        checkemail(email);
        checkpassword(password, password2);
    }
})

//检查是否填写
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function(input) {
        if(input.value.trim() === ''){
            showError(input, `请填写`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });
    return isRequired;
}

//检查input长度
function checkLength(input , min , max) {
    if(input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)}不得少于${min}字符`
        );
    } else
    if(input.value.length > max){
        showError(
            input,
            `${getFieldName(input)}不得多于${max}字符`
        );
    } else {
        showSuccess(input);
    }
}

//提示信息
function showError(input , message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}

function getFieldName(input) {
    if(input.id == 'username')
    return '用户名';
    if(input.id == 'password')
    return '密码';
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkemail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, '请输入正确的邮箱')
    }
}

function checkpassword(input1, input2) {
    if(input1.value !== input2.value){
        showError(input2, '两次输入密码不一致')
    }
}