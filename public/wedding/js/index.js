$(document).ready(function(){
    $("#content2-1 h4").click(function (event) {
        $("#content2-1 p").toggle();
    });
    $("#content2-2 h4").click(function (event) {
        $("#content2-2 p").toggle();
    })

    $("#content4-1 p").click(function (event) {
        $("#content4-1 table").toggle();
    });

    $("#qh1").on("click", function (event) {
        $("#yincang_2").hide();
        $("#yincang_3").hide();
        $("#yincang_1").fadeIn();
        $("#qh2").removeClass('current_img')
        $("#qh3").removeClass('current_img')
        $(this).addClass('current_img');
        event.preventDefault()
    })
    $("#qh2").on("click", function (event) {
        $("#yincang_1").hide();
        $("#yincang_3").hide();
        $("#yincang_2").fadeIn();
        $("#qh1").removeClass('current_img')
        $("#qh3").removeClass('current_img')
        $(this).addClass('current_img');
        event.preventDefault()
    })
    $("#qh3").on("click", function (event) {
        $("#yincang_1").hide();
        $("#yincang_2").hide();
        $("#yincang_3").fadeIn();
        $("#qh1").removeClass('current_img')
        $("#qh2").removeClass('current_img')
        $(this).addClass('current_img');
        event.preventDefault()
    })
});