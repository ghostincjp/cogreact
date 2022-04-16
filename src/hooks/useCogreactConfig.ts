import { useRecoilValue } from 'recoil';
import { cogreactOptionsAtom } from '../recoil/atoms';

export const useCogreactConfig = () => {
  const cogreactConfig = useRecoilValue(cogreactOptionsAtom);

  return cogreactConfig;
};
