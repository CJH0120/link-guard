'use server';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { isMember } from '@/utils/auth/member';
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = '1h';
const JWT_REFRESH_EXPIRES_IN = '30d';

const setCookieHeader = (name: string, value: string, maxAge: number): string => {
  return `${name}=${value}; HttpOnly; Max-Age=${maxAge}; Path=/; ${
    process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
  }SameSite=Lax`;
};

export interface JwtPayload {
  access_token?: string;
  refresh_token?: string;
  google_id?: string;
}

import { cookies } from 'next/headers';

export const useVerify = async () => {
  const cookieStore = cookies();
  const headers = new Headers();
  const accessToken = cookieStore.get('access_token')?.value ?? '';
  const refreshToken = cookieStore.get('refresh_token')?.value ?? '';
  if (!accessToken && !refreshToken) {
    return NextResponse.json([]);
  }
  try {
    if (accessToken) {
      const { access_token } = jwt.verify(accessToken, JWT_SECRET) as JwtPayload;
      const member = await isMember({ google_id: access_token as string });
      return NextResponse.json({ ...member }, { headers });
    }
  } catch (error: any) {}

  try {
    if (refreshToken) {
      const { refresh_token } = jwt.verify(refreshToken, JWT_SECRET) as JwtPayload;
      const member = await isMember({ google_id: refresh_token as string });
      if (!member) {
        return NextResponse.json([]);
      }

      const newAccessToken = jwt.sign({ access_token: member.google_id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      const newRefreshToken = jwt.sign({ refresh_token: member.google_id }, JWT_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRES_IN,
      });

      headers.append('Set-Cookie', setCookieHeader('access_token', newAccessToken, 3600));
      headers.append('Set-Cookie', setCookieHeader('refresh_token', newRefreshToken, 2592000));

      return NextResponse.json({ ...member }, { headers });
    }
  } catch (error: any) {
    headers.append('Set-Cookie', setCookieHeader('access_token', '', 0));
    headers.append('Set-Cookie', setCookieHeader('refresh_token', '', 0));
    return NextResponse.json([]);
  }
};
