import { createClient } from "./client";

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
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUser = async (address: string) => {
  // fetch users from Users table
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("address", address)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      const { data, error } = await supabase
        .from("users")
        .upsert({ address: address, point: 0 })
        .select();
      if (error) throw error;
      return data;
    }
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updatePoint = async (address: string, point: number) => {
  // update point user
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("users")
      .update({ point: point })
      .eq("address", address);
    if (error) return error;
  } catch (error) {
    console.log(error);
    return [];
  }
};
