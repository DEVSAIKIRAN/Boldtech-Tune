import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";
const getSongsByTitle = async (title: string): Promise<Song[]> => {
  try {
    // Create a Supabase client specifically for server components.
    // It uses the 'cookies' function from 'next/headers' to handle authentication.
    const supabase = createServerComponentClient({
      cookies: cookies,
    });

    if(!title) {
      const allSongs = await getSongs()
      return allSongs
    }

    // Fetch songs from the 'songs' table, ordered by 'created_at' in descending order.
    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .ilike('title', `%${title}%`)
      .order("created_at", { ascending: false });

    // Log any errors that occur during the Supabase query.
    if (error) {
      console.log("Error fetching songs:", error);
      // Return an empty array on error to prevent issues downstream.
      return [];
    }

    // Return the fetched data, casting it to Song[] type.
    // If data is null, return an empty array.
    return (data as Song[]) || [];
  } catch (err) {
    // Catch any unexpected errors during the function execution.
    console.error("An unexpected error occurred in getSongs:", err);
    return [];
  }
};

export default getSongsByTitle;
