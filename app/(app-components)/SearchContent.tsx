'use client';

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import UseOnPlay from "@/hooks/useOnPlay";
// Assuming you have a way to get the currently playing song's data and progress
// This would typically come from a global player state (e.g., a Zustand store, Context API)
// For demonstration, we'll mock some values.
import { useState, useEffect } from 'react'; // Added useState and useEffect for a mock slider

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
    songs
}) => {
    const onPlay = UseOnPlay(songs);

    // --- MOCKING PLAYER STATE FOR DEMONSTRATION PURPOSES ONLY ---
    // In a real application, these would come from a global player context/hook

    // Simulate song playing and time updating
   


    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No Songs found.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((song) => (
                <div key={song.id} className="flex items-center gap-x-4 w-full">
                    <div className="flex-1">
                        {/* Modified onClick to pass a dummy duration for the mock */}
                        <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}

        
                </div>
    );
};

export default SearchContent;