// Generate buttons
let officeCast = ["Dwight Schrute", "Jim Halpert", "Pam Beesly", "Kelly Kapoor", "Michael Scott"];

// let $createBtn = $('<button class="btn castbtn"/>').appendTo('#buttonbox');

let createBtn = function() {
    let btn = $('<button class="btn castbtn"/>').appendTo('#btnbox');
    return btn;
};

function createBtns() {

    for (let i = 0; i < officeCast.length; i++) {
        createBtn().text(officeCast[i]);
    }


    $(".castbtn").on("click", function() {
        var cast = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cast + "&api_key=PFnZ8BpKMtDwfFAok7htvGM3Engjb9HB&limit=10";
        console.log(cast);
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var castImage = $("<img>");
                    castImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(castImage);

                    $("#results").prepend(gifDiv);
                }
            });
    });

}
createBtns();


console.log($(".castbtn"));





$(".navbar-form").submit(function(e) {
    e.preventDefault(); //stop form from submitting
    console.log($("#usersearch").val());
    let userKeyword = $("#usersearch").val();
    officeCast.push(userKeyword);
    $('#btnbox').empty();
    createBtns();
});