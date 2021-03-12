##### 写出输出值并解释为什么?
```
let a =1, b =2,head = {next: {next:1}}
[a,b] = [b,a]
[head.next,head.next.next] = [head.next.next,head.next]
console.log(a,b,head)
```
题解
> 答案：2 1 {next: 1}

##### 参考解析
通过解构赋值可以交换两个变量的值，所以[a,b] = [b,a]，但是对象就需要注意下了。
```
head = {next: {next:1}}
[head.next,head.next.next] = [head.next.next, head.next]
注意解构的过程，来分析下[head.next,head.next.next] = [head.next.next,head.next]
```
可以这么来理解，第一步在右边创建临时变量[1, {next: 1}]，然后就是临时数组的一个解构，等同于[head.next,head.next.next] = [1, {next: 1}]
但是这里就需要注意下面的两步了:
+ ①head.next = 1
+ ②head.next.next = {next: 1}
①的执行head.next的值变为1了，这时head的值就为{next:1},head原先的值被改变了。
②再执行的时候，head.next.next现在已经为undefined了，即head.next为1，它不是一个对象
所以最终的值变味了`{next:1}`

##### 按要求是实现go函数
```
// 示例
go("l")  // gol
go()("l")  // gool
go()()()('l')  // gooool

```
实现
```
function go(...arg1){
    let str = 'go'
    const addArg = function(...arg2){
        if(!arg2[0]) {
            str += 'o'
            return addArg
        }else {
            return (str+=arg2[0]);
        }
    }

    return addArg(...arg1)
}


