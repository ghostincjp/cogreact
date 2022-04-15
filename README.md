# Cogreact

## Installation

```sh
npm i cogreact
# OR
yarn add cogreact
```

## Dependencies

* Recoil@^0.7
* React Router@^6
* aws-amplify@^4

## Prerequisite

### Cognito

Create user pool and identity pool then get the `identityPoolId`, `userPoolId`, and `userPoolClientId`.

### Environment

```bash
touch .env
# Set envs
# REGION=
# IDENTITY_POOL_ID=
# USER_POOL_ID=
# USER_POOL_WEB_CLIENT_ID=
```

## Usage

```tsx
import { useSignUp } from 'cogreact';

export function App() {
  return (
    <RecoilRoot>
      <CogreactWrapper>
        <YourComponent>
      </CogreactWrapper>
    </RecoilRoot>
  );
}

const YourComponent = () => {
  const { signUp, loading, error } = useSignUp()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    signUp({ email, password, attributes: { name: name } });
  };

  return (
    <div>
      <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <button onClick={handleClick}>Sign Up</button>
    </div>
  );
}
```

## Try

Try it out on storybook.

```bash
npm run stroybook
```
