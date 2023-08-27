import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {type NextRequest, NextResponse} from 'next/server';

export const GET = async ({url}: NextRequest) => {
  const requestURL = new URL(url);

  try {
    const code = String(requestURL.searchParams.get('code'));
    const {auth} = createRouteHandlerClient({cookies});
    await auth.exchangeCodeForSession(code);
    return NextResponse.redirect('http://localhost:3000/dashboard');
  } catch (error) {
    return NextResponse.redirect(`http://localhost:3000//login?error=${error.message}`);
  }
};
