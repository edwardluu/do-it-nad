import { createClient } from "./client";
import { encodedString} from '@/lib/utils';

export const getLeaderBoard = async () => {
  // fetch users from Users table
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("users")
      .select()
      .order("point", { ascending: false })
      .limit(50);
    if (error) throw error;
    return (data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUser = async (address: string) => {
  if(!address) return;
  // fetch users from Users table
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("user_id", encodedString(address))
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      const { data, error } = await supabase
        .from("users")
        .upsert({ user_id: encodedString(address), point: 0 })
        .select();
      if (error) throw error;
      return data;
    }
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const updatePoint = async (address: string, point: number) => {
  // update point user
  try {
    const supabase = await createClient();
    const addressEncode = encodedString(address)
    await supabase
      .from("users")
      .update({ point: point })
      .eq("user_id", addressEncode);

  } catch (error) {
    console.log(error);
    return [];
  }
};
