var socket=io();

var sessionId='';

$('#send-msg').click(function(e){
	e.preventDefault();

	var msg =$('#msg').val();
	socket.emit('newMsg',{msg:msg});
	//emit function on client side sends data only to the server.
	//on server side emit function sends data to all the clients.


});

socket.on('newMessage',function(data){
	console.log(data);
});
