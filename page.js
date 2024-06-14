const form = document.getElementById('credit-card-form');
const inputName = document.getElementById('name');
const inputNumber = document.getElementById('number');
const month = document.getElementById('input-space');
const year = document.getElementById('input-space-2');
const cvcBox = document.getElementById('cvc');
const successPage = document.querySelector('.notification-bar');
const button = document.querySelector('.continue-btn');




inputName.oninput = () =>{
    document.querySelector('.cardholder').innerText = inputName.value;
}
 
inputNumber.oninput = () =>{
    var formattedNumber = CardNumberFormat(inputNumber.value);
    document.querySelector('.card-number').innerText = formattedNumber;
}    
 
month.oninput = () =>{
    document.querySelector('.displayed-month').innerText = month.value;
}
 
year.oninput = () =>{
    document.querySelector('.displayed-year').innerText = year.value;
}    
 
cvcBox.oninput = () =>{
    document.querySelector('.cvc-code').innerText = cvcBox.value;
}

//submit the form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputValues();
});


//write a function to display error/failed class
const setError =(input, message)=>{
    const inputBox = input.parentElement;
    const errorDisplay = inputBox.querySelector('.error');

    errorDisplay.innerText = message;
    if (inputBox.classList.contains('success')){
        inputBox.classList.remove('success');
    }
    inputBox.classList.add('failed');
}

//write a function to display success messages
const setSuccess =(input)=> {
    const inputBox = input.parentElement;
    const errorDisplay = inputBox.querySelector('.error');

    errorDisplay.innerText = '';
    if (inputBox.classList.contains('failed')){
        inputBox.classList.remove('failed');
    }
    inputBox.classList.add('success');
}

//check if a value is a number 
const isNotANumber=(Value)=>{
    return isNaN(Value);
}

const CardNumberFormat=(CardNumber) =>{
    // Remove all non-digit characters
    CardNumber = CardNumber.replace(/\D/g, '');
    
    // Define the desired format using regex
    var formattedNumber = CardNumber.replace(/(\d{4}(?=\d)|\d{1,16}$)/g, '$1 ');

    return formattedNumber;
}


const checkInputValues =()=> {

    //list the neccessary inputs needed to check their values
    const cardNameValue = inputName.value.trim();
    const cardNumberValue = inputNumber.value.trim();
    const monthValue =  month.value.trim();
    const yearValue =  year.value.trim();
    const cvcBoxValue =  cvcBox.value.trim();


    //write an if/else statement to check the values each input, and then
    // pass either success or error class to it..

    if(cardNameValue == ''){
        setError(inputName, "Name can't be Blank");
    }else if (!isNotANumber(cardNameValue) || cardNameValue.length < 5){
        setError(inputName, "Wrong format");
    }else{
        setSuccess(inputName);
    }

    if(cardNumberValue == ''){
        setError(inputNumber, "Can't be Blank");
    }else if(isNotANumber(cardNumberValue)){
        setError(inputNumber, "Wrong format, numbers only");
    }else{
        setSuccess(inputNumber);
    }

    if(monthValue == ''){
        setError(month, "Can't be Blank");
    }else if(monthValue > 12){
        setError(month, "invalid month");
    }else if(isNotANumber(monthValue)){
        setError(month, "Not a number");    
    }else{
        setSuccess(month);
    }

    if(yearValue == ''){
        setError(year, "Can't be Blank");
    }else if(yearValue < 24){
        setError(year, "Card not supported");
    }else if(isNotANumber(yearValue)){
        setError(year, "Not a number");        
    }else{
        setSuccess(year);
    }

    if(cvcBoxValue == ''){
        setError(cvcBox, "Can't be Blank");    
    }else if(isNotANumber(cvcBoxValue)){
        setError(cvcBox, "Not a number");
    }else{
        setSuccess(cvcBox);
    }

    //Attach a success pop-up message when the check is done!
    showSuccessPage();
    

}

function showSuccessPage(){
    if(formSuccess() == true){
        successPage.classList.add('display');
    }
}

//Attach an event listener to the button, to remove the 'success page'
button.addEventListener('click', ()=>{
    document.getElementById('credit-card-form').reset();
    document.querySelector('.cardholder').innerText = "Jane Appleseed";
    document.querySelector('.card-number').innerText = "0000 0000 0000 0000";
    document.querySelector('.displayed-month').innerText = "00";
    document.querySelector('.displayed-year').innerText = "00";
    document.querySelector('.cvc-code').innerText = "000";
    successPage.classList.remove('display');
});

function formSuccess(){
    const inputContainers = document.querySelectorAll('.input-Box');
    let result = true;
    
    //Use a forEach loop to check the 'failed/error' class is active, and then, do something!
    inputContainers.forEach((contanier)=>{
        if(contanier.classList.contains('failed')){
            result = false;
        }
    });

    return result;
}










