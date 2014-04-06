// 传入指定的数量
// 返回一个包含指定数量随机数的数组
var random_number = Math.floor(Math.random() * 100 + 1);
function generate_random_array(count) {
    var result = [];
    for (var i = 0; i < count; i++) {
        var random_number = Math.floor(Math.random() * 100 + 1);
        result.push(random_number)
    }

    return result
}

var a1 = generate_random_array(10)
for (var i = 0; i < a1.length; i++) {
    if (a1[i] % 2 === 0) {
        console.log(a1[i]);
    }   
}


var abc = function(xyz) {
    var result = [];
    for (var i=0; i<xyz.length; i++) {
        if (xyz[i] % 2 === 0) {
            result.push(xyz[i]);
        }   
    }
    return result
}
var aa = abc(a1)
console.log(aa);