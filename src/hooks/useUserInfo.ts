import { useRecoilValue } from 'recoil';
import { authStateAtom } from '../recoil/atoms';

export const useUserInfo = () => {
  const { email, preferred_username, family_name, given_name, name, roles } = useRecoilValue(authStateAtom);

  return { email, preferredUsername: preferred_username, familyName: family_name, givenName: given_name, name, roles };
};
