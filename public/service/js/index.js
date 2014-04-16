$(document).ready(function(){
    $(".sub1").click(function (event) {
        $("#notice1").hide();
    });

    $('#content_nav a').click(function (event) {
        $(this).addClass('selected');
        $(this).siblings().removeClass('selected');

        var table_id = $(this).attr('href')

        $(".question_container table").hide()

        $(table_id).fadeIn()

        event.preventDefault()
    })

    $(".bgstyle_head1").click(function (event) {
        var value_text = $('.skbox1').val()

        if (value_text === '') {
            alert('请描述问题')
        } else {
            alert('提交成功')
        }
    })
    var default_text = "描述你的问题，比如“忘记密码”";
    
    $('.skbox1').focus(function (event) {
        var value_text2 = $('.skbox1').val()
        if (value_text2 === default_text) {
            $(".skbox1").val("");
        }
        
    })
    $('.skbox1').blur(function (event) {
        var value_text1 = $('.skbox1').val()
        if (value_text1 === "") {
            $(".skbox1").val(default_text);
        }   
    })
});