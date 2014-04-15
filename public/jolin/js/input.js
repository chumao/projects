//--------------------------------------------------------------------------------------------------------
// input.js 一个通用的input控件处理模块
//--------------------------------------------------------------------------------------------------------
/*
var example_input_data = [
    {   name          : "account_name",
        input_id      : "txtUserAccount",
        info_div_id   : "txtUserAccount",
        status_div_id : "txtUserAccountTip",
        local_check   : [
            { type : 'empty', err_info : "请输入账号" },
            { type : 'length', min : 6, max : 16, err_info : "账号长度必须6-16位" },
            { type : 'regex', value : /^[A-Za-z0-9_]{6,16}$/, err_info : "只能为字母,数字,下划线" }
        ],
        remote_check  : {
            url      : '/account_check',
            1        : '该账号已经存在'
        }
    },
    {   name             : "password",
        input_id         : "txtPasswords",
        info_div_id      : "txtPasswordsVal",
        status_div_id    : "txtPasswordsTip",
        info_cover_input : true,
        local_check      : [
            { type : 'empty', err_info : "请输入密码" },
            { type : 'length', min : 6, max : 16, err_info : "密码的长度为6-16个字符" } ,
            { type : 'regex', value : /^[^\s]{6,16}$/, err_info : "输入的密码不能包含空格" }
        ]
    },
    {   name             : "confirm_password",
        input_id         : "txtConfirm",
        info_div_id      : "txtConfirmVal",
        status_div_id    : "txtConfirmTip",
        info_cover_input : true,
        local_check      : [
            { type : 'empty', err_info : "请再输入一遍密码" },
            { type : 'equal', value : "txtPasswords", err_info : "两次输入的密码不一致" }
        ]
    },
    {
        name          : "id_card",
        input_id      : "txtCardID",
        info_div_id   : "txtCardID",
        status_div_id : "txtCardIDTip",
        local_check   : [
            { type : 'empty', err_info : "请输入您的身份证信息" },
            { type : 'length', options : [ 15, 18 ], err_info : "身份证应为15位或18位" },
        ],
        remote_check  : {
            url : "",
            1   : ""
        }
    },
    {   name          : "true_name",
        input_id      : "txtTrueName",
        info_div_id   : "txtTrueName",
        status_div_id : "txtTrueNameTip",
        local_check   : [
            { type : 'empty', err_info : "请输入您的姓名" },
            { type : 'length', min : 2, max : 10, err_info : "姓名必须2-10个汉字" } ,
            { type : 'regex', value : /^[\u4e00-\u9fa5]{2,6}$/, err_info : "姓名必须是汉字" }
        ]
    },
    {   name          : "validate_pic",
        input_id      : "txtValidate",
        status_div_id : "txtValidateVal",
        pic_img       : { id : "validateimg", src : "" },
        local_check   : [
            { type : 'length', min : 4, max : 4, err_info : false }
        ],
        remote_check  : {
            url : "",
            1   : ""
        }
    }
]
*/
//--------------------------------------------------------------------------------------------------------
var input_config = {
    background_highlight_class : "focus_in_inut",
    error_tag_class            : "input_wrong",
    status_class               : {
        ok       : "check_result_right",
        error    : "check_result_wrong",
        checking : "check_result_loading"
    }
}

var captcha_dom
//--------------------------------------------------------------------------------------------------------
var input_local_check_func = _G_all_input_checks
//--------------------------------------------------------------------------------------------------------
function input_highlight_background(input) {
    input.addClass(input_config.background_highlight_class)
}

function input_recover_background(input) {
    input.removeClass(input_config.background_highlight_class)
}
//--------------------------------------------------------------------------------------------------------
function input_recover(input, input_data) {
    var input_err = input.hasClass(input_config.error_tag_class)
    if ((!input_data.pic_img) && input_err) {
        input.removeClass(input_config.error_tag_class)
        input.val("")
        
        var status_div_id = input_data.status_div_id
        if (status_div_id) {
            status_div_id = '#' + status_div_id
            $(status_div_id).attr('class', '')
        }
    }
}
//--------------------------------------------------------------------------------------------------------
function input_check_ok(input, input_data) {
    var status_div_id = input_data.status_div_id
    if (status_div_id) {
        status_div_id = '#' + status_div_id
        $(status_div_id).attr("class", input_config.status_class.ok)
    }
}

function input_check_error(input, input_data, err_info) {
    input.addClass(input_config.error_tag_class)

    var status_div_id = input_data.status_div_id
    if (status_div_id) {
        status_div_id = '#' + status_div_id
        $(status_div_id).attr("class", input_config.status_class.error)
    }

    var info_div_id = input_data.info_div_id
    if (info_div_id) {
        info_div_id = '#' + info_div_id

        if ($(info_div_id).is(":hidden")) {
            input.hide()
            $(info_div_id).show()
        }

        if (err_info) {
            $(info_div_id).val(err_info)
        }
    }
}
//--------------------------------------------------------------------------------------------------------
function input_local_check(input, input_data) {
    var value = input.val()

    for (var i in input_data.local_check) {
        var check_info = input_data.local_check[i]
        var key = check_info.type
        var check_func = input_local_check_func[key]

        var err_info = check_func(value, check_info)
        if (err_info !== undefined) {
            input_check_error(input, input_data, err_info)
            return false
        }
    }

    input_check_ok(input, input_data)

    return true
}

