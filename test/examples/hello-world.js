import React from 'react';

/**
 * Says hello to who
 * By default who is World
 * @param {Object} props React props
 * @returns {JSX} template
 */
export default function HelloWorld(props) {
  return <div className="hello-world">Hello { props.who }</div>;
}