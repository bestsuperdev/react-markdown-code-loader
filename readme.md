React Markdown 
==================

React Markdown Loader with code sources as attributes

This is a fork of [react-markdown-loader](https://github.com/javiercf/react-markdown-loader) and add some features

This loader parses markdown files and converts them to a React Stateless Component.
It will also parse FrontMatter to import dependencies and render components
~~along with it’s source code~~ and  export code sources as key on attributes


I forkedd this loader in order to make the process of creating styleguides for
React components easier with my own project

## Install

```
npm install react-markdown-code-loader  --save-dev
```


## Usage

In the FrontMatter you should import the components you want to render
with the component name as a key and it's path as the value


*webpack.config.js*
```js
module: {
  loaders: [
    {
      test: /\.md$/,
      loader: 'babel!react-markdown-code'
    }
  ]
}
```


*Hello.js*
```js
import React, { PropTypes } from 'react';

/**
 * HelloWorld
 * @param {Object} props React props
 * @returns {JSX} template
 */
export default function Hello(props) {
  return (
    <div className="hello">
      Hello { props.who }
    </div>
  );
}
```


*Hello.md*

<pre>
---
imports:
  Hello: './Hello.js'
---

# Hello World

This is an example component

```render
&lt;Hello /&gt;
```

You can send who to say Hello

```render
&lt;Hello who="World!!!" /&gt;
```

</pre>


*app.jsx*
``` 
import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './Hello.md'

ReactDOM.render(<Hello />,document.body)

```

## Advance Usage

<pre>
---
imports:
  HelloWorld: './hello-world.js',
  '{ Component1, Component2 }': './components.js'
  who : 'world' 
---

```attributes code
&lt;div&gtthis code block with tag "attributes xx" would not be rendered in the markdown/component,it would be set in the attributes &lt;/div&gt
&lt;div&gtcall this code ,use   "attributes.code[0]"  &lt;/div&gt
```


```attributes code
&lt;div&gtthis code block with tag "attributes xx" would not be rendered in the markdown/component,it would be set in the attributes &lt;/div&gt
&lt;div&gtcall this code ,use   "attributes.code[1]" &lt;/div&gt
```


```render
&lt;Hello who={attributes.who} /&gt
```

```render
&lt;pre&gt&lt;code&gtattributes.code[0]&lt;/code&gt&lt;/pre&gt
```

</pre>

