'use client';
import classNames from 'classnames/bind';
import style from './joinPopup.module.scss';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '../button';
import IconClose from '../icons/ic-close';
import { useMember } from '@/utils/hooks/API';

const cx = classNames.bind(style);

const JoinPopup = () => {
  const { data: isMember, error, isLoading } = useMember();
  const [isClose, setIsClose] = useState(true);

  useEffect(() => {
    if (!isMember) return;
    setIsClose(!!isMember?.id);
  }, [isMember]);

  useEffect(() => {}, [isClose]);
  const handleClose = () => setIsClose(true);
  if (isLoading) return null;
  return isClose ? null : (
    <div className={cx('join-popup')}>
      <div className={cx('button-wrap')}>
        <Button className={cx('close-button')} onClick={handleClose}>
          <IconClose className={cx('icon')} />
        </Button>
      </div>

      <Link className={cx('join')} href="/api/auth/login">
        <div className={cx('join-content')}>로그인/회원가입</div>
      </Link>
    </div>
  );
};

export default JoinPopup;
