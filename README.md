# ๐ป ๋ฆฌ์กํธ ๋์์ธ ์์คํ NPM ๋ฐฐํฌ ๋ณด์ผ๋ฌ ํ๋ ์ดํธ
- UI Kits, Design System ๊ตฌ์ถํด์ NPM์ผ๋ก ์คํ์์ค ๋ฐฐํฌ์ ์ต์ ํ (TypeScript + Storybook ์ง์)
- ์นํฉ ๊ฐ๋ฐ ์๋ฒ, ๋ถ ํ์ํ ์นํฉ, ๋ก๋ ๋ชจ๋ ์ ๊ฑฐ ํ ๊ฒฝ๋ํ
- ๋ชจ๋  ์ปดํฌ๋ํธ UI ํ์คํธ๋ ์นํฉ ๊ฐ๋ฐ ์๋ฒ๋ฅผ ๋์ฐ์ง ์๊ณ  ์คํ ๋ฆฌ๋ถ ์์ฒด ๊ฐ๋ฐ ์๋ฒ๋ฅผ ์ด์ฉ (ํ๋จ ๋ด์ฉ ์ฐธ๊ณ )

<br />

### ์คํ ๋ฆฌ๋ถ ๊นํ๋ธ ํ์ด์ง
- https://ssi02014.github.io/react-npm-deploy-boilerplate/

<br />

### ์์กด์ฑ ์ค์น
```
yarn
๋๋
```

<br />

### package.json ์์ 
- ํด๋น ๋ณด์ผ๋ฌ ํ๋ ์ดํธ๋ฅผ cloneํด์ ์ฌ์ฉํ๋ค๋ฉด package.json ์์ ์ด ํ์ํจ
- name, version, description, repo/url, author ... ๋ฑ ์์  ํ์
```json
{
  "name": "react-npm-deploy-boilerplate",
  "version": "1.0.0",
  "description": "react-npm-deploy-boilerplate",
  "scripts": {
    // ...
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ssi02014/react-npm-deploy-boilerplate.git"
  },
  "author": "Gromit",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/ssi02014/react-npm-deploy-boilerplate.git/issues"
  },
  "homepage": "https://github.com/ssi02014/react-npm-deploy-boilerplate.git/blob/master/README.md",
  // ...
}

```

<br />

### development
- srcํด๋์์ ์ปดํฌ๋ํธ ์์ ํ `src/index.tsx`์์ export

```js
// src/components/Button/Button.tsx
import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  size?: 'medium' | 'large';
}

const Button = ({ children, size = 'medium' }: Props) => {
  return <StyledButton size={size}>{children}</StyledButton>;
};

// styled ์ฝ๋

export default Button
```
```js
// src/index.tsx
export { default as Button } from './components/Button/Button';
```

<br />

### build
- ์ปดํฌ๋ํธ ์์ ํ build
- build ํ์ผ๋ค์ `dist` ํด๋์ ์์ฑ
```
yarn build
```

<br />

### deploy
- ์ฃผ์ 1. deployํ๊ธฐ ์ ์ package.json version ์๋ฐ์ดํธ ํด์ค์ผ ํจ
- ์ฃผ์ 2. deployํ๊ธฐ ์ ์ ๊ผญ build ์งํํด์ผ ๋ dist ํด๋๊ฐ npm์ ์ฌ๋ผ๊ฐ
```
npm publish
``` 

<br />

### ๋ฐฐํฌ๋ ์ปดํฌ๋ํธ ํ์ฉ
```
yarn add (๋ณธ์ธ ๋ฐฐํฌ ์ ์ฅ์)
```
```jsx
import { Button } from 'react-npm-deploy-boilerplate';

function App() {
  return (
    <div>
      <Button>ํ์ด</Button>
      <Button size="large">๋ฐ์ด</Button>
    </div>
  )
}

export default App;
```

<br />

### storybook
- storybook์ ํตํด์ ui ํ์คํธ ๊ฐ๋ฅ
- Example ์ฝ๋๋ src/stories ์์ ํ์ธ ๊ฐ๋ฅ
```
์คํ ๋ฆฌ๋ถ ์คํ
yarn storybook
```
```jsx
// src/stories/components/Button.stories.tsx
import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Button from 'src/components/Button/Button';

export default {
  title: 'components/Button',
  argTypes: {
    size: {
      options: ['medium', 'large'],
      control: { type: 'select' },
    },
  },
};

interface Props {
  size: 'medium' | 'large';
  select: any[];
}

const Template: Story<Props> = ({ size }: Props) => {
  return (
    <div>
      <Button size={size}>์๋</Button>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  size: 'medium',
};

```

<br />

