import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

const Button = ({ children, size = 'medium' }: Props) => {
  return <StyledButton size={size}>{children}</StyledButton>;
};

const StyledButton = styled.button<{ size: 'small' | 'medium' | 'large' }>`
  background-color: green;
  border: none;
  cursor: pointer;

  ${({ size }) => {
    if (size === 'small') {
      return `padding: 5px 10px`;
    } else if (size === 'medium') {
      return `padding: 10px 15px`;
    } else {
      return `padding: 15px 25px`;
    }
  }}
`;

export default Button;
