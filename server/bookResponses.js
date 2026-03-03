//referenced ./responses from the http api 2 homework

const htmlResponses = require('./loadFiles.js');

//book storage:
const { books } = require('./loadFiles.js');

const handleGET = (pathname, request, response) => {

    //GET endpoints:
    if (pathname === '/getBooks') return getBooksGET(request, response);
    //these take queries
    if (pathname === '/getBooksByTitle') return getTitleGET(request, response);
    if (pathname === '/getBooksByAuthor') return getAuthorGET(request, response);
    if (pathname === '/getBooksByYear') return getYearGET(request, response);

    //My static files:
    if (pathname === '/notReal') return notRealGET(request, response);
    if (pathname === '/') return htmlResponses.getIndex(request, response);
    if (pathname === '/style.css') return htmlResponses.getCss(request, response);
    if (pathname === '/client.js') return htmlResponses.getClientJS(request, response);

    return notFoundGET(request, response);
};

const handleHEAD = (pathname, request, response) => {
    if (pathname === '/getBooks') return getBooksHEAD(request, response);
    if (pathname === '/getBooksByTitle') return getTitleHEAD(request, response);
    if (pathname === '/getBooksByAuthor') return getAuthorHEAD(request, response);
    if (pathname === '/getBooksByYear') return getYearHEAD(request, response);
    if (pathname === '/notReal') return notRealHEAD(request, response);

    return notFoundHEAD(request, response);
};

const handlePOST = (pathname, request, response) => {
    if (pathname === '/addBook') return addBookPOST(request, response);
    if (pathname === '/editBook') return editBookPOST(request, response);

    return notFoundPOST(request, response);
};

//GET books JSON
const getBooksGET = (request, response) => {
    const responseJSON = { books };

    console.log("getBooksGET called");
    console.log(JSON.stringify(responseJSON));

    response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(JSON.stringify(responseJSON)) });
    response.write(JSON.stringify(responseJSON));
    response.end();
};

const getTitleGET = (request, response) => {
    const { title } = request.query;

    //check if param is missing
    if (!title) {
        const responseJSON = {
            message: 'Title is required for search',
            id: 'missingParams',
        };

        const data = JSON.stringify(responseJSON);

        response.writeHead(400, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
        });
        response.write(data);
        return response.end();
    }

    //find book via title
    const book = books.find(
        (b) => b.title.toLowerCase() === title.toLowerCase()
    );

    if (!book) {
        const responseJSON = {
            message: `No book found with title: '${title}'.`,
            id: 'notFound',
        };
        const data = JSON.stringify(responseJSON);

        response.writeHead(404, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
        });
        response.write(data);
        return response.end();
    }

    const data = JSON.stringify({ book });

    response.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
    });
    response.write(data);
    response.end();

}

const getAuthorGET = (request, response) => {
    const { author } = request.query;

    //check if param is missing
    if (!author) {
        const responseJSON = {
            message: 'An author is required for search',
            id: 'missingParams',
        };

        const data = JSON.stringify(responseJSON);

        response.writeHead(400, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
        });
        response.write(data);
        return response.end();
    }

    //find book via title
    const book = books.find(
        (b) => b.author.toLowerCase() === author.toLowerCase()
    );


    if (!book) {
        const responseJSON = {
            message: `No book found with author: '${author}'.`,
            id: 'notFound',
        };
        const data = JSON.stringify(responseJSON);

        response.writeHead(404, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
        });
        response.write(data);
        return response.end();
    }

    const data = JSON.stringify({ book });

    response.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
    });
    response.write(data);
    response.end();
}

const getYearGET = (request, response) => {
    const { year } = request.query;

    //check if param is missing
    if (!year) {
        const responseJSON = {
            message: 'A year is required for search',
            id: 'missingParams',
        };

        const data = JSON.stringify(responseJSON);

        response.writeHead(400, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
        });
        response.write(data);
        return response.end();
    }

    //find book via year
    const yearNum = parseInt(year, 10);

    const book = books.find(
        (b) => b.year === yearNum
    );

    if (!book) {
        const responseJSON = {
            message: `No book found with the year: '${year}'.`,
            id: 'notFound',
        };
        const data = JSON.stringify(responseJSON);

        response.writeHead(404, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
        });
        response.write(data);
        return response.end();
    }

    const data = JSON.stringify({ book });

    response.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
    });
    response.write(data);
    response.end();
}

//GET books JSON but with no body
const getBooksHEAD = (request, response) => {
    const data = JSON.stringify({ books });
    response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) });
    response.end();
};

const getTitleHEAD = (request, response) => {
    const { title } = request.query;

    if (!title) {
        const data = JSON.stringify({
            message: 'Title is required for search',
            id: 'missingParams',
        });

        response.writeHead(400, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
        });
        return response.end();
    }

    const book = books.find(
        (b) => b.title.toLowerCase() === title.toLowerCase()
    );

    const data = JSON.stringify(
        book
            ? { book }
            : { message: `No book found with title: '${title}'.`, id: 'notFound' }
    );

    response.writeHead(book ? 200 : 404, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
    });

    response.end();

};

const getAuthorHEAD = (request, response) => {
    const { author } = request.query;

    if (!author) {
        const data = JSON.stringify({
            message: 'Author is required for search',
            id: 'missingParams',
        });

        response.writeHead(400, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
        });
        return response.end();
    }

    const book = books.find(
        (b) => b.author.toLowerCase() === author.toLowerCase()
    );

    const data = JSON.stringify(
        book
            ? { book }
            : { message: `No book found with author: '${author}'.`, id: 'notFound' }
    );

    response.writeHead(book ? 200 : 404, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
    });

    response.end();
};

