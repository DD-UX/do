import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';
import {cookies} from 'next/headers';
import {type NextRequest, NextResponse} from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async ({url}: NextRequest) => {
  const requestURL = new URL(url);

  try {
    const code = String(requestURL.searchParams.get('code'));
    const {auth} = createRouteHandlerClient({cookies});
    await auth.exchangeCodeForSession(code);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN}/tasks`);
  } catch (error) {
    // Error must be any or unknown, clause
    const message = (error as PostgrestError)?.message || 'Unknown error';
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_DOMAIN}/login?error=${message}`);
  }
};
