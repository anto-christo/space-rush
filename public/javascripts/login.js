$('#sub-info').click(function (e){
    e.preventDefault();

    var username = $('#username').val();
    var password = $('#password').val();

    $.ajax({
        type: 'POST',
        url: '/login',
        data: { username: username, password: password },
        dataType: 'json',
        success: function(response){
            if(response.msg === "success"){
                window.location.href = "/chatroom";
            }
            else{
                $('#error-msg').html('');
                $('#error-msg').append('<span>Login Failed!</span>');
            }
        }
    });
});