'use strict';
const camelize = require('camelize')
const except = require('except')

/**
 * @typedef HTMLObject
 * @type {Object}
 * @property {String} html    - HTML parsed from markdown
 * @property {Object} imports - Map of dependencies
 */

/**
 * Builds the React Component from markdown content
 * with its dependencies
 * @param   {HTMLObject} markdown - HTML and imports
 * @returns {String}              - React Component
 */
module.exports = function build(markdown) {
	console.log(markdown)
	const doImports = ['import React from \'react\';\n']
	const doExports = []
	const requires = markdown.attributes['requires()'] || [] 
	const includes = markdown.attributes['includes()'] || [] 
	const imports = markdown.attributes['imports()'] || {} 
	const exports = markdown.attributes['exports()'] || [] 
	const jsx = markdown.html.replace(/class=/g, 'className=')

	const privatesVars = []
	const exportsProps = {}
	let props = except(markdown.attributes, 'imports()','includes()','exports()','requires()')
	for(let k in props){
		if(k.charAt(0) === '_'){
			privatesVars.push(`const _${camelize(k.slice(1))} = ${JSON.stringify(props[k])};\n`)
		}else{
			exportsProps[k] = props[k]
		}
	}
	requires.forEach((style)=>{
		doImports.push(`require('${style}');\n`)
	})
	
	includes.forEach((item,i)=>{
		doImports.push(`import $${i} from '${item}';\n`)
	})

	for (const key in imports) {
		// eslint-disable-next-line no-prototype-builtins
		if (imports.hasOwnProperty(key)) {
			doImports.push(`import ${key} from '${imports[key]}';\n`)
		}
	}

	doExports.push(`props.exports = {${exports.join(',')}};\n`)
	doExports.push(`props.exports.length = ${includes.length}; \n`)
	doExports.push(`props.exports.splice = function(){}; \n`)
	includes.forEach((item,i)=>{
		doExports.push(`props.exports[${i}] = $${i}; \n`)
	})
	return `
${doImports.join('')}
${privatesVars.join('')}
const props = ${JSON.stringify(camelize(exportsProps))};
		
${doExports.join('')}

function Markdown(props) {
	return (
		<div>
			${jsx}
		</div>
	);
}
Markdown.defaultProps = props
export default Markdown
export {props}

`
}
