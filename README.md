# 💻 리액트 디자인 시스템 NPM 배포 보일러 플레이트
**최근 업데이트 2023.03.19**
- UI Kits, Design System 구축을 위한 NPM으로 오픈소스 배포에 최적화 보일러 플레이트
- 웹팩 개발 서버, 불 필요한 웹팩, 로더 모두 제거 후 경량화
- 모든 컴포넌트 UI 테스트는 웹팩 개발 서버를 띄우지 않고, `스토리북 자체 개발 서버`를 이용 (하단 내용 참고)

<br />

## 📗 구성
- React v18
- Babel을 이용한 트랜스파일링
- Rollup을 이용한 번들링
- TypeScript
- styled-components
- Storybook 지원

<br />

### 스토리북 깃허브 페이지
- https://ssi02014.github.io/react-npm-deploy-boilerplate/

<br />

### 의존성 설치
- 해당 레포는 `yarn 패키지 매니저`로 구성했기 때문에 특정 이슈가 없다면 yarn을 이용해 의존성 설치를 권장 함
```
yarn
or
yarn install
```

<br />

### package.json 수정
- 해당 보일러 플레이트를 clone해서 사용한다면 package.json 수정이 필요함
- `name`, `version`, `description`, `repository/url`, `author`, `homepage` ... 등 수정 필요
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
  "homepage": "https://github.com/ssi02014/react-dev-env-boilarplate",
  // ...
}

```

<br />

### development
- `src/components`에서 컴포넌트 작업 후 `src/index.tsx`에서 export

```jsx
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
```

```js
// src/index.tsx
export { default as Button } from './components/Button/Button';
```

<br />

### build
- 컴포넌트 작업 후 build
- build 파일들은 `dist` 폴더에 생성
```
yarn build
```

<br />

### deploy
- 주의 1. deploy하기 전에 package.json `version` 업데이트 해줘야 함
- 주의 2. deploy하기 전에 꼭 build 진행해야 됌 dist 폴더가 npm에 올라감
```
npm publish
``` 

<br />

### 배포 된 컴포넌트 활용
```
yarn add (본인 배포 저장소)
```
```jsx
import { Button } from 'react-npm-deploy-boilerplate';

function App() {
  return (
    <div>
      <Button>하이</Button>
      <Button size="large">바이</Button>
    </div>
  )
}

export default App;
```

<br />

### storybook
- storybook을 통해서 ui 테스트 가능
- Example 코드는 src/stories 에서 확인 가능
```
스토리북 실행
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
      <Button size={size}>안녕</Button>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  size: 'medium',
};
```

<br />

### storybook github page 배포
- `build:storybook`으로 빌드 후에 `deploy:storybook`으로 github page로 배포
```
yarn build:storybook
```
```
yarn deploy:storybook
```

### rollup alias(절대 경로) 추가하는 방법
```json
// tsconfig.paths.json
{
  "compilerOptions": {
    "paths": {
      "@components/*": ["src/components/*"],
      "@shared/*": ["src/shared/*"],
      // 여기다 추가
    },
  }
}
```