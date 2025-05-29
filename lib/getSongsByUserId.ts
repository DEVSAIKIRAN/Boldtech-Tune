import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

/**
 * Fetches a list of songs belonging to the currently authenticated user from the Supabase database.
 * This function is designed to run on the server as it accesses cookies
 * to create the Supabase client and retrieve the user session.
 *
 * @returns {Promise<Song[]>} A promise that resolves to an array of Song objects,
 * or an empty array if an error occurs, no session is found, or no data is found.
 */
const getSongsByUserId = async (): Promise<Song[]> => {
  try {
    // Create a Supabase client specifically for server components.
    // It uses the 'cookies' function from 'next/headers' to handle authentication.
    const supabase = createServerComponentClient({
      cookies: cookies,
    });

    // Get the current user session.
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    // If there's an error getting the session, log it and return an empty array.
    if (sessionError) {
      console.error("Error getting user session:", sessionError.message);
      return [];
    }

    // Check if a session and user ID exist.
    if (!sessionData.session?.user?.id) {
      console.warn("No user session found. Returning empty song list.");
      return [];
    }

    // Fetch songs from the 'songs' table where 'user_id' matches the current user's ID.
    // Order the results by 'created_at' in descending order.
    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .eq("user_id", sessionData.session?.user.id)
      .order("created_at", { ascending: false });

    // If there's an error fetching songs, log it and return an empty array.
    if (error) {
      console.log("Error fetching songs by user ID:", error.message);
      return [];
    }

    // Return the fetched data, casting it to Song[] type.
    // If data is null, return an empty array.
    return (data as Song[]) || [];
  } catch (err) {
    // Catch any unexpected errors during the function execution.
    console.log("An unexpected error occurred in getSongsByUserId:", err);
    return [];
  }
};

export default getSongsByUserId;
