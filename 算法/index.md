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
