##### 虚拟列表是什么？说一下它的实现原理？
###### 一、什么是长列表？
前端的业务开发中会遇到一些数据量较大契额无法使用分页方式来加载的列表，我们一般把这种列表叫做长列表。
完整渲染的长列表基本上很难达到业务上的要求的，非完整渲染的长列表一般有两种方式：
+ 懒渲染：这个就是常见的无限滚动的，每次之渲染一部分（比如10条），等剩余部分滚动到可见区域，就再渲染另一部分。
+ 可视区域渲染：只渲染可见部分，不可见部分不渲染。

**虚拟列表就是采用的可视区渲染方式优化**
##### 虚拟列表实现原理
虚拟列表，是一种长列表优化方案，是可视区渲染列表，其两个重要的概念：
+ 可滚动区域：假设有1000跳数据，每个列表项的高度是30，那么可滚动的区域的高度就是`1000 * 30`。当用户改变列表的滚动条的当前滚动值的时候，会造成可见区域的内容的变更。
+ 可见区域:比如列表的高度是300，右侧有纵向滚动条可以滚动，那么视觉可见的区域就是可见区域。

虚拟列表原理：
*用数组保存所有列表元素的位置，只渲染可视区内的列表元素，当可视区滚动时，根据滚动的offset大小以及所有列表元素的位置，计算在可视区应该渲染哪些元素。*
##### 参考实现
实现虚拟列表就是处理滚动条滚动后的可见区域的变更，具体实现步骤如下：
1.计算当前可见区域起始数据的startIndex
2.计算当前可见区域结束数据的endIndex
3.计算当前 可见 区域的数据，并渲染到页面中
4.计算startIndex对应的数据在整个列表整个列表中的偏移位置startOffset，并设置到列表上。
做了一个设定：每个列表项的高度都是30px.在这个约定下，核心javascript代码不超过10行，但是可以完整的实现课件区域的渲染和更新。
HTML、Css如何实现，添加了这么几个样式：
+ 列表元素 （.list-view）使用相对定位
+ 使用一个不可见元素（.list-view-phantom）撑起这个列表，让列表的滚动条出现
+ 列表的可见元素 (.list-view-content)使用绝对定位，left,righy,top设置为0
```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>简单实现虚拟列表</title>
    </head>
    <style>
        .list-view {
            height: 400px;
            overflow: auto;
            position: relative;
            border: 1px solid #aaa;
        }

        .list-view-phantom {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            z-index： -1
        }

        .list-view-content {
            left: 0;
            right: 0;
            top: 0;
            position: absolute;
        }

        .list-view-item {
            padding: 5px;
            color: #666;
            line-height: 30px;
            box-sizing: border-box;
        }

        [v-cloak] {
            display: none;
        }
    </style>
    <body>
        <div id="app" v-cloak>
            <div class="list-view" ref="scrollBox" @scroll="handleScroll">
                <div class="list-view-phantom">
                :style="{height: contentHeight}"
                </div>
                <div        ref="content"             class="list-view-content"
                >
                    <div
                        class="list-view-item"
                        :style="{height: itemHeight} + 'px'"
                        v-for="item in visibleData"
                    >
                        {{item}}
                    </div>
                </div>
            
            </div>
        </div>
        <script>
        new Vue({
            el: '#app',
            computed: {
                contentHeight(){
                    return this.data.length * this.itemHeight + 'px'
                }
            },
            mounted(){
                this.updateVisibleData();
            },
            data(){
                return {
                    data: new Array(100).fill(1),
                    itemHeight: 30,
                    visibleData: []  // 真正渲染的 data
                }
            },
            methods: {
                updateVisibleData(scrollTop = 0){
                    const visibleCount = Math.ceil(this.$refs.scrollBox.clientHeight / this.itemHeight)
                    const start = Math.floor(scrollTop / this.itemHeight)
                    const end = start + visibleCount;
                    this.visibleData = this.data.slice(start, end)
                    this.$refs.content.content.style.webkitTransform = `translate3d(0, ${start * this.itemHeight}px, 0)`;
                },
                handleScroll(){
                    const scrollTop = this.$refs.scrollBox.scrollTop
                    this.updateVisibleData(scrollTop);
                }
            }
        })
        </script>
    </body>
</html>
```