import { Member } from '@/interface/api';
import { executeQuery } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { useVerify } from '@/utils/auth/verify';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  try {
    const [member] = await executeQuery<Member.info>(
      `
			SELECT  *
			FROM member
			WHERE google_id = ?
			`,
      [id]
    );

    if (!member) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    } else {
      const data = await executeQuery<{ google_id: string }>(
        `
				SELECT lc.*
				FROM link_collection lc
				WHERE lc.member_id = ?
				`,
        [member.id]
      );
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return NextResponse.json({ member, data });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    // return NextResponse.json({ error: "서버 오류" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  const formData = await request.formData();

  const cookieStore = cookies();
  const headers = new Headers();
  try {
    const accessToken = cookieStore.get('access_token')?.value ?? '';
    const res_refreshToken = cookieStore.get('refresh_token')?.value ?? '';

    const { access_token } = jwt.verify(accessToken, process.env.JWT_SECRET || '') as any;

    if (access_token !== id) {
      throw new Error('access_token is not valid');
    }
  } catch {}
  return NextResponse.json({ status: 'updated' });
}

export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();
  revalidatePath(`/${id}`);
  return NextResponse.json({ status: 'updated' });
}

export async function PUT(request: Request) {
  const formData = await request.formData();
  const id = formData.get('id');
  const nickname = formData.get('nickname');

  const response = await useVerify();

  if (!response) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { google_id } = (await response.json()) as Member.info;

  if (google_id !== id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await executeQuery(`UPDATE member SET nickname = ? WHERE google_id = ?`, [nickname, id]);
    revalidatePath(`/${id}`);
    return NextResponse.json({ status: 'updated' });
  } catch (error) {
    return NextResponse.json({ error: '잠시후에 다시 시도 해주세요' }, { status: 500 });
  }
}
