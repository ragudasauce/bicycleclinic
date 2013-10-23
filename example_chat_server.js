var net = require('net');

var chatServer = net.createServer(), clientList = new Array();


function broadCast(message, client) {

	clientList.forEach(function(localClient){
		
		if (client != localClient) {
			
			if (localClient.writable) {
				localClient.write(client.name + ' says ' + message);
			} else {
				
				localClient.destroy();
				clientList.splice(clienList.indexOf(localClient), 1);
			}
		}
	});
}



chatServer.on('connection', function(client) {
	
	client.name = client.remoteAddress + ':' + client.remotePort;
	client.write('Hi ' + client.name + '!\n');
	
	clientList.push(client);

	client.on('data', function(data) {
		broadCast(data, client);
	});
	
	client.on('end', function() {
		console.log(client.name + ' quit');
		clientList.splice(clientList.indexOf(client), 1);
	});
	
	client.on('error', function(e) {
		console.log(e);
	});

});


chatServer.listen(9000);