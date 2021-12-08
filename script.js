
// an array of 51 objects
// console.log(usaStates);     // debug: checking if list of US states is available or not

// find all input & button elements from the form
let addressInputEl = document.querySelector('#inputAddress');
let cityInputEl = document.querySelector('#inputCity');
let stateSelectEl = document.querySelector('#inputState');
let zipcodeInputEl = document.querySelector('#inputZip');
let submitButtonEl = document.querySelector('#submitButton');
let clearButtonEl = document.querySelector('#clearButton');

// find all the elements for the display address div
let displayDivEl = document.querySelector('#displayAddressDiv');
displayDivEl.style.visibility = "hidden";   // hide the displayDivEl on first page load
let displayParaEl = document.querySelector('#displayDetails');  


makeUSStatesOptions();      // create the US states dropdown list


// add an event listener to the clear button to clear the form
clearButtonEl.addEventListener('click', function() {
    clearForm();
})


// add an event listener to the submit button & collect user input information
submitButtonEl.addEventListener("click", function () {
    // get all the user entered input values
    let address = addressInputEl.value.trim().toLowerCase();
    let city = cityInputEl.value.trim().toLowerCase();
    let state = stateSelectEl.value.trim().toLowerCase();
    let zipcode = zipcodeInputEl.value.trim().toLowerCase();

    // Form validation: check if valid values are entered & selected
    // if there are errors processing will stop, else it will continue
    if (!validateForm(address, city, state, zipcode)) {
        displayDivEl.style.visibility = 'hidden';       // hide the displayDivEl if errors exist
        return;     // stop processing
    }
    else {
        console.log(address, city, state, zipcode);     // debug
        console.log('successful! hooray!');             // debug

        displayDivEl.style.visibility = "visible";      // make the displayDivEl visible
        
        // display the entered address in the para div element
        let addressString = `${address}<br>${city}, ${state} ${zipcode}`;
        displayParaEl.innerHTML = addressString.toUpperCase();

        disableForm();      // disable the form
    }
});



// All Functions here
/**
 * Displays a list of states in the select-option dropdown list in the HTML form.
 */
function makeUSStatesOptions() {
    usaStates.forEach(state => {
        option = document.createElement('option');  // create a new option element
        option.value = state.name.toLowerCase();    // set the option value attribute
        option.innerHTML = state.name;              // display the option in the HTML dropdown list
        stateSelectEl.appendChild(option);          // add the option element to the select DOM
    })
}



/**
 * This function disables all the inputs, select & submit buttons.
 */
function disableForm() {
    addressInputEl.disabled = 'true';
    cityInputEl.disabled = 'true';
    stateSelectEl.disabled = 'true';
    zipcodeInputEl.disabled = 'true';
    submitButtonEl.disabled = 'true';
    clearButtonEl.disabled = 'true';
}



/**
 * This function clears all form fields.
 */
function clearForm() {
    addressInputEl.value = '';
    cityInputEl.value = '';
    stateSelectEl.value = 'none';
    zipcodeInputEl.value = '';
}



/**
 * Validates the form input elements. If there are errors in the form, then 
 * processing is stopped.
 * @param {String} address
 * @param {String} city 
 * @param {String} state 
 * @param {String} zipcode 
 * @returns True if there are no errors, false otherwise
 */
function validateForm(address, city, state, zipcode) {
    let errors = [];    // an empty array for errors

    // 1. Form validation for address: if an address is not entered
    if (address == '') {
        errors.push('Please enter a house number & street address.');
        console.log('Please enter a house number & street address.');   // debug
    }
    else if (address.length < 2) {
        addressInputEl.value = '';      // clear the innerHTML for user to reenter
        console.log(addressInputEl.innerHTML);
        errors.push('Address field must have at least 2 characters.');
        console.log('Address field must have at least 2 characters.')   // debug
    }
    else {
        addressInputEl.value = address; // if valid value entered, keep it
    }


    // 2. Form validation for city: if city is not entered
    if (city == '') {
        errors.push('Please enter a city.');
        console.log('Please enter a city.');
    }
    else {
        cityInputEl.value = city;        // if valid value entered, keep it
    }


    // 3. Form validation for US state: if state is not selected
    if (state == '' || state == 'none') {
        errors.push('Please select a state.');
        console.log('Please select a state.');
    }
    else {
        stateSelectEl.value = state;    // if valid value entered, keep it
    }


    // 4. Form validation for US zipcode: if zipcode is not entered
    if (zipcode == '') {
        errors.push('Please enter a zipcode.');
        console.log('Please enter a zipcode.');     // debug
    }
    // if zipcode is not a number
    else if (isNaN(zipcode)) {
        zipcodeInputEl.value = '';           // clear the innerHTML for user to reenter
        errors.push('Zipcode must be a number.');
        console.log('Zipcode must be a number.');   // debug
    }
    // if zipcode is a negative number
    else if (parseInt(zipcode) < 0) {
        zipcodeInputEl.value = '';           // clear the innerHTML for user to reenter
        errors.push('Zipcode cannot be a negative number.');
        console.log('Zipcode cannot be a negative number.');    // debug
    }
    // if 5 digits are not entered in the zipcode field
    else if (zipcode.length != 5) {
        zipcodeInputEl.value = '';           // clear the innerHTML for user to reenter
        errors.push('Zipcode must have 5 digits.');
        console.log('Zipcode must have 5 digits.');     // debug
    }
    // if zipcode is not a valid 5-digit valid number
    // Valid US zipcode ranges from 00501 to 99950
    else if (zipcode < '00501' || parseInt(zipcode) > 99950) {
        zipcodeInputEl.value = '';           // clear the innerHTML for user to reenter
        errors.push('Not a US zipcode.');
        console.log('Not a US zipcode.');   // debug
    }
    else {
        zipcodeInputEl.value = zipcode;      // if valid value entered, keep it
    }


    // if there are errors then: then alert the user with all error messages (use join)
    if (errors.length > 0) {
        console.log('Errors! Please check your form!');
        alert(errors.join('\n'));       // display each error in a new line
        return false;                   // and return false           
    }
    else {
        return true;                    // return true if there are no errors
    }
}
