# 💻 리액트 디자인 시스템 NPM 배포 보일러 플레이트
- UI Kits, Design System 구축을 위한 NPM으로 오픈소스 배포에 최적화 보일러 플레이트
- `2023년 6월 기준` 최신 버전으로 구축되어 있습니다.
- 웹팩 개발 서버, 불 필요한 플러그인, 로더 등 모두 제거 후 경량화
- 모든 컴포넌트 UI 테스트는 웹팩 개발 서버를 띄우지 않고, `Storybook`을 이용 (하단 내용 참고)

<br />

## 📗 구성
- React v18
- Babel을 이용한 트랜스파일링
- Rollup을 이용한 번들링
- TypeScript v5
- styled-components
- Storybook v7

<br />

### 스토리북 깃허브 페이지
- https://ssi02014.github.io/react-npm-deploy-boilerplate/

<br />

### 의존성 설치
- 해당 레포는 `yarn 패키지 매니저`로 구성했기 때문에 특정 이슈가 없다면 yarn을 이용해 의존성 설치를 권장
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
  "name": "react-npm-deploy-boilerplate", // (*)
  "version": "1.0.0", // (*)
  "description": "react-npm-deploy-boilerplate", // (*)
  "scripts": {
    // ...
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ssi02014/react-npm-deploy-boilerplate.git" // (*)
  },
  "author": "Gromit", // (*)
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/ssi02014/react-npm-deploy-boilerplate.git/issues" // (*)
  },
  "homepage": "https://github.com/ssi02014/react-dev-env-boilarplate", // (*)
  // ...
}

```

<br />

## 컴포넌트 개발
- `src/components`에서 컴포넌트 작업 

<br />

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
<br />

- `src/stories/components`에서 `{Component}.stories.tsx` 형태로 파일 생성 후 스토리북으로 UI 테스트 진행
- 스토리북에서 UI 테스트 진행 후 `src/index.tsx`에서 export

<br />

```jsx
export { default as theme } from '@shared/theme';
export { default as Button } from '@components/Button';
```

<br />

## 빌드와 배포
- 컴포넌트 작업 후 아래 명령어를 통해 배포를 위한 build 진행
```
yarn build
```
- build를 진행하면 정상적으로 `dist` 폴더가 생성되어야 한다. 실질적으로 해당 폴더를 npm에 배포하게 된다.

<br />

- 사실 현재 저장소는 `github actions`을 통해 자동 빌드 및 npm 배포를 진행한다. 또한, 스토리북 페이지도 자동 빌드 후에 github page로 배포를 진행한다.
- 위 과정은 `master` 브랜치로만 커밋이 올라가면 이를 트리거 삼아 자동으로 진행된다.
- 배포 전에 package.json `version` 업데이트 해주는 것을 꼭! 잊지말자.

<br />

### npm deploy 후 라이브러리 설치 및 사용법
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
- storybook을 통해서 ui 테스트가 가능하다.
- 아래 명령어를 터미널로 입력을 통해 스토리북 서버를 실행할 수 있다.
```
yarn storybook
```

<br />

- 아래와 같은 예제 코드를 기반으로 스토리북 코드 작성
```jsx
// src/stories/components/Button.stories.tsx
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

// ...
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