const getYearHEAD = (request, response) => {
    const { year } = request.query;

    if (!year) {
        const data = JSON.stringify({
            message: 'Year is required for search',
            id: 'missingParams',
        });

        response.writeHead(400, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
        });
        return response.end();
    }

    const yearNum = parseInt(year, 10);

    const book = books.find(
        (b) => b.year === yearNum
    );

    const data = JSON.stringify(
        book
            ? { book }
            : { message: `No book found with year: '${year}'.`, id: 'notFound' }
    );

    response.writeHead(book ? 200 : 404, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
    });

    response.end();
};

//get not real for JSON error
const notRealGET = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found',
        id: 'notFound',
    };

    response.writeHead(404, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(JSON.stringify(responseJSON)) });
    response.write(JSON.stringify(responseJSON));
    response.end();
};

//head not real
const notRealHEAD = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found',
        id: 'notFound',
    };

    response.writeHead(404, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(JSON.stringify(responseJSON)) });
    response.end();
}

const addBookPOST = (request, response) => {
    let body = '';

    request.on('data', (chunk) => {
        body += chunk;
    });

    request.on('end', () => {
        let parsed;
        //supports either content type
        if (request.headers['content-type'] === 'application/json') {
            try {
                parsed = JSON.parse(body);
            } catch (err) {
                const responseJSON = {
                    message: 'Request body contains invalid JSON.',
                    id: 'badJSON',
                };
                const data = JSON.stringify(responseJSON);

                response.writeHead(400, {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(data),
                });
                response.write(data);
                return response.end();
            }

        } else if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
            parsed = Object.fromEntries(new URLSearchParams(body));
        }

        const { author, country, language, link, pages, title, year, genres } = parsed;

        if (!author || !country || !language || !link || !pages || !title || !year || !genres) {
            const responseJSON = {
                message: 'Author, country, language, link, pages, title, year, genres are all required.',
                id: 'missingParams',
            };

            response.writeHead(400, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(JSON.stringify(responseJSON)) });
            response.write(JSON.stringify(responseJSON));
            return response.end();
        }


        //check if the book exists
        const existing = books.find(
            (b) => b.title.toLowerCase() === title.toLowerCase()
        );

        if (existing) {
            const responseJSON = {
                message: `A book with title '${title}' already exists.`,
                id: 'alreadyExists',
            };
            const data = JSON.stringify(responseJSON);

            //i think this is the right error code?
            response.writeHead(400, {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data),
            });
            response.write(data);
            return response.end();
        }

        // add new book to array
        books.push({
            author,
            country,
            language,
            link,
            pages: Number(pages),
            title,
            year: Number(year),
            genres,
        });


        const responseJSON = { message: 'Created Successfully' };

        response.writeHead(201, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(JSON.stringify(responseJSON)) });
        response.write(JSON.stringify(responseJSON));
        return response.end();
    });
};


//edit books based on the title
const editBookPOST = (request, response) => {
    let body = '';

    request.on('data', (chunk) => {
        body += chunk;
    });

    request.on('end', () => {
        let parsed;
        //supports either content type
        if (request.headers['content-type'] === 'application/json') {

            try {
                parsed = JSON.parse(body);
            } catch (err) {
                const responseJSON = {
                    message: 'Request body contains invalid JSON.',
                    id: 'badJSON',
                };
                const data = JSON.stringify(responseJSON);

                response.writeHead(400, {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(data),
                });
                response.write(data);
                return response.end();
            }

        } else if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
            parsed = Object.fromEntries(new URLSearchParams(body));
        }

        const { author, country, language, link, pages, title, year, genres } = parsed;

        if (!author || !country || !language || !link || !pages || !title || !year || !genres) {
            const responseJSON = {
                message: 'Author, country, language, link, pages, title, year, genres are all required.',
                id: 'missingParams',
            };

            response.writeHead(400, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(JSON.stringify(responseJSON)) });
            response.write(JSON.stringify(responseJSON));
            return response.end();
        }

        //updates the book if it can find the title!
        const book = books.find(
            (b) => b.title.toLowerCase() === title.toLowerCase()
        );


        if (book) {
            book.author = author;
            book.country = country;
            book.language = language;
            book.link = link;
            book.pages = pages;
            book.title = title;
            book.year = year;
            book.genres = genres;

            //i think this is the right response code?
            response.writeHead(204);

            return response.end();
        } else {
            const responseJSON = {
                message: `A book of title '${title}' does not exist`,
                id: 'doesNotExist',
            };

            response.writeHead(400, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(JSON.stringify(responseJSON)) });
            response.write(JSON.stringify(responseJSON));
            return response.end();
        }

    });
};

//GET 404 error page with JSON
const notFoundGET = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found',
        id: 'notFound',
    }

    response.writeHead(404, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(JSON.stringify(responseJSON)) });
    response.write(JSON.stringify(responseJSON));
    response.end();
}

//HEAD 404 version with no body
const notFoundHEAD = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found',
        id: 'notFound',
    }

    response.writeHead(404, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(JSON.stringify(responseJSON)) });
    response.end();
};

const notFoundPOST = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found',
        id: 'notFound',
    };

    const data = JSON.stringify(responseJSON);

    response.writeHead(404, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
    });

    response.write(data);
    response.end();
};

module.exports = {
    handleGET,
    handleHEAD,
    handlePOST,
    getBooksGET,
    getBooksHEAD,
    notRealGET,
    notRealHEAD,
    addBookPOST,
    notFoundGET,
    notFoundHEAD,
    notFoundPOST
}