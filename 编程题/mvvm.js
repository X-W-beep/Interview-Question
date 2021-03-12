/** 
 *  1. 数据 -> 响应式额数据 Object.defineProperty Proxy
 *  2. input -> input/ keyup -> 事件处理函数的绑定  ->  改变数据
 *  3. 相关的DOM -> 数据 -> 绑定在一起
 *     操作数据的某个属性  ->对应DOM就改变
 * 
 *     {
 *         'name': span节点 
 *     }
 * 
 */

 const  reg_var = /\{\{(.+?)\}\}/

class MVVM {
    constructor(el, data){
        this.el = document.querySelector(el)
        this.data = data
        this.domPool = {}
        this.init()
    }

    init(){
        this.initData()
        this.initDom(this.el)
    }

    initData(){
        let _this = this
        for(let k in this.data) {
            Object.defineProperty(this.data,k, {
                get(){
                    return this.data[k]
                }, 
                set(newValue){
                    _this.domPool[k].innerHTML = newValue
                    _this.data[k] = newValue
                }
            })
        }

        // Proxy 实现
        /**
         * this.data = new Proxy(this.data, {
            get(target, key){
                return Reflect.get(target, key)
            },
            set(target, key, value){
                _this.domPool[key] = value
                return Reflect.set(target, key, value )
            }
        })
         */
        
    }

    initDom(el){
        // 将data中的数据渲染到视图上
        let childNodes = el.childNodes

        console.log('childNodes', childNodes)

        childNodes.forEach(childNode => {
            if(childNode.nodeType === 3){
                // 说明是文本
                let _value = childNode.nodeValue
                let _key = _value.match(reg_var)[1]
                let _parentNode = childNode.parentNode
                this.domPool[_key] = childNode.parentNode
                _parentNode.innerText = this.data[_key] || undefined
            
                childNode.childNodes && this.initDom(childNode.childNodes)

            }
        })
    }

    bindInput(el){
        const _allInput = el.querySelectorAll('input')

        _allInput.forEach(input=> {
            // 获取双向绑定的v-model的key
            let _vModel = input.getAttribute('v-model')

            if(_vModel) {
                input.addEventListener('keyup', this.handleInput.bind(this, _vModel, input),false);
            }
        })
    }

    handleInput(key, el){
        let _inputValue = el.value

        this.data[key] = _inputValue
    }


}