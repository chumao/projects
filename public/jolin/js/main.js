
getjwplayer('http://v.nycs.syyx.com/nycs/flv/tibuflash_186x106_20120530.flv', 186, 105, "#flash", "none");
getflash('/jolin/img/flash_but.swf', 186, 105, "#flash_but")
getflash('/jolin/img/prize.swf', 284, 55, "#prize")

getflash('/jolin/img/run_game.swf', 221, 72, "#rungame_v")
getflash('/jolin/img/run_game2.swf', 221, 72, "#rungame_v2")

$(".rungame_1").mouseover(function() {
    $("#rungame_v2").css("visibility", "visible")
})
$(".rungame_1").mouseout(function() {
    $("#rungame_v2").css("visibility", "hidden")
})


$("#flash_btn").click(function(event) {
    $(document.body).append('<div id="pop_flash_dialog"><div id="pop_flash"></div></div>')
    getjwplayer('http://v.nycs.syyx.com/nycs/flv/bigvideo_642x342_20120530.flv', 640, 355, "#pop_flash") 
    $("#pop_flash_dialog").dialog({
        width       : 656,
        height      : 405,
        modal       : true,
        resizable   : false,
        dialogClass : "pop_video_detail",
        close       : function() {
            $("#pop_flash_dialog").remove();
        }
    });
    event.preventDefault()
})


function job_focus() {
    var imgfocus = 0
    var job = ["#jws", "#ynz", "#qxs", "#gdj"]
    var vid =[
    'http://v.nycs.syyx.com/nycs/swf/jian_5_8.swf',
    'http://v.nycs.syyx.com/nycs/swf/yi_5_8.swf',
    'http://v.nycs.syyx.com/nycs/swf/qiang_5_8.swf',
    'http://v.nycs.syyx.com/nycs/swf/ge_5_8.swf'
    ]

    getflash(vid[0], 238, 134, job[0]);

    for (var i = 4; i--;) {
        $("#j_tab span").eq(i).mouseover(function(a) {
            return function() {
                $("#j_tab span").eq(imgfocus).removeClass("check_" + imgfocus)
                $(this).addClass("check_" + a)
                $("#j_con .con").eq(imgfocus).css("display", "none")
                var focus = $("#j_con .con").eq(a)
                focus.css("display", "block")
                if($(job[a]).html()==""){
                    getflash(vid[a], 238, 134, job[a]);
                }
                $("#j_video").click(function(a) {
                    return function() {
                        video(vid2[a])
                    }
                }(a))
                imgfocus = a;
            }
        }(i))
    }
}
job_focus()

function img_scroll() {

    var scr = $("#scroll_body")
    var k   = 0
    var ok  = true

    function delay(a) {
        var focus = $("#scroll_body img").eq(a)
        if(focus.attr("delay")){
            focus.attr("src", focus.attr("delay"))
            focus.removeAttr("delay")
            focus.load(function(){
                $(this).css("display", "inline")
            })
        }
        ok = true
    }

    $("#prev").click(function() {
        var po = scr.css("marginLeft").replace("px","")
        if(po == 0 || ok == false) {
            return
        }
        ok = false
        scr.animate({marginLeft : po - 0 + 235 + "px"},function() {
            delay(--k)

        })
    }) 
    $("#next").click(function() {
        var po = scr.css("marginLeft").replace("px","")
        if(po == -1175 || ok == false){
            return
        }
        ok = false
        scr.animate({marginLeft : po - 235 + "px"}, function() {
            delay(++k)
        })
    })
    $("#scroll_body a").lightBox();
}
img_scroll()

$("#to_reg_3").click(function() {
    $("html").animate({ scrollTop: 574 }, "normal")
    $("body").animate({ scrollTop: 574 }, "normal")
    $("#txtUserAccount").select()
})