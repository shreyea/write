import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { action, targetUserId } = body || {};
  if (!action || !targetUserId) return NextResponse.json({ error: 'missing parameters' }, { status: 400 });

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'not authenticated' }, { status: 401 });

  try {
    if (action === 'follow') {
      const { error } = await supabase.from('follows').insert({ follower_id: user.id, following_id: targetUserId });
      if (error) throw error;
    } else if (action === 'unfollow') {
      await supabase.from('follows').delete().eq('follower_id', user.id).eq('following_id', targetUserId);
    } else {
      return NextResponse.json({ error: 'invalid action' }, { status: 400 });
    }

    revalidatePath('/feed');
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
