import { NextRequest, NextResponse } from 'next/server';
import { useVerify } from '@/utils/auth/verify';

export async function GET(request: NextRequest) {
  return useVerify();
}
