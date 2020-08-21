const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 8080;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  response.setHeader('Access-Control-Allow-Method', 'Post');
  user = JSON.parse(fs.readFileSync("database.json", "utf8")).users[0];
  response.write(JSON.stringify({token: user.token}));
  response.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Aborting...');
    });
});