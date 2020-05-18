import React, {ButtonHTMLAttributes, FunctionComponent} from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const BaseButton: FunctionComponent<ButtonProps> = (props) => {
  const {className, children, ...restProps} = props;
  return (
    <button className={className} {...restProps}>{children}</button>
  );
};

const styledInput = styled(BaseButton)`
  display: inline-flex;
  padding: 10px 20px;
  cursor: pointer;
`;


export default (styledInput);
