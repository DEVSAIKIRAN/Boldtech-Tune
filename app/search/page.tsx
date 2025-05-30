// app/search/page.tsx
// This file is a Server Component by default in Next.js App Router,
// so no 'use client' directive is needed at the top unless you specifically
// add client-side interactivity within this root component.
// For data fetching, it should remain a Server Component.

import getSongsByTitle from "@/lib/getSongsByTitle";
import SearchInput from "../(app-components)/SearchInput";
import SearchContent from "../(app-components)/SearchContent";
import Player from "../(app-components)/Player"; // Assuming Player is meant to be rendered here

export const revalidate = 0; // Ensures data is always fresh, no caching for this page

// Define the precise type for the props that Next.js will pass to this page component.
// 'searchParams' is a plain object containing URL query parameters.
// Its keys are strings, and its values can be a string, an array of strings, or undefined.
interface SearchPageProps {
  // 'searchParams' is the critical part for query parameters like ?title=some_song
  searchParams: {
    // Make 'title' optional as it might not always be present in the URL (e.g., just /search)
    title: string;
    // Add an index signature to handle any other unexpected query parameters
  };
}

// The main page component. In the App Router, page components are async by default
// and can directly fetch data on the server.
const SearchPage = async ({ searchParams }: SearchPageProps) => {
  // Extract the 'title' query parameter from the searchParams object.
  // It will be `undefined` if the 'title' parameter is not present in the URL.
  const title = searchParams.title;

  // Fetch songs based on the extracted title.
  // This function call happens on the server.
  const songs = await getSongsByTitle(title);

  // Conditional rendering: if no songs are found, display a message.
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  // Render the page content.
  return (
    <div className="rounded-lg h-full w-full overflow-hidden overflow-y-auto p-2">
      <div className="mb-2 flex flex-col gap-y-6">
        <h1 className="text-white text-3xl font-semibold">Search</h1>
        {/* SearchInput for user to type search queries */}
        <SearchInput />
      </div>
      {/* Displays the search results */}
      <SearchContent songs={songs} />
      {/*
        The Player component is rendered here.
        Note: In many Next.js music apps, the Player is a global component
        rendered in the root layout (app/layout.tsx) to persist across pages.
        If that's your intention, you might remove Player from here and
        ensure it's correctly placed in your layout.
      */}
      <Player />
    </div>
  );
};

export default SearchPage;