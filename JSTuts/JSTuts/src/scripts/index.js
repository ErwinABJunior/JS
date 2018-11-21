



"use strict";



console.log(msg);

//var resultsDiv = document.getElementById("results");
//resultsDiv.innerHTML = " <p>H4ck33dJS   kickit master-</p>";

//Variables  and types
var msg = 'testing purpose';
var none;
var aNumber = 10;
var trueFasle = true;
console.log("msg is " + typeof (msg));
console.log("resultsDiv is " + typeof (resultsDiv));
console.log("none is " + typeof (none));
console.log("aNumber is " + typeof (aNumber));
console.log("trueFasle is " + typeof (trueFasle));



var nonexistent = "this shouldnt work";


if (none === undefined) {
    console.log("none is undefined 1");
}

if (!none) {
    console.log("none is undefined 2");
}


if (aNumber === "10") {
    console.log("10 is 10");
}



//Functions JS dooesnt support overloading as C# 
//function showMsg(msg) {
//     cosole.log("showMsg " + msg);     

//}

function showMsg(msg, more) {
    if (more) {
        console.log("showMsg+ " + msg, more);

    } else {
        console.log("showMsg+ " + msg);
    }
};



showMsg("YO");
showMsg("YO", "NO");


var showIt = function (msg) {
    console.log(msg);
};


showIt("Some message");


//Diferencses  between  showit and showMsg functions 
function showItThen(msg, callback) {
    showIt(msg);
    callback();
}

//Callback
showItThen("showItThen called", function () {
    console.log("callback called");
});





//////////////////////////////////////////////////////// Scopes   & Closures 

var inGlobal = true;


function testMe() {
    console.log("testMe(): " + inGlobal);

    var someMsg = "Some Poruke";
    console.log("testMe(): " + someMsg);

    showItThen("With Closure", function () {
        showIt("testMe With closure(): " + someMsg);
    });

}

//console.log("global: " + someMsg);
testMe();




////////////////////////////////////////////////////////////  Objects and Arrays 

//this is a object.... 
// Object can have  a  function or another  part  of  object called as  hiarchy ...  
var result = {
    name: "jQuey",
    language: "JavaScript",
    score: 4.5,
    showLog: function () {

    },

    owner: {
        login: "test",
        id: 123456
    }
};

//object mutations  JS  supports adding new properties on objects  on any time. 
//result.phoneNumber = "123-4566-3211";

//Accesig a object property
//console.log(result.name);
//console.log(result.phoneNumber);




//Arays 
//Empty array 
var test = [];
test.push(result);

///Collection with multiple object inside 
var results = [{

    name: "jQuey",
    language: "JavaScript",
    score: 4.5,
    showLog: function () {

    },

    owner: {
        login: "test",
        id: 123456
    }
}, {

    name: "jQuey UI",
    language: "JavaScript",
    score: 2.4,
    showLog: function () {

    },

    owner: {
        login: "test",
        id: 123456
    }


}];


//console.log("Results", results.length);
//console.log(results[1].name);





/// Looping 
//for (var x = 0; x < results.length; x++) {
//    var resultdata = results[x];
//    if (resultdata.score < 3) break;
//    console.log(resultdata.name);
//}



//// JQUERY  stuff 

//Be sure at all documwents och scripts are loaded 
//before  a  runing a  jQuery code with document ready . 
$(document).ready(function () {

    var resultListData = $("#resultList");
    resultListData.text('This is from JQuery');



    var toggleButton = $("#toggleButton");

    toggleButton.on("click", function () {
        resultListData.toggle(500);

        if (toggleButton.text() === "Hide") toggleButton.text("Show");
        else toggleButton.text("Hide");

    });



    ////////////////////////////////// Querying the Document  with  Jquery


    var listItems = $("header nav li");

    listItems.css("font-weight", "bold");
    listItems.css("font-size", "18px");
    //$(" header nav li").css("font-weight", "bold"); 

    //Find first li element in listItems and add font size  to 18px , thats its  should be '
    //slow  if  we have a larger document with elements ... 
    $("header nav li:first").css("font-size", "18px");


    //Instead we can use this  allready filled list
    listItems.filter(":first").css("font-size", "18px");

    //////////////////////////////////////////////////////////////////////////////////////////      



    /////////////////////////////////////// Modifiying the Document using JQuery


    resultListData.empty();
    $.each(results, function (i, item) {

        var newResult = $("<div class='result'>" +
            "<div class = 'title'>" + item.name + "</div>" +
            "<div>Language: " + item.language + "</div>" +
            "<div>Owner:" + item.owner.login + "</div>" +
            "</div>");

        //Hover 
        newResult.hover(function () {
            //function entering make darker 
            $(this).css("background-color", "lightgray");

        }, function () {
            //callback function leaving / reverse
            $(this).css("background-color", "transparent");
        });

        resultListData.append(newResult);
    });


    //////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////Networking with jQuery  

    //var url = "https://api.github.com/search/repositories?q=jquery+language:javascript&sort=star";


    //   $.get(url, function (r) {
    //       displayResults(r.items);

    //   }).fail(function (err) {
    //       console.log("Failed to query Github");
    //   }).done(function () {
    //       console.log("Payload has been downloaded");
    //   });



    //$.get(gitHubSearch)

    //    .done(function (r) {

    //        //console.log(r.items.length);

    //        displayResults(r.items);

    //    })

    //    .fail(function (error) {

    //        console.log("failed to query to GitHub");

    //    });





    $("#githubSearchForm").on("submit", function () {

        var searchPhrase = $("#searchPhrase").val();
        var useStars = $("#useStars").val();
        var langChoice = $("#langChoice").val();



        if (searchPhrase) {
            resultListData.text("Performing search ---- ");

            var url = "https://api.github.com/search/repositories?q=" + encodeURIComponent(searchPhrase);

            if (langChoice !== "All") {

                url += "+language:" + encodeURIComponent(langChoice);
            }

            if (useStars) {
                url += "&sort = stars";
            }



            $.get(url, function (r) {
                displayResults(r.items);

            }).fail(function (err) {
                console.log("Failed to query Github");
            }).done(function () {
                //resultListData.text("Your Search Data");
                console.log("Y");
            });
        }

        return false;

    });


    function displayResults(resultsData) {
        $.each(resultsData, function (i, item) {

            var newResult = $("<div class='result'>" +
                "<div class = 'title'>" + item.name + "</div>" +
                "<div>Language: " + item.language + "</div>" +
                "<div>Owner:" + item.owner.login + "</div>" +
                "</div>");

            //Hover 
            newResult.hover(function () {
                //function entering make darker 
                $(this).css("background-color", "lightgray");

            }, function () {
                //callback function leaving / reverse
                $(this).css("background-color", "transparent");
            });

            resultListData.append(newResult);
        });


    }

});





