//Referencing the script element in the client.html of hw 2

const handleResponse = async (response, shouldParse) => {
    //const content = document.querySelector('#content');

    //Set the status message
    // switch (response.status) {
    //     case 200: content.innerHTML = `<b>Success</b>`; break;
    //     case 201: content.innerHTML = `<b>Created</b>`; break;
    //     case 400: content.innerHTML = `<b>Bad Request</b>`; break;
    //     case 404: content.innerHTML = `<b>Not Found</b>`; break;
    //     default: content.innerHTML = `Updated (No Content).`; break;
    // }

    if(!shouldParse){
        return;
    }

    //parse the JSON body
    const obj = await response.json();
    let jsonString = JSON.stringify(obj);
    //content.innerHTML += `<p>${jsonString}</p>`;
};

//POST for adding a user
const sendPost = async (form) => {
    //"/addUser"
    const url = form.getAttribute('action');
    //"post"
    const method = form.getAttribute('method');

    const name = form.querySelector('#nameField').value;
    const age = form.querySelector('#ageField').value;

    const body = JSON.stringify({ name, age });

    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body
    });

    handleResponse(response, true);
};

//GET or HEAD
const sendGetOrHead = async (form) => {
    //"/getUsers" or "/notReal"
    const url = form.getAttribute('action');

    //GET or HEAD
    const method = form.getAttribute('method').toUpperCase();

    const response = await fetch(url, {
        method,
        headers: { 'Accept': 'application/json' }
    });

    // if (method === 'HEAD') {
    //     const content = document.querySelector('#content');
    //     switch (response.status) {
    //         case 200: content.innerHTML = `<b>Success</b>`; break;
    //         case 201: content.innerHTML = `<b>Created</b>`; break;
    //         case 400: content.innerHTML = `<b>Bad Request</b>`; break;
    //         case 404: content.innerHTML = `<b>Not Found</b>`; break;
    //         default: content.innerHTML = `Updated (No Content).`; break;
    //     }
    //     return;
    // }

    handleResponse(response, true);
};


//Initialize forms
const init = () => {
    // const nameForm = document.querySelector('#nameForm');
    // nameForm.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     sendPost(nameForm);
    // });

    // const userForm = document.querySelector('#userForm');
    // userForm.addEventListener('submit', (e) => {
    //     e.preventDefault();

    //     //Override method based on dropdown
    //     const method = document.querySelector('#methodSelect').value.toUpperCase();
    //     userForm.setAttribute('method', method);

    //     //Override action based on dropdown
    //     const url = document.querySelector('#urlField').value;
    //     userForm.setAttribute('action', url);

    //     sendGetOrHead(userForm);
    // });

    console.log("client.js init called");
};

window.onload = init;
