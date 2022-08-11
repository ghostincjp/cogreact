# Cogreact

## Installation

```sh
npm i cogreact recoil react-router-dom
# OR
yarn add cogreact recoil react-router-dom
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

const region = process.env.REGION;
const identityPoolId = process.env.IDENTITY_POOL_ID;
const userPoolId = process.env.USER_POOL_ID;
const userPoolWebClientId = process.env.USER_POOL_WEB_CLIENT_ID;

if (!region || !identityPoolId || !userPoolId || !userPoolWebClientId) {
  throw new Error('Please set environment variables.');
}

export function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Cogreact
          AuthConfig={{
            region,
            identityPoolId,
            userPoolId,
            userPoolWebClientId,
          }}
        >
          <YourComponent>
        </Cogreact>
      </RecoilRoot>
    </BrowserRouter>
  );
}

const YourComponent = () => {
  const { signUp, loading, error } = useSignUp()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

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
      <input type="text" placeholder="text" value={name} onChange={(e) => setName(e.currentTarget.value)} />
      <button onClick={handleClick}>Sign Up</button>
    </div>
  );
}
```

### Use with utility routes

```tsx
import { PrivateRoute, LoginRoute, CompleteNewPasswordRoute } from 'cogreact';

export function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <CogreactWrapper>
          <Routes>
            {/* Private routes is here. */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<>Index</>} />
              <Route path="private1" element={<>Private 1</>} />
              <Route path="private2" element={<>Private 2</>} />
            </Route>

            {/* Sign in routes is here. */}
            <Route element={<SignInRoute />}>
              <Route path="login" element={<>Login</>} />
            </Route>

            {/* Complete new password routes is here. */}
            <Route element={<CompleteNewPasswordRoute />}>
              <Route path="complete-new-password" element={<>Complete New Password</>} />
            </Route>
          </Routes>
        </CogreactWrapper>
      </BrowserRouter>
    </RecoilRoot>
  );
}
```

## Try

Try it out on storybook.

```bash
npm run stroybook
```

## Cogreact Settings

```ts
type CogreactConfig = {
  children: React.ReactNode;
  AuthConfig: {
    region: string;
    identityPoolId: string;
    userPoolId: string;
    userPoolWebClientId: string;
  };
  S3Config?: {
    bucket: string;
    region: string;
  };
} & Partial<CogreactOptions>;

export type CogreactOptions = {
  loadingComponent: React.ReactElement<any, any> | null;
  signInPath: string;
  completeNewPasswordPath: string;
  verifyEmailPath: string;
  redirectToPreviousPath: boolean;
  defaultSignInSucceededPath: string;
};
```
