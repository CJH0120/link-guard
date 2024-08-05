'use client';

import Modal from '@/components/modal';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import style from './memberEdit.module.scss';
import Button from '@/components/button';
import { useFormStatus } from 'react-dom';
import { Member } from '@/interface/api';

const cx = classNames.bind(style);

const MemberEdit = ({
  id,
  email,
  google_id,
  name,
  nickname: prevNickname,
  isClose,
}: Member.info & { isClose?: () => void }) => {
  const router = useRouter();
  const [nickname, setNickname] = useState<string>(prevNickname ?? '');

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('id', String(google_id));
      formData.append('nickname', nickname);
      const response = await fetch(`/api/auth/member/${google_id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.error);
      }

      router.refresh();
      if (isClose) isClose();
    } catch (error) {
      alert(error);
    } finally {
    }
  };
  return (
    <Modal className={cx('modal-content')}>
      <form action={onSubmit}>
        <div className={cx('modal-section')}>
          <div className={cx('section-wrap')}>
            <h2 className={cx('h2')}>사용하실 활동명 입력해주세요</h2>
            <p>상시 변경 가능합니다 (최대10글자)</p>
          </div>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={10}
            className={cx('input')}
            type="text"
            placeholder="닉네임"
          />
        </div>
        <Submit />
      </form>
    </Modal>
  );
};

export default MemberEdit;

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className={cx('button')} disabled={pending}>
      확인
    </Button>
  );
};
