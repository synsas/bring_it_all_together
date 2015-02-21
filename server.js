var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
var qs = require('querystring');
var root = __dirname;
var items = [];

var server = http.createServer(function (req, res) {

    if(req.url == '/') {
        switch(req.method) {
            case 'GET':
                //req.url = '/index.html';
var body = '<!DOCTYPE html><html lang="en">'+
'<head>'+
'<meta charset="UTF-8">'+
'<title>Shopping List</title>'+
'</head>'+
'<body>'+
'<form action="/" method="post">'+
'<input type="text" name="item" placeholder="Enter an item">'+
'<button>Add Item</button>'+
'</form>'+
'</body>'+
'</html>';

res.writeHead(200,{"Content-Type" : "text/html"});
res.write(body);


            break;
            case 'POST':
            console.log(items)
            //res.writeHead(200,{"Content-Type" : "text/plain"});

            res.write('In POST');
            res.end();
               /* var item = '';
                req.setEncoding('utf8');
                req.on('data', function(chunk){
                    item += chunk;
                });
                req.on('end', function(){
                    var obj = qs.parse(item);
                    res.end('The item: "' + obj.item + '" was added successfully');
                });*/
            break;
        }
    }

    var url = parse(req.url);
    var path = join(root, url.pathname);

    fs.stat(path, function (err, stat) {
        if (err) {
            if (err.code == 'ENOENT') {
                res.statusCode = 404;
                res.end('File Not Found');
            }
            else {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        }
        else {
            var stream = fs.createReadStream(path);
            res.setHeader('Content-Length', stat.size);
            stream.pipe(res);
            stream.on('error', function (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            });
        }
    });
});

// The stream didn't work until I added this function
server.listen(9000, function(){
   console.log('listening on 9000');
});