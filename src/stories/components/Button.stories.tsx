import React from 'react';
import { StoryFn } from '@storybook/react';
import Button from '@components/Button';

export default {
  title: 'components/Button',
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'check' },
    },
    size: {
      options: ['medium', 'large', 'small'],
      control: { type: 'select' },
    },
  },
};

interface Props {
  size: 'medium' | 'large' | 'small';
  select: any[];
}

const Template: StoryFn<Props> = ({ size }: Props) => {
  return (
    <div>
      <Button size={size}>안녕</Button>
    </div>
  );
};

export const Default = {
  render: Template,

  args: {
    size: 'medium',
  },
};

export const LARGE = {
  render: Template,

  args: {
    size: 'large',
  },
};

export const SMALL = {
  render: Template,

  args: {
    size: 'small',
  },
};
