import React from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { PrivateRoute } from '../components/PrivateRoute';
import { SignInRoute } from '../components/SignInRoute';
import { authStateAtom } from '../recoil/atoms';
import { CogreactWrapper } from './CogreactWrapper';
import { CompleteNewPassword } from './CompleteNewPassword.stories';

type Props = {};

export const RoutesExample: React.VFC<Props> = ({}) => {
  return (
    <BrowserRouter>
      <CogreactWrapper>
        <RoutesExamplePage />
      </CogreactWrapper>
    </BrowserRouter>
  );
};

const RoutesExamplePage = () => {
  const authState = useRecoilValue(authStateAtom);
  const location = useLocation();

  return (
    <>
      <h1>Routes</h1>
      <p>AuthStatus: {authState.authStatus}</p>
      <p>Pathname: {location.pathname}</p>
      <p>Location State: {(location.state as { from?: string })?.from as string}</p>

      <ul>
        <li>
          <Link to="/">Index</Link>
        </li>
        <li>
          <Link to="private1">Private 1</Link>
        </li>
        <li>
          <Link to="private2">Private 2</Link>
        </li>
        <li>
          <Link to="login">Login</Link>
        </li>
        <li>
          <Link to="login">Complete New Password</Link>
        </li>
      </ul>

      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<>Index</>} />
          <Route path="private1" element={<>Private 1</>} />
          <Route path="private2" element={<>Private 2</>} />
        </Route>

        <Route element={<SignInRoute />}>
          <Route path="login" element={<>Login</>} />
        </Route>

        <Route element={<CompleteNewPassword />}>
          <Route path="complete-new-password" element={<>Complete New Password</>} />
        </Route>
      </Routes>
    </>
  );
};

export default {
  title: 'RoutesExample',
  component: RoutesExample,
};
