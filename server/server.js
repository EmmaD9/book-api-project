//used base from office hours convo and http api assignment 2

const http = require('http');
//const htmlResponses = require('./htmlResponses.js');
//const dataResponses = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;


const onRequest = (request, response) => {
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

    request.query = Object.fromEntries(parsedUrl.searchParams);

    if (request.headers.accept) {
        request.acceptedTypes = request.headers.accept.split(',');
    }

    const { pathname } = parsedUrl;

    //method and path routes
    if (request.method === 'GET') {
        dataResponses.handleGET(pathname, request, response);
    } else if (request.method === 'HEAD') {
        dataResponses.handleHEAD(pathname, request, response);
    } else if (request.method === 'POST') {
        dataResponses.handlePOST(pathname, request, response);
    } else {
        dataResponses.notFoundGET(request, response);
    }

};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
});