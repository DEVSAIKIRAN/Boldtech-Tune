import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

/**
 * Fetches a list of songs from the Supabase database.
 * This function is designed to run on the server as it accesses cookies
 * to create the Supabase client.
 *
 * @returns {Promise<Song[]>} A promise that resolves to an array of Song objects,
 * or an empty array if an error occurs or no data is found.
 */
const getSongs = async (): Promise<Song[]> => {
  try {
    // Create a Supabase client specifically for server components.
    // It uses the 'cookies' function from 'next/headers' to handle authentication.
    const supabase = createServerComponentClient({
      cookies: cookies,
    });

    // Fetch songs from the 'songs' table, ordered by 'created_at' in descending order.
    const { data, error } = await supabase
      .from("songs")
      .select("*")
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

export default getSongs;
