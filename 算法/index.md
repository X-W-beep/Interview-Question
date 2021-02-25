##### 实现一个函数findLastIndex()，返回指定数在“有序数组”中最后一次出现位置的索引。如`findLastIndex([1,2,3,3,3,4,5], 3)`,返回4.时间复杂度是多少？什么情况下时间复杂度最高？
```
两端逼近法
function findLastIndex(arr, target){
    let left = 0,right = arr.length -1

    while(true) {
        if(arr[left] > target || arr[right] < target>) return -1
        let middle = Math.floor((right -left) /2 + left)
        arr[middle] > target ? right = middle : left = middle

        if(left + 1 === right && arr[right]= target){
            return right
        }

        if(left + 1 = right && arr[left] = target){
            return left
        }
}
console.log(findLastIndex([1,2,3,3,3,4,5],3))
```
二分查找：
```
const findLastIndex = (nums, target) => {
    const len = nums.length
    if(len < 1) return -1;
    let l =0, right= len -1
    while(l < r){
        const mid = (l + r) >> 1;
        target <  nums[mid] ? (r = mid): (l = mid + 1)
    }
    return l - 1
}
```
console.log(findLastIndex([1,2,3,3,3,4,5], 3))
二分查找时间复杂度O(logn)，target为数组最后一个的时候复杂度最高还是O(logn)。

##### 说一下深拷贝如何解决循环引用问题
> 循环引用问题

看个例子
```
function deepCopy(){
    const res = Array.isArray(obj) ? [] : {}
    for(let key in obj){
        if(typeof obj[key] === 'object') {
            res[key] = deepCopy(obj[key])
        }else{
            res[key] = obj[key]
        }
    }

    return res
}

var obj = {
    a: 1,
    b: 2,
    c: [1,2,3],
    d: {aa: 1, bb: 2},
}
obj.e = obj
console.log('obj', obj) // 不会报错

const objCopy = deepCopy(obj)
console.log(objCopy)  // Uncaught: Maxin
```
从例子可以看出，当存在循环引用的时候，deepCopy会报错，栈溢出。
+ obj对象存在循环引用时，打印它时是不会栈溢出
+ 深拷贝obj时，才会导致栈溢出

##### 循环引用问题解决
+ 即：目标对象存在循环引用时报错处理
大家都知道,对象的key是不能是对象的。
```
{{a:1}:2}
// Uncaught SyntaxError: Unexpected token 
```
*参考解决方式一：使用weekmap:*
解决循环引用问题，我们可以开辟一个存储空间，来存储当前对象和拷贝对象的对应关系
这个存储空间，需要可以存储key-value形式的数据，且key是一个引用类型。
我们可以选`WeakMap`这种数据结构：
+ 检查`WeakMap`中有无克隆过的对象
+ 有，直接返回
+ 没有，将当前对象作为key，克隆对象作为`value`进行存储
+ 继续克隆
```
function isObject(obj) {
  return (typeof obj === "object" || typeof obj === "function") && obj !== null;
}
function cloneDeep(source, hash = new WeakMap()) {
  if (!isObject(source)) return source;
  if (hash.has(source)) return hash.get(source); // 新增代码，查哈希表

  var target = Array.isArray(source) ? [] : {};
  hash.set(source, target); // 新增代码，哈希表设值

  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = cloneDeep(source[key], hash); // 新增代码，传入哈希表
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}
```
*参考解决方式二：*
可以用Set,发现相同的对象直接赋值，也可用Map
```
const o = {a:1，b:2}
o.c = o

function isPrimitive(val) {
    return Object(val) !== val
}
const set = new Set()
function clone(obj){
    const copied = {}
    for(const [key, value] of Object.entries(obj)) {
        if(isPrimitive(value)) {
            copied[key] = value
        }else {
            if(set.has(value)) {
                copied[key] = {...value}
            }else {
                set.add(value)
                copied[key] = clone(value)
            }
        }
    }
    return copied;
}
```


