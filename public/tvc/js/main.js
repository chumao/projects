$(document).ready(function(){
    $("#shuguang_main").show()

    $("#daoyan_main,#chuangyi_main,#zhizuo_main").hide()

    $("#daoyan_1,#daoyan_2,#daoyan_3,#daoyan_4,#chuangyi_1,#zhizuo_1,#zhizuo_2,#zhizuo_3,#zhizuo_4").lightBox();

    $("#flash_btn_sg").click(function(event) {
        $("body").append('<div id="pop_flash_dialog_sg"><div id="pop_flash_sg"></div></div>')
        
        getjwplayer('http://v.nycs.syyx.com/nycs/flv/TVCpre_640x355_20121001.flv', 640, 355, "#pop_flash_sg") 
        $("#pop_flash_dialog_sg").dialog({
            width       : 656,
            height      : 405,
            modal       : true,
            resizable   : false,
            dialogClass : "pop_video_detail_sg",
            close       : function() {
                $("#pop_flash_dialog_sg").remove();
            }
        });
        event.preventDefault()
    })

    $("#shuguang").click(function(event){
        $("#shuguang_main").css("display","block")
        $("#daoyan_main").css("display","none")
        $("#chuangyi_main").css("display","none")
        $("#zhizuo_main").css("display","none")
        event.preventDefault()
    })
    $("#daoyan").click(function(event){
        $("#shuguang_main").css("display","none")
        $("#daoyan_main").css("display","block")
        $("#chuangyi_main").css("display","none")
        $("#zhizuo_main").css("display","none")
        event.preventDefault()

    })
    $("#chuangyi").click(function(event){
        $("#shuguang_main").css("display","none")
        $("#daoyan_main").css("display","none")
        $("#chuangyi_main").css("display","block")
        $("#zhizuo_main").css("display","none")
        event.preventDefault()
    })
    $("#zhizuo").click(function(event){
        $("#shuguang_main").css("display","none")
        $("#daoyan_main").css("display","none")
        $("#chuangyi_main").css("display","none")
        $("#zhizuo_main").css("display","block")
        event.preventDefault()
    })

    $("#flash_btn").click(function(event) {
        $("body").append('<div id="pop_flash_dialog"><div id="pop_flash"></div></div>')
        getjwplayer('http://v.nycs.syyx.com/nycs/flv/TVC_sunlight_640x355_20121001.flv', 640, 355, "#pop_flash") 
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

    getjwplayer('http://v.nycs.syyx.com/nycs/flv/TVCsmall_188x104_0923.flv', 188, 104, "#flash", "none");
    getflash('http://r.syyx.com/events/p075/flash_but.swf', 188, 104, "#flash_but")

    getjwplayer('http://v.nycs.syyx.com/nycs/flv/TVChuaxu_360x204_0923.flv', 364, 204, "#flash_sg", "none");
    getflash('http://r.syyx.com/events/p075/flash_but.swf', 250, 150, "#flash_but_sg")
});

function getflash(swf, w, h, id) {
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + w + '" height="' + h + '" ><param name="movie" value="' + swf + '" /><param name="allowScriptAccess" value="always" /><!--[if !IE]>--><object type="application/x-shockwave-flash" data="' + swf + '" width="' + w + '" height="' + h + '"><param name="allowScriptAccess" value="always" /><!--<![endif]--><param name="wmode" value="transparent" /><!--[if !IE]>--></object><!--<![endif]--></object><div></div>'
    $(id).html(object)
}

function getjwplayer(swf,w,h,id,position){
    if(!position){
        position = "over"
    }
    var object = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" hidefocus="true" id="mediaplayer" width="' + w + '" height="' + h + '" bgcolor="#000000" name="mediaplayer" tabindex="0"><param name="movie" value="http://v.nycs.syyx.com/jwplayer/player.swf"><!--[if !IE]>--><object type="application/x-shockwave-flash" hidefocus="true" data="http://v.nycs.syyx.com/jwplayer/player.swf" width="' + w + '" height="' + h + '"><!--<![endif]--><param name="allowfullscreen" value="true"><param name="seamlesstabbing" value="true"><param name="wmode" value="transparent" /><param name="flashvars" value="netstreambasepath='+document.location.href+'&id=mediaplayer&file='+swf+'&controlbar.position='+position+'&volume=41&autostart=true&repeat=SINGLE"><!--[if !IE]>--></object><!--<![endif]--></object>'
    $(id).html(object)
}