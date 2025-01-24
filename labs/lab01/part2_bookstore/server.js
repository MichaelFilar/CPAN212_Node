// Import the built in module: http
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.url === "/home") {
        fs.readFile("./pages/home.html", (err,data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.write("File not found");
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
            }
            res.end();
        });

    } else if (req.url === "/about") {
        fs.readFile("./pages/about.html", (err,data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.write("File not found");
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
            }
            res.end();
        });

    } else if (req.url === "/login") {
        fs.readFile("./pages/login.html", (err,data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.write("File not found");
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
            }
            res.end();
        });

    } else if (req.url === "/register") {
        fs.readFile("./pages/register.html", (err,data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.write("File not found");
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
            }
            res.end();
        });

    } else if (req.url === "/logout") {
        fs.readFile("./pages/logout.html", (err,data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.write("File not found");
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
            }
            res.end();
        });

    } else if (req.url === "/contactus") {
        fs.readFile("./pages/contact.html", (err,data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.write("File not found");
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
            }
            res.end();
        });

    } else if (req.url === "/user") {
        fs.readFile("./pages/user.html", (err,data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.write("File not found");
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
            }
            res.end();
        });

    } else if (req.url === "/about") {
        fs.readFile("./pages/about.html", (err,data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.write("File not found");
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
            }
            res.end();
        });

    } else {
        fs.readFile("./pages/error.html", (err,data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.write("File not found");
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
            }
            res.end();
        });
    }
});

server.listen(3000);

console.log("Listening to on port 3000");
