const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const clientJS = fs.readFileSync(`${__dirname}/../client/client.js`);

//load in the JSON data:
const rawBooks = fs.readFileSync(`${__dirname}/../src/books.json`);
const books = JSON.parse(rawBooks);

const getIndex = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': index.length,
    });
    response.write(index);
    response.end();
}

const getCss = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/css',
        'Content-Length': css.length,
    });
    response.write(css);
    response.end();
}

const getClientJS = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/javascript',
        'Content-Length': clientJS.length,
    });
    res.write(clientJS);
    res.end();
};


module.exports = {
    getIndex,
    getCss,
    books
}