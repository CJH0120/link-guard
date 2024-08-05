import classNames from 'classnames/bind';
import styles from './layout.module.scss';
import JoinPopup from '@/components/joinPopup';
import { Noto_Sans_KR } from 'next/font/google';

import dynamic from 'next/dynamic';

const Join = dynamic(() => import('@/components/joinPopup'), { ssr: false });
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

const font = Noto_Sans_KR({ subsets: ['latin'] });

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const cx = classNames.bind(styles);
  return (
    <main className={cx('layout', font.className)}>
      <div className={cx('container')}>{children}</div>
      <Join />
    </main>
  );
}
