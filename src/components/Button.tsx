import React, { HTMLAttributes } from 'react';

interface TypeButton extends HTMLAttributes<HTMLButtonElement> {
  name: string;
  className?: string;
  disabled?: boolean;
  type: 'button' | 'submit' | 'reset' | undefined;
}

const Button: React.FC<TypeButton> = (props) => {
  return (
    <button className={props.className} disabled={props.disabled} type={props.type}>
      {props.disabled && <span className='spinner-grow spinner-grow-sm' role='status' aria-hidden='true'></span>}
      {props.name}
    </button>
  );
};
export default Button;