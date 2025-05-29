import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


const getLikedSongs = async (): Promise<Song[]> => {
  try {
    // Create a Supabase client specifically for server components.
    // It uses the 'cookies' function from 'next/headers' to handle authentication.
    const supabase = createServerComponentClient({
      cookies: cookies,
    });

    const {
      data:{
        session
      }
    } = await supabase.auth.getSession();
     

    const { data, error } = await supabase
      .from("liked_songs")
      .select("*, songs(*)")
      .eq('user_id', session?.user?.id)
      .order("created_at", { ascending: false });

    // Log any errors that occur during the Supabase query.
    if (error) {
      console.log("Error fetching songs:", error);
      // Return an empty array on error to prevent issues downstream.
      return [];
    }
    if (!data) {
      return []
    }

    // Return the fetched data, casting it to Song[] type.
    // If data is null, return an empty array.
    return data.map((item) => ({
      ...item.songs
    }))
  } catch (err) {
    // Catch any unexpected errors during the function execution.
    console.error("An unexpected error occurred in getSongs:", err);
    return [];
  }
};

export default getLikedSongs;
