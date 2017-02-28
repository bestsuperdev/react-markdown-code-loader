---
test-front-matter: 'hello world'
_test-private-var: 'hello me'
whom : 'world '
_whom : 'me'
includes() : 
  - './button.js'
  - './hello-world.js'
requires() : 
  - './hello-world.css'
  - './button.css'
imports() :
  Button: './button.js'
  'HelloWorld,{SubHelloWorld}': './hello-world.js'
exports()  : 
  - Button
  - HelloWorld


---
# Hello World

This is an example component

```source code
var who = 'world'
console.log(who)
```


```source _code
var who = 'private'
console.log(who)
```

```render html
<HelloWorld />
<Button label="Hello World" />
<Button label={props.whom} />
```

You can set who to say Hello

```render html
<HelloWorld who="Fernando" />
<Button label="Hello Fernando" />
<Button label={_whom} />
```
