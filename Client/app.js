(function($){

    function updateTable(){
        
        $.get('https://localhost:44325/api/movie', function(data){
            $("#MovieList").html(`
            <tr>
                <th style="text-align:center">Movie ID</th>
                <th style="text-align:center">Title</th>
                <th style="text-align:center">Director</th>
                <th style="text-align:center">Genre</th>
            </tr>`)

            for(let i = 0; i < data.length; i++){
                $("#MovieList").append(`
                <tr id="${data[i].movieId}">
                    <td style="text-align:center">${data[i].movieId}</td>
                    <td style="text-align:center">${data[i].title}</td>
                    <td style="text-align:center">${data[i].director}</td>
                    <td style="text-align:center">${data[i].genre}</td>
                </tr>`);
            }
            console.log(data);
        });
    }
    

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
                updateTable();
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    function editForm( e ){
        var dict = {
            MovieId : parseInt(this["movieId"].value),
        	Title : this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
                updateTable();

            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    function deleteForm( e ){
        $.ajax({
            url: 'https://localhost:44325/api/movie/' + parseInt(this["movieId"].value),
            type: 'delete',
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
                updateTable();
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }


    $('#my-form').submit( processForm );
    $('#edit-form').submit( editForm );
    $('#delete-form').submit( deleteForm );
    updateTable();


})(jQuery);