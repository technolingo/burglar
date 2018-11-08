import React from 'react';

import styles from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case ('input'):
      inputElement = <input
                        className={styles.InputElement}
                        {...props.elementAttributes}
                        value={props.value}
                        onChange={props.changed}
                     />;
      break;
    case ('textarea'):
      inputElement = <textarea
                        className={styles.TextArea}
                        {...props.elementAttributes}
                        value={props.value}
                        onChange={props.changed}
                     />;
      break;
    case ('select'):
      inputElement = (<select className={styles.Select} onChange={props.changed}>
        {props.elementAttributes.options.map(op => (
          <option value={op.value} key={op.value}>{op.displayValue}</option>
        ))}
        </select>);
      break;
    default:
      inputElement = <input
                        className={styles.InputElement}
                        {...props.elementAttributes}
                        value={props.value}
                        onChange={props.changed}
                     />;
  }

  return (
    <div className={styles.Input}>
      <label>{props.label}
        {inputElement}
      </label>
    </div>
  );
}

export default input;
