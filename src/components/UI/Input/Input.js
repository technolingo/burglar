import React from 'react';

import styles from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  const inputElementClasses = [styles.Field]
  if (props.invalid && props.shouldValidate) {
    inputElementClasses.push(styles.Invalid)
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
                        className={inputElementClasses.join(' ')}
                        {...props.elementAttributes}
                        value={props.value}
                        onChange={props.changed}
                     />;
      break;
    case ('textarea'):
      inputElement = <textarea
                        className={inputElementClasses.join(' ')}
                        {...props.elementAttributes}
                        value={props.value}
                        onChange={props.changed}
                     />;
      break;
    case ('select'):
      inputElement = (<select className={inputElementClasses.join(' ')} onChange={props.changed} value={props.value}>
        {props.elementAttributes.options.map(op => (
          <option value={op.value} key={op.value}>{op.displayValue}</option>
        ))}
        </select>);
      break;
    default:
      inputElement = <input
                        className={inputElementClasses.join(' ')}
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