function input_remote_check(input, input_data) {
    if (!input_data.remote_check) {
        return true
    }

    var value = input.val()
    var check_url = input_data.remote_check.url

    var status_div_id = '#' + input_data.status_div_id
    $(status_div_id).attr("class", input_config.status_class.checking)

    var pathname = document.location.pathname.toLowerCase()
    var pagename = pathname.substring(pathname.lastIndexOf("/") + 1).replace(".html", "")

    $.ajax({
        type     : 'GET',
        cache    : false,
        url      : check_url,
        data     : {    
                        v : value , 
                        account : $("#txtUserAccount").val(),
                        page_name : pathname
                    },
        dataType : 'json',
		async: false,
        success  : function(data){
            if (data.type == 0) {
                input_check_ok(input, input_data)
                return
            }

            var err_info = input_data.remote_check[data.type + '']
            input_check_error(input, input_data, err_info)
        }
        
    });
}
//--------------------------------------------------------------------------------------------------------
function input_show_pic(input, input_data) {
    if($('#' + input_data.pic_img.id).is(':hidden')){
        get_captcha(captcha_dom)
        $('#' + input_data.pic_img.id).show()
    }
}

function input_pic_setting(input, input_data) {
    var input_id = '#' + input_data.input_id
    var img_id = '#' + input_data.pic_img.id

    //$(img_id).attr("src", input_data.pic_img.src + "?r=" + Math.random())

    $(input_id).keyup(function(event) {
        if($(input_id).val().length == 4){
            var ret = input_local_check(input, input_data)
            if (!ret) {
                return
            }
            
            input_remote_check(input, input_data)
        }
		else{
			if(event.which != 13){
				$('#txtValidateVal').attr('class', '')
			}
		}
    })
    var ok = false;
    $(img_id).click(function() {
        if(ok) {
            return
        }
        ok = true
        var status_div_id = '#' + input_data.status_div_id
        var page_name = document.location.pathname.toLowerCase()
        $(img_id).attr("src", input_data.pic_img.src + "?page_name="+page_name+"&r=" + Math.random())
        $(img_id).load(function() {
            $(this).unbind("load")
            ok = false;
        })
        $(status_div_id).attr("class", input_config.status_class.error)
    })
}
//--------------------------------------------------------------------------------------------------------
function input_info_cover_input_setting(input, input_data) {
    var info_div_id = input_data.info_div_id
    if (info_div_id) {
        info_div_id = '#' + info_div_id

        $(info_div_id).focus(function() {
            if (input.is(':hidden')) {
                $(this).hide()
                input.show()
                input.focus()
            }
        })
    }
}
//--------------------------------------------------------------------------------------------------------
function input_setting(input_data) {
    var input_id = '#' + input_data.input_id
    var input = $(input_id)

    input.val("")
 
    input.focus(function() {
        get_captcha(captcha_dom)

        if (input_data.pic_img) {
            input_show_pic(input, input_data)
        }

        input_highlight_background(input)
        input_recover(input, input_data)
    })

    input.blur(function() {
        input_recover_background(input)

        if (input_data.pic_img) {
            return
        }

        var ret = input_local_check(input, input_data)
        if (!ret) {
            return
        }

        input_remote_check(input, input_data)
    })

    if (input_data.pic_img) {
        input_pic_setting(input, input_data)
    }

    if (input_data.info_cover_input) {
        input_info_cover_input_setting(input, input_data)
    }
}
//--------------------------------------------------------------------------------------------------------
function input_setting_inputs(inputs_data) {
    for(var j in inputs_data) {
        if(inputs_data[j].pic_img){
           captcha_dom = inputs_data[j]
        }
    }
    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        input_setting(input_data)
    }

}
//--------------------------------------------------------------------------------------------------------
function input_get_inputs_value(inputs_data) {
    var ret = false

    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        var input_id = '#' + input_data.input_id
        var key = input_data.name
        var value = $(input_id).val()

        ret = ret || {}
        ret[key] = value
    }

    return ret
}
//--------------------------------------------------------------------------------------------------------
function input_local_check_inputs(inputs_data) {
    var ret = true

    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        var input_id = '#' + input_data.input_id
        if (!input_local_check($(input_id), input_data)) {
            ret = false
        }
    }

    return ret
}
//--------------------------------------------------------------------------------------------------------
function input_status_check(inputs_data) {
    var ret = true
	
    for (var i in inputs_data) {
        var input_data = inputs_data[i]
        var status     = check_unit_status(input_data)
        
        if(status == false) {
			$('#' + input_data.input_id).focus().blur()
            ret = false
            break
        }  
    }

    return ret
}
//--------------------------------------------------------------------------------------------------------
function get_captcha(input_data) {
    if($('#' + input_data.pic_img.id).is(':hidden')){
	    var img_id = '#' + input_data.pic_img.id
        var page_name = document.location.pathname.toLowerCase()
        if (!$(img_id).attr("src")) {
            $(img_id).attr("src", input_data.pic_img.src + "?page_name="+page_name+"&r=" + Math.random())
        }
    }
}
//------------------------------------------------------------------------------------------------
function check_unit_status(input_data) {            //  add by jiangxi
    var status_div_id = '#' + input_data.status_div_id
    var ok_status     =  $(status_div_id).hasClass(input_config.status_class.ok)
    
    if(ok_status) {
        return true
    } 

    if(!input_data.pic_img) {
        return false
    }

    var input_id     = '#' + input_data.input_id
    var char_num     = $(input_id).val().length

    if(char_num != 4) {
        return false
    }
    
    var err_status   = $(status_div_id).hasClass(input_config.status_class.error)
    var check_status = $(status_div_id).hasClass(input_config.status_class.checking)
    
    if(err_status || check_status) {
        return false
    }

    return true
    
}
//------------------------------------------------------------------------------------------------
