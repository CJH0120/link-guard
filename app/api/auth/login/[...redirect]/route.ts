import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import { insertMember, isMember } from '@/utils/auth/member';
import { BASE_URL } from '@/config';

interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: string;
  id_token?: string;
  error?: string;
  error_description?: string;
}

const GOOGLE_REDIRECT_URI = `${BASE_URL}/api/auth/login/redirect`;
const JWT_EXPIRES_IN = '1h';
const JWT_REFRESH_EXPIRES_IN = '30d';
const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return NextResponse.redirect(new URL('/', BASE_URL));
    }

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });
    const data: TokenResponse = await response.json();

    if (data.error) {
      console.error('Token Response Error:', data.error_description);
      return NextResponse.json({ error: data.error_description }, { status: 400 });
    }

    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });
    const userInfo: { sub: string; name: string; email: string } = await userInfoResponse.json();

    const member = await isMember({ google_id: userInfo.sub });
    if (!member) {
      await insertMember({
        google_id: userInfo.sub,
        name: userInfo.name,
        email: userInfo.email,
      });
    }

    const accessToken = jwt.sign({ access_token: userInfo.sub }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    const refreshToken = jwt.sign({ refresh_token: userInfo.sub }, JWT_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRES_IN,
    });

    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      `access_token=${accessToken}; HttpOnly; Max-Age=3600; Path=/; ${
        process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
      }SameSite=Lax`
    );
    headers.append(
      'Set-Cookie',
      `refresh_token=${refreshToken}; HttpOnly; Max-Age=2592000; Path=/; ${
        process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
      }SameSite=Lax`
    );

    const redirectUrl = `${BASE_URL}/${userInfo.sub}`;
    return NextResponse.redirect(redirectUrl, { headers });
  } catch (error) {
    console.error('Unexpected Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
