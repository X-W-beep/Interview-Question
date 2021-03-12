// 深拷贝(优化版)
function deepClone(origin, hashMap = new WeakMap()){
    // 判断是不是对象
    if(typeof origin !== 'object' || origin == undefined) return origin

    // 排除几种情况(Date, RegExp)
    if(origin instanceof Date) {
        return new Date(origin)
    }

    if(origin instanceof RegExp) {
        return new RegExp(origin)
    }


    let result = new origin.constructor()

    let originMap = hashMap.get(origin)

    if(originMap) return originMap 

    hashMap.set(origin, result)

    for (let k in origin) {
        // 自有属性，对象原型上的自定义的属性无法返回
        if(origin.hasOwnProperty(k)) {
            // 进一步判断是不是对象
            if(origin[k] !== null && typeof origin[key] === 'object'){
                result[k] = deepClone(origin[k])
            }else {
                result[k] = origin[k]
            }
           
        }
    }

    return result
}

// 深拷贝（简化版）
function simplifyDeepClone(origin, target){
    let tar = target || {}
    const toStr = Object.prototype.toString
    const arrayType = '[object Array]'

    for(let k in origin){
        if(origin.hasOwnProperty(k)) {
            if(typeof origin[k] === 'object' && origin[k] !==null) {
                tar[k] = toStr.call(origin[k]) === arrayType  ? [] : {}
                deepClone(origin[k], tar[k])
            }else {
                tar[k] = origin[k]
            }
        }

    }

    return tar

}