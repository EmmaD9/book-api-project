//referenced ./responses from the http api 2 homework

const htmlResponses = require('./loadFiles.js');

const handleGET = (pathname, request, response) => {
    if (pathname === '/getBooks') return getBooksGET(request, response);
    if (pathname === '/notReal') return notRealGET(request, response);
    if (pathname === '/') return htmlResponses.getIndex(request, response);
    if (pathname === '/style.css') return htmlResponses.getCss(request, response);

    return notFoundGET(request, response);
};

const handleHEAD = (pathname, request, response) => {
    if (pathname === '/getBooks') return getBooksHEAD(request, response);
    if (pathname === '/notReal') return notRealHEAD(request, response);

    return notFoundHEAD(request, response);
};

const handlePOST = (pathname, request, response) => {
    if (pathname === '/addUser') return addUserPOST(request, response);

    return notFoundGET(request, response);
};

//user storage:
const users = {};

//GET users JSON
const getBooksGET = (request, response) => {
    const responseJSON = { users };

    console.log("getBooksGET called");
    console.log(JSON.stringify(responseJSON));

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(responseJSON));
    response.end();
};

//GET users JSON but with no body
const getBooksHEAD = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end();
};

//get not real for JSON error
const notRealGET = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found',
        id: 'notFound',
    };

    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(responseJSON));
    response.end();
};

//head not real
const notRealHEAD = (request, response) => {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end();
}

//TODO:
const addUserPOST = (request, response) => {
    let body = '';

    request.on('data', (chunk) => {
        body += chunk;
    });

    request.on('end', () => {
        const parsed = JSON.parse(body);
        const { name, age } = parsed;

        if (!name || !age) {
            const responseJSON = {
                message: 'Name and age are both required.',
                id: 'missingParams',
            };

            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify(responseJSON));
            return response.end();
        }

        const userExists = users[name];

        if (userExists) {
            users[name].age = age;

            response.writeHead(204, { 'Content-Type': 'application/json' });
            return response.end();
        }

        users[name] = { age };

        const responseJSON = { message: 'Created Successfully' };

        response.writeHead(201, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(responseJSON));
        return response.end();
    });
};

//GET 404 error page with JSON
const notFoundGET = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found',
        id: 'notFound',
    }

    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(responseJSON));
    response.end();
}

//HEAD 404 version with no body
const notFoundHEAD = (request, response) => {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end();
};

module.exports = {
    handleGET,
    handleHEAD,
    handlePOST,
    getUsersGET,
    getUsersHEAD,
    notRealGET,
    notRealHEAD,
    addUserPOST,
    notFoundGET,
    notFoundHEAD
}