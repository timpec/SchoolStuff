'use strict';

// HTML contains element 'message'. This is used to show the server's response
// Select it and save it as a variable/object

// make function 'upload' which
// - prevents the form from sending
// - writes 'Upload in progress...' into 'message' element
// - selects the file input field
// - makes FormData -object and adds the file selected byt the user into the object
// - send the file to the same url as in task a by using fetch -method
// - when file upload is complete, writes server response to 'message' element
// function ends

// make an event listener which calls upload function when the form is submitted
const message = document.querySelector('#message');

const sendData = (event) =>{
    
    message.innerHTML = 'Upload in progress...';

    const form = document.querySelector('form');
    const data = new FormData(form);
    const settings = {
    method: 'post',
    body: data
    };

    fetch('http://10.114.32.135:8080/task4', settings)
        .then( (response) => {
        return response.json();
    })
        .then( (result) => {
        console.log(result);
        message.innerHTML = 'Upload cempleted.';
        document.querySelector('img').src = json.src;
    });
};

document.querySelector('form').addEventListener('submit', sendData);

