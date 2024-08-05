import useSWR from 'swr';
import fetcher from '../fetcher';
import { Member } from '@/interface/api';
//

export const useMember = () => {
  const { data, error, isLoading } = useSWR<Member.info>('/api/auth/verify', fetcher);
  return { data, error, isLoading };
};
