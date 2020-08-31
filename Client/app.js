(function($){

    $.get('https://localhost:44325/api/movie', function(data){
        
        for(let i = 0; i < data.length; i++){

            $("#MovieList").append(`<div>Director is:
            ${JSON.stringify(data[i].director).substring(1, data[i].director.length+1)}
            </div>`);

        }

        console.log(data);
    })


    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }


    $('#my-form').submit( processForm );

})(jQuery);