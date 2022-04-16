import { useRecoilValue } from 'recoil';
import { cogreactConfigAtom } from '../recoil/atoms';

export const useCogreactConfig = () => {
  const cogreactConfig = useRecoilValue(cogreactConfigAtom);

  return cogreactConfig;
};
