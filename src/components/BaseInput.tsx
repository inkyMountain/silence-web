import React, {FunctionComponent, InputHTMLAttributes} from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FunctionComponent<InputProps> = (props) => {
  const {className, children, label, ...restProps} = props;
  return (
    <div className={[className, 'input-wrapper'].join(' ')}>
      <label>{label}<input {...restProps} className={'base-input'}/></label>
    </div>
  );
};

const styledInput = styled(Input)`
  background-color: ${props => props.theme.lightGray};
  border-bottom: ${props => props.theme.deepGray} 2px solid;
  display: inline-flex;
  .base-input {
    max-width: 250px;
    font-size: 30px;
    line-height: 1em;
  }
`;


export default (styledInput);
