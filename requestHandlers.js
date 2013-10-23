var fs = require('fs');
var util = require('util');
var url = require('url');

function homepage(response, request) {

	fs.readFile('html/index.html', function(error, file){
	    response.writeHead(200, {"Content-Type": "text/html"});
	    response.write(file);
	    response.end();
		
	});
}

function send404(response) {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
}



function supportFiles(response, request) {

	var filepath = url.parse(request.url).path.replace(/^\//, '');
	var mimeType = filepath.match(/\.(jpg|gif|png|js|css)/i)[0];
	var device = request.headers['user-agent'].toLowerCase().match(/iphone|ipad/i);
	var response = response;	

	function serveSource(source1, source2) {
	
		fs.readFile(source1, function(error, file) {
		
			if (error) {
				source2 ? serveSource(source2) : send404(response);

			} else {
			
				if (mimeType.match(/jpg|png|gif/)) {
					response.writeHead(200, {"Content-Type": "image/" + mimeType.match(/jpg/) ? 'jpeg' : mimeType})
				} else if (mimeType.match(/js/)) {
					response.writeHead(200, {"Content-Type": "application/javascript"});
				} else {
					response.writeHead(200, {"Content-Type": "text/css"});
				}
			
			    response.write(file);
			    response.end();
				
			}
		});
	}
	
	if (mimeType.match(/(jpg|gif|png)/g) && device) {
		var altPath = filepath.replace(/desktop/, device);
		serveSource(altPath, filepath);

	} else {
		serveSource(filepath);

	}
}

exports.homepage = homepage;
exports.supportFiles = supportFiles;
exports.send404 = send404;