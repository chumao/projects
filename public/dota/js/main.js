$(function () {
    $('#reg').on('submit', function (event) {
        var $self = $(this);

        var request = $.ajax({
            url: $self.attr('action'),
            type : $self.attr('method'),
            data : $self.serialize(),
        })

        request.done(function (data) {
            if (data.ok === 0) {
                return alert('报名失败')
            }

            if (data.ok === 1) {
                return alert('报名成功, 你的名称是' + data.name)
            }

            alert(data.msg)
        })

        event.preventDefault()
    })
})

