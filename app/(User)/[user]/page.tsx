/* eslint-disable react-hooks/rules-of-hooks */
import { Link, Member } from '@/interface/api';
import classNames from 'classnames/bind';
import style from './page.module.scss';
import Button from '@/components/button';
import { IconMenu } from '@/components/icons/ic-menu';
import UrlBox from '@/components/urlBox';
import { BASE_URL } from '@/config';
import { useVerify } from '@/utils/auth/verify';
import UserInfo from '@/components/useInfo';
import MemberEdit from './edit/memberEdit';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type MemberProps = { member: Member.info; data: Link.info[] };
type Combine = MemberProps & { owner: boolean };
const cx = classNames.bind(style);
const getMemberData = async (userId: string): Promise<Combine> => {
  const memberData: MemberProps = await fetch(`${BASE_URL}/api/auth/member/${userId}`, { cache: 'force-cache' }).then(
    (res) => res.json()
  );
  const response = await useVerify();

  if (!response) {
    return { ...memberData, owner: false };
  }

  const userData: Member.info = await response.json();
  return { ...memberData, owner: userId === userData.google_id };
};

const UserPage = async ({ params }: { params: { user: string } }) => {
  const userId = params.user;
  const pageData = await getMemberData(userId);
  const { data, member, owner } = pageData;

  if (!member?.id) {
    return notFound();
  }
  if (!member?.nickname && owner) {
    return <MemberEdit {...member} key={member.id} />;
  }

  return (
    <div className={cx('user_page')}>
      <div className={cx('page-container')}>
        <div className={cx('header_wrap')}>
          <div />
          <h1 className={cx('member')}>Link Guard</h1>
          <Button className={cx('button-wrap')}>
            <IconMenu className={cx('icon')} />
          </Button>
        </div>
        <UserInfo owner={owner} {...member} />
        <div className={cx('content-container')}>
          {data?.map((link) => (
            <UrlBox {...link} key={link.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
