# 总纲

---------------------

## funtions keys

- imports()
- exports()
- includes()

### imports()



```

---
    imports() : 
        Component1 : 'Component1'
        'Component2,{SubComponent2} : 'Component2'
        '{SubComponent3} : 'Component3'
---
```
```

import Component1 from 'Component1'
import Component2,{SubComponent2} from 'Component2'
import {SubComponent3} from 'Component3'

const props = {}
MarkdownComponent.defaultProps = props

function MarkdownComponent(props){
    //codes here
}

export default MarkdownComponent
export {props}
```


### exports()

exports modules ,which would set an arraylike object in props.exports 

```

---
    imports() : 
        Component1 : 'Component1'
        'Component2,{subComponent2} : 'Component2'
        '{subComponent3} : 'Component3'
    exports() : 
        - Component1
        - Component2
        - subComponent3
---

```

```
import Component1 from 'Component1'
import Component2,{SubComponent2} from 'Component2'
import {SubComponent3} from 'Component3'


const props = {exports : {Component1,Component2,subComponent3 }}
MarkdownComponent.defaultProps = props

function MarkdownComponent(props){
    //code here
}

export default MarkdownComponent
export {props}

```



### includes()

imports modules and exports them by order 


```eg

---
    includes() : 
        - 'Component0'
        - 'Component1'
        - 'Component2'
    imports() : 
        Component3 : 'Component3'
    exports() : 
        - Component3
---
```
```

import $0 from 'Component0'
import $1 from 'Component1'
import $2 from 'Component2'
import Component3 from 'Component3'
const props = { exports : {0 : $0, 1 : $1, $2 : 2 , length : 3, splice : function(){}, Component3 }} 

MarkdownComponent.defaultProps = props

function MarkdownComponent(props){
    //code
}

export default MarkdownComponent
export {props}
```



## private variables

a  private variables start with  "_" 
局部变量也可以直接用来定义代码块，方便展示事例代码



    ---

        _name : private variables

    ---

    ```source _code
        <div></div>
    ```


```

let _name  = 'private variables'
let _code = '<div></div>'
    
const props = {} 

MarkdownComponent.defaultProps = props

function MarkdownComponent(props){
    return <div>{_name}</div>
    //code
}

export default MarkdownComponent
export {props}
```


## props



    ---

        name : private variables

    ---

    ```source code
        <div></div>
    ```


```

const props = {name ： 'private variables'， code : '<div></div>' } 

MarkdownComponent.defaultProps = props

function MarkdownComponent(props){
    return <div>{props.code}</div>
    //code
}

export default MarkdownComponent
export {props}
```


## generate codes order

```

//includes() codes here 

import $0 from 'Component0'
import $1 from 'Component1'

//imports() codes here 
import Component2 from 'Component2'



// privates variables codes here
let _name = 'markdown'
let _code = '<div></div>'

// props define
const props = {}

function MarkdownComponent(props){
    //codes here
}
MarkdownComponent.defaultProps = props

export default MarkdownComponent
export {props}
```
