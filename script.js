// <!-- getting elemements to validate user input to know what user is typing -->

const form = document.getElementById('formmy');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');
// add events
console.log(form)
form.addEventListener('submit', (event) => {
    event.preventDefault(); /* stop by default form submission => no ? in url on click*/
    validate();
});


// sendData fn define for success inputs

const sendData = (usernameVal, sRate, count) => {
    // check if all classes in form control are success
    if (sRate === count) {
        alert('registration successfull');
        swal("Welcome!" + usernameVal, "Registration successfull", "success");

        // after registration send to different page
        location.href = `demo.html?username=${usernameVal}`;
    }
}



// for final data validation
// define on top as => fn used , define be4 using

const setSuccesMsg = (usernameVal) => {
    let formCon = document.getElementsByClassName('form-control');

    var count = formCon.length - 1;

    for (var i = 0; i < formCon.length; i++) {
        if (formCon[i].className === "form-control success") {
            var sRate = 0 + i; /* if all have success cls then send data*/
            console.log(sRate);
            sendData(usernameVal, sRate, count);
        } else {
            return false;
        }
    }
}


// more email validation so @shouldn't come in beginning of input field
const isEmail = (emailVal) => {
    var atSymbol = emailVal.indexOf("@");
    if (atSymbol < 1) return false;
    var dot = emailVal.lastIndexOf("."); /* last index coz email can contain in b/w dots also ( dish.sharma@aol.com)*/
    if (dot <= atSymbol + 2) return false; /* atleast 2 char needed after @ ==> @co.com/@eu.in*/
    if (dot === emailVal.length - 1) return false;
    return true;
}



// define validate fn
// trim remove whitespaces from B.S. of string, original not changed
// NOTE = whenever we define const fn we need to define fns used on top of it
const validate = () => {
        const usernameVal = username.value.trim();
        const emailVal = email.value.trim();
        const phoneVal = phone.value.trim();
        const passwordVal = password.value.trim();
        const cpasswordVal = cpassword.value.trim();
        // validate username
        if (usernameVal === "") {
            setErrorMsg(username, 'username cannot be blank');
        } else if (usernameVal.length <= 2) {
            setErrorMsg(username, 'username minimum 3 characters');
        } else {
            setSuccessMsg(username);
        }
        // validate email
        if (emailVal === "") {
            setErrorMsg(email, 'email cannot be blank')
        } else if (!isEmail(emailVal)) {
            setErrorMsg(email, 'Not a valid email')
        } else {
            setSuccessMsg(email);
        }


        // validate phone
        if (phoneVal === "") {
            setErrorMsg(phone, 'Not a valid phone number ');
        } else if (phoneVal.length !== 10) {
            setErrorMsg(phone, 'Not a valid phone number ');
        } else {
            setSuccessMsg(phone);
        }
        // validate password
        if (passwordVal === "") {
            setErrorMsg(password, "password can't be blank ");
        } else if (passwordVal.length <= 5) {
            setErrorMsg(password, 'Minimum 6 char');
        } else {
            setSuccessMsg(password);
        }
        // validate cpassword
        if (cpasswordVal === "") {
            setErrorMsg(cpassword, "password can't be blank ");
        } else if (cpasswordVal !== passwordVal) {
            setErrorMsg(cpassword, 'password not matched');
        } else {
            setSuccessMsg(cpassword);
        }
        // to check if formcontrol success class is added
        setSuccesMsg(usernameVal);
    }
    // Error msg fn to display error based on invalid user input
    // NOTE = in strict mode it will give an error, as fn keyword is used n no strict mode
    // ... it will not give an error, if fat => used then define before using

function setErrorMsg(input, errormsgs) {
    const formControl = input.parentElement; /* store div related to input type*/
    const small = formControl.querySelector('small'); /* select small tag in that div */
    formControl.className = "form-control error"; /* add error class*/
    small.innerText = errormsgs; /* set text of arg= error msg*/
}
// Success msg fn
function setSuccessMsg(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}