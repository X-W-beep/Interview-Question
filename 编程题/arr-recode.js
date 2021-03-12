// 重写数组上的原型方法
// let arr = [1,2,3]

// arr.forEach(function(item, index, arr){
//     console.log(this.name)
//     console.log(item, index, arr)
// }, obj)
// forEach
Array.prototype.forEach = function(cb){
    var _arr = this
    let _arg = arguments[1] || window
    for (let i = 0; i< _arr.length; i++ ) {
        cb.apply(_arg, [_arr[i], i, _arr])
    }
}

// map

Array.prototype.map = function(cb){
    var _arr = this
    var _len = _arr.length
    var result = []
    var _arg = arguments[1] || window
    var _item;
    var _res;
    for (let i= 0; i< _len; i++) {
        _item = deepClone(_arr[i])
        var item = cb.apply(_arg, [_item, i, _arr])
        item && result.push(item)
    }

    return result;
}


// filter
Array.prototype.filter = function(cb){
     var _arr = this;
     var _len = _arr.length
     var _item
     var _res = []
     var _arg = arguments[1] || window

     for(let i=0; i< _len; i++){
         _item = deepClone(_arr[i])
         if(cb.apply(_arg, [_item, i, _arr])) {
            _res.push(_arr[i])
         }
     }

     return _res
}

// every

Array.prototype.myEvery = function(cb){
    var _arr = this;
    var _len = _arr.length
    var _arg = arguments[1] || window
    var _item;
    var _res = true

    for(let i =0; i<_len; i++){
        _item = deepClone(_arr[i])
        if(!cb.apply(_arg, [_item, i, _arr])) {
            _res = false
            break;
        }
    }

    return _res
}


// some
// 同上

// reduce

// [1,2,3].reduce(function(prev, cur){
//     return prev + cur
// }, 0)

Array.prototype.myReduce = function(cb, initialValue){
    var _arr = this;
    var _len = _arr.length
    var _initialValue  = initialValue
    var _arg = arguments[2] || window;
    var _res = _initialValue
    var _item


    for(let i=0; i< _len; i++) {
        _item = deepClone2(_arr[i])
       _res = cb.apply(_arg, [_res, _item, _arr])
    }


    return _res;
}

console.log([1,2,3].myReduce((prev , cur) => prev + cur, 0));
