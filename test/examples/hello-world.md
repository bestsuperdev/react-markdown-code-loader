---
test-front-matter: 'hello world'
requires : 
  - './hello-world.css'
  - './button.css'
imports:
  Button: './button.js'
  HelloWorld: './hello-world.js'
exports  : 
  - Button
  - HelloWorld

---
# Hello World

This is an example component

```attributes codes
var who = 'world'
```

```render html
<HelloWorld />
<Button label="Hello World" />
```

You can set who to say Hello

```render html
<HelloWorld who="Fernando" />
<Button label="Hello Fernando" />
```
