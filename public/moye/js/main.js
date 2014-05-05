(function () {
    // dom loaded
   $(function() {
        $("#reg_form").submit(function(event) {
            event.preventDefault();

            var this_form = $(this),
                is_validated = check_validity(this_form),
                success_message = 'Reg Success!\n\n';

            if (!is_validated) {
                return
            }
            // 验证通过
            this_form.find('input').each(function() {
                success_message += $(this).attr("name") + ": " + $(this).val() + "\n";
            })

            // 弹出输入的值
            alert(success_message)

            // 用ajax传到后台去， 如果返回1， 弹出输入的值
            $.ajax({
                url : this_form.attr('action'),
                type : this_form.attr('method'),
                data : this_form.serialize()
            }).done(function(data) {
                if (data === 1) {
                    alert(success_message)
                } else {
                    alert("reg failure")
                }
            })
            
        })

        // 检测给定的表单里面的输入项不能为空
        function check_validity(target_form) {
            var result = true;

            target_form.find("input").each(function() {
                var value = $.trim($(this).val()),
                    message = $(this).data("message");

                if (value.length === 0) {
                    result = false;
                    alert(message)
                    return false;
                }
            })

            return result
        }
   }) 
})();