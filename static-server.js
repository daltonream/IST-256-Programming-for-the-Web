//Create a server that can send back static files
//You might need to insure YOU have the correct npm modules downloaded to the npm-modules folder
const http = require("http");
const url = require("url");
const fs = require("fs");

//npm i mime-types
const lookup = require("mime-types").lookup;

const server = http.createServer((req, res) => {
    //handle the request and send back a static file
    //from a folder called `shopper_management`
    let parsedURL = url.parse(req.url, true);
    //remove the leading and trailing slashes
    let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
 
    if (path == "") {
        path = "index.html";
    }
    console.log(`Requested path ${path} `);

    let file = __dirname + "/shopper_management/" + path;
    //async read file function uses callback
    fs.readFile(file, function(err, content) {
        if (err) {
            console.log(`File Not Found ${file}`);
            res.writeHead(404);
            res.end();
        } else {
            //specify the content type in the response
            console.log(`Returning ${path}`);
            res.setHeader("X-Content-Type-Options", "nosniff");
            let mime = lookup(path);
            res.writeHead(200, { "Content-type": mime });
            // The above statement replaces the below switch statement and loads all our files properly on to localhost:1234/
            // switch (path) {
            //   case "main.css":
            //     res.writeHead(200, { "Content-type": "text/css" });
            //     break;
            //   case "main.js":
            //     res.writeHead(200, { "Content-type": "application/javascript" });
            //     break;
            //   case "index.html":
            //     res.writeHead(200, { "Content-type": "text/html" });
            // }
            res.end(content);
        }
    });
});

server.listen(1234, "localhost", () => {
    console.log("Listening on port 1234");
});
