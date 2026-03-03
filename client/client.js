//GET

//button definitions
const getBooksBtn = document.getElementById('get-books-button');
const getAuthorsBtn = document.getElementById('get-authors-button');
const getTitlesBtn = document.getElementById('get-titles-button');
const getYearsBtn = document.getElementById('get-years-button');

//methods
async function getBooks() {
    const content = document.querySelector('#books-content');
    content.innerHTML = '';
    const response = await fetch('/getBooks');

    const data = await response.json();
    let jsonString = JSON.stringify(data);
    content.innerHTML += `<p>${jsonString}</p>`;
    //console.log(data);
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

async function getYears() {
    const content = document.querySelector('#years-content');
    content.innerHTML = '';

    const input = document.querySelector('#year-input').value;
    const response = await fetch(`/getBooksByYear?year=${encodeURIComponent(input)}`);

    const data = await response.json();
    let jsonString = JSON.stringify(data);
    content.innerHTML += `<p>${jsonString}</p>`;
    //console.log(data);
}

//button linking
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


//HEAD

//button definitions
const headBooksBtn = document.getElementById('head-books-button');
const headAuthorsBtn = document.getElementById('head-authors-button');
const headTitlesBtn = document.getElementById('head-titles-button');
const headYearsBtn = document.getElementById('head-years-button');

//methods
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

async function headAuthors() {
    const author = document.querySelector('#author-input').value;

    const response = await fetch(`/getBooksByAuthor?author=${encodeURIComponent(author)}`, {
        method: 'HEAD'
    });
    const content = document.querySelector('#authors-content');
    content.innerHTML = '';

    content.innerHTML += `
        <p>HEAD /getBooksByAuthor → Status: ${response.status}</p>
    `;
}

async function headTitles() {
    const content = document.querySelector('#titles-content');
    content.innerHTML = '';

    const title = document.querySelector('#title-input').value;

    const response = await fetch(`/getBooksByTitle?title=${encodeURIComponent(title)}`, {
        method: 'HEAD'
    });
    content.innerHTML += `
        <p>HEAD /getBooksByTitle → Status: ${response.status}</p>
    `;
}

async function headYears() {
    const content = document.querySelector('#years-content');
    content.innerHTML = '';

    const year = document.querySelector('#year-input').value;

    const response = await fetch(`/getBooksByYear?year=${encodeURIComponent(year)}`, {
        method: 'HEAD'
    });
    content.innerHTML += `
        <p>HEAD /getBooksByYear → Status: ${response.status}</p>
    `;
}

//button linking
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

//POST

//button definitions
const addBooksBtn = document.getElementById('add-book-btn');
const editBooksBtn = document.getElementById('edit-book-btn');

//methods
async function addBook() {
    const content = document.querySelector('#add-book-content');
    content.innerHTML = '';

    const book = {
        title: document.querySelector('#add-title').value,
        author: document.querySelector('#add-author').value,
        country: document.querySelector('#add-country').value,
        language: document.querySelector('#add-language').value,
        link: document.querySelector('#add-link').value,
        pages: document.querySelector('#add-pages').value,
        year: document.querySelector('#add-year').value,
        genres: document.querySelector('#add-genres').value,
    };

    const response = await fetch('/addBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(book),
    });

    const data = await response.json();

    content.innerHTML = `<p>Status: ${response.status}</p><p>${JSON.stringify(data)}</p>`;
}


//button linking
addBooksBtn.addEventListener('click', () => {
    console.log('a book should add');
    addBook();
});