const http = require('http');
const querystring = require('querystring');
const responder = require('./responder.js');

const hostname = 'localhost';
const port = 8080;

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    response.setHeader('Access-Control-Allow-Method', 'Post');
    if (request.method == 'POST') {
        response.setHeader('Content-Type', 'application/json');
        let requestJson = '';
        request.on('data', function (data) {
            requestJson += data;

            // Too much POST data, kill the connection!
            if (requestJson.length > 1e6) {
                request.connection.destroy();
            }
        });

        request.on('end', function () {
            const post = querystring.parse(requestJson);
            const postData = JSON.parse(Object.keys(post)[0]);
            console.log(new Date(), request.method, request.url, postData);
            response.write(responder[postData.method](postData));
            response.end();
        });
    } else {
        response.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Aborting...');
    });
});