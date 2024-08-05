'use client';
import classNames from 'classnames/bind';
import style from './useInfo.module.scss';
import { Member } from '@/interface/api';
import Button from '../button';
import IconEdit from '../icons/ic-edit';
import { useState } from 'react';
import MemberEdit from '@/app/(User)/[user]/edit/memberEdit';

const cx = classNames.bind(style);
const UserInfo = ({ email, google_id, id, name, nickname, owner }: Member.info & { owner: boolean }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleClose = () => {
    setIsEdit(false);
  };
  return (
    <div className={cx('user-info')}>
      <h1 className={cx('member-nickname')}>{nickname ?? google_id}</h1>
      {owner && (
        <Button className={cx('button')} onClick={handleEdit}>
          <IconEdit className={cx('icon')} />
        </Button>
      )}
      {isEdit && <MemberEdit isClose={handleClose} {...{ id, email, google_id, name, nickname }} key={id} />}
    </div>
  );
};

export default UserInfo;
