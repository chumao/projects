var get_elm_value_func = function(elmid) {
    var elm_value_func = {
        'SPAN'  : 'html',
        'INPUT' : 'val'
    }

    var tagname = $(elmid).get(0).tagName.toUpperCase()
    var val_func_name = elm_value_func[tagname]

    if (!val_func_name) {
        alert('error elm: ' + elmid + ' ' + tagname)
        return
    }

    return $(elmid)[val_func_name]   
}

var is_elm_exist = function(elmid) {
    return ($(elmid).length)
}

var register_write_account = function(account) { 
    var val_func = get_elm_value_func("#reg_account")
    val_func.call($("#reg_account"),account)

    if (is_elm_exist("#reg_account3")) {
        $("#reg_account3").html(account)
    }
}

var register_write_card = function(card) {
    var val_func = get_elm_value_func("#active_code")
    val_func.call($("#active_code"),card)
}

var register_display_card = function() {
    $(".reg").hide()
    $("#reg_step2").show()
}

var active_success = false

var register_active_card = function() {
    $("#active_link").click(function(event) {
        if (active_success) {
            return
        }

        var val_func    = get_elm_value_func("#reg_account")
        var reg_account = val_func.call($("#reg_account"))

        var val_func    = get_elm_value_func("#active_code")
        var active_code = val_func.call($("#active_code"))

        if (reg_account == "" || active_code == "" ) {
            alert('请输入帐号或者激活码')
            return
        }
        
        var args = {
            account : reg_account, 
            card    : active_code
        }

        $.post('/activate_card', args, register_active_callback, 'html')
        active_success = true

        return false
    })
}

var register_active_callback = function(data) {
    active_success = false;
    $("#reg_step2").hide()

    if (data == '0') {
        $("#reg_step4").show()
        return
    }

    var tip_infos = {
        '1'  : "对不起，帐号错误",
        '-2' : "对不起，新手卡错误"
    }

    var tip = tip_infos[data] || "对不起，服务器异常"
    if(is_elm_exist("#active_tip")) {
        $("#active_tip").html(tip);
    }

    $("#reg_step5").show()

    $("#back").click(function() {
        $("#reg_step2").show()
        $("#reg_step5").hide()
    })
}

function register_give_card(info) {
    register_write_account(info[0])
    register_write_card(info[1])
    register_display_card()
    register_active_card()
}
