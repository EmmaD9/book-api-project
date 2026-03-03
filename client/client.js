//button definitions
const getBooksBtn = document.getElementById('get-books-button');
const getAuthorsBtn = document.getElementById('get-authors-button');
const getTitlesBtn = document.getElementById('get-titles-button');
const getYearsBtn = document.getElementById('get-years-button');


const headBooksBtn = document.getElementById('head-books-button');
const headAuthorsBtn = document.getElementById('head-authors-button');
const headTitlesBtn = document.getElementById('head-titles-button');
const headYearsBtn = document.getElementById('head-years-button');

async function getBooks() {
    const content = document.querySelector('#books-content');
    content.innerHTML = '';
    const response = await fetch('/getBooks');

    const data = await response.json();
    let jsonString = JSON.stringify(data);
    content.innerHTML += `<p>${jsonString}</p>`;
    //console.log(data);
}

async function headBooks() {
    const content = document.querySelector('#books-content');
    content.innerHTML = '';
    const response = await fetch('/getBooks', {
        method: 'HEAD'
    });

    content.innerHTML += `
        <p>HEAD /getBooks → Status: ${response.status}</p>
    `;
}

async function headNotReal() {
    const response = await fetch('/notReal', { method: 'HEAD' });

    console.log("HEAD /notReal status:", response.status);
}

async function getAuthors() {
    const content = document.querySelector('#authors-content');
    content.innerHTML = '';
    
    const input = document.querySelector('#author-input').value;

    const response = await fetch(`/getBooksByAuthor?author=${encodeURIComponent(input)}`);

    const data = await response.json();
    let jsonString = JSON.stringify(data);
    content.innerHTML += `<p>${jsonString}</p>`;
    console.log(data);
}

async function headAuthors(author) {
    const response = await fetch(`/getBooksByAuthor?title=${encodeURIComponent(author)}`, {
        method: 'HEAD'
    });
    const content = document.querySelector('#authors-content');
    content.innerHTML = '';

    content.innerHTML += `
        <p>HEAD /getBooks → Status: ${response.status}</p>
    `;
}

async function getTitles() {
    const content = document.querySelector('#titles-content');
    content.innerHTML = '';

    const input = document.querySelector('#title-input').value;
    const response = await fetch(`/getBooksByTitle?title=${encodeURIComponent(input)}`);

    const data = await response.json();
    let jsonString = JSON.stringify(data);
    content.innerHTML += `<p>${jsonString}</p>`;
    //console.log(data);
}

async function headTitles(title) {
    const response = await fetch(`/getBooksByTitle?title=${encodeURIComponent(title)}`, {
        method: 'HEAD'
    });
    const content = document.querySelector('#titles-content');
    content.innerHTML = '';

    content.innerHTML += `
        <p>HEAD /getBooks → Status: ${response.status}</p>
    `;
}


async function getYears() {
    const content = document.querySelector('#years-content');
    content.innerHTML = '';
    //TODO: get input here
    const response = await fetch('/getBooksByYear');

    const data = await response.json();
    let jsonString = JSON.stringify(data);
    content.innerHTML += `<p>${jsonString}</p>`;
    //console.log(data);
}

async function headYears(title) {
    const response = await fetch(`/getBooksByYear?year=${encodeURIComponent(year)}`, {
        method: 'HEAD'
    });

    //console.log("HEAD /getBooksByTitle status:", response.status);
}



async function getBooks() {
    const content = document.querySelector('#books-content');
    content.innerHTML = '';

    const response = await fetch('/getBooks');

    const data = await response.json();
    let jsonString = JSON.stringify(data);
    content.innerHTML += `<p>${jsonString}</p>`;
    //console.log(data);
}


getBooksBtn.addEventListener('click', () => {
    getBooks();
});
getAuthorsBtn.addEventListener('click', () => {
    getAuthors();
});
getTitlesBtn.addEventListener('click', () => {
    getTitles();
});
getYearsBtn.addEventListener('click', () => {
    getYears();
});


headBooksBtn.addEventListener('click', () => {
    headBooks();
});
headAuthorsBtn.addEventListener('click', () => {
    headAuthors();
});
headTitlesBtn.addEventListener('click', () => {
    headTitles();
});
headYearsBtn.addEventListener('click', () => {
    headYears();
});
/*
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
*/