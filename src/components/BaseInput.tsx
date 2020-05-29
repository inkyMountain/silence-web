import React, {FunctionComponent, InputHTMLAttributes} from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLDivElement> {
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
  display: inline-flex;
  .base-input {
    background-color: ${props => props.theme.lightGray};
    border-bottom: ${props => props.theme.deepGray} 1px solid;
    max-width: 250px;
    line-height: 30px;
    margin-left: 10px;
  }
`;


export default (styledInput);
