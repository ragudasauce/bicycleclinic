var http = require("http");
var url = require("url");

function start(route, handle) {
  
  function onRequest(request, response) {
          
    var pathname = url.parse(request.url).pathname;
    
	if (request.method.match(/get/i)) {
	    
	    //console.log("Request for " + pathname + " received.");
	    
	    if (pathname.match(/\.(png|jpg|gif|css|js)/)) {
		    pathname = '/support';
	    }
	
	    route(handle, pathname, response, request);
	
	} else if (request.method.match(/post/i)) {
		
		
	} 
    
  }

  http.createServer(onRequest).listen(process.env.PORT || 8888);
  console.log("Server has started.");
}

exports.start = start;
