$('#send').click(function (e){
    e.preventDefault();

    var score = $('#score').val();

    $.ajax({
        type: 'POST',
        url: '/input_score',
        data: { score:score },
        dataType: 'json',
        success: function(response){
            if(response.msg === "success"){
                console.log('score sent');
            }
            else{
                $('#error-msg').html('');
                $('#error-msg').append('<span>Server error!</span>');
            }
        }
    });
});