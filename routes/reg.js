exports.add = function (req, res) {
    res.send(
        {
            ok : 1, 
            msg : '报名成功',
            name : req.body.name,
        }
    )
}