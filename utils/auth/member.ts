import { Member } from '@/interface/api';
import { executeQuery } from '@/lib/db';

interface member {
  google_id: string;
  name: string;
  email: string;
}

export const isMember = async ({ google_id }: { google_id: string }) => {
  try {
    const member = await executeQuery<Member.info>('SELECT * FROM member WHERE google_id  = ?', [google_id]);
    return member[0];
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const insertMember = async ({ google_id, name, email }: member) => {
  try {
    await executeQuery(
      `INSERT INTO member
			(google_id, name, email)
			VALUES (?, ?, ?)`,
      [google_id, name, email]
    );
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};
