import { createSupabaseServerClient } from "./supabase/server";

export async function getFeed() {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("posts")
    .select(`
      id,
      content,
      created_at,
      profiles ( username ),
      likes ( user_id ),
      comments (
        id,
        content,
        profiles ( username )
      )
    `)
    .order("created_at", { ascending: false });

  return data;
}
