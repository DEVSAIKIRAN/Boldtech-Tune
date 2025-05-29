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
    const [mockCurrentTime, setMockCurrentTime] = useState(0);
    const [mockDuration, setMockDuration] = useState(0);
    const [mockPlayingSongId, setMockPlayingSongId] = useState<string | null>(null);

    // Simulate song playing and time updating
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (mockPlayingSongId && mockCurrentTime < mockDuration) {
            interval = setInterval(() => {
                setMockCurrentTime(prev => Math.min(prev + 1, mockDuration));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [mockPlayingSongId, mockCurrentTime, mockDuration]);

    // Simulate setting song duration when a song is "played"
    // In a real app, useOnPlay would update a global player state
    const handleMediaItemClick = (id: string, songDuration: number) => {
        setMockPlayingSongId(id);
        setMockDuration(songDuration);
        setMockCurrentTime(0); // Reset time when a new song starts
        onPlay(id); // Call the actual onPlay from your hook
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    // --- END MOCKING ---

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
                        <MediaItem onClick={(id: string) => handleMediaItemClick(id, 240 /* Example duration: 4 minutes */)} data={song} />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}

            {/* --- SLIDER SECTION (STILL NOT RECOMMENDED TO BE HERE IN A REAL APP) --- */}
            {mockPlayingSongId && mockDuration > 0 && (
                <div className="flex items-center gap-x-2 w-full mt-4 p-2 bg-neutral-800 rounded-md">
                    <p className="text-neutral-400 text-xs">{formatTime(mockCurrentTime)}</p>
                    <input
                        type="range"
                        min={0}
                        max={mockDuration}
                        value={mockCurrentTime}
                        onChange={(e) => setMockCurrentTime(parseFloat(e.target.value))} // Only updates mock, not actual audio
                        className="flex-1 h-1 bg-neutral-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <p className="text-neutral-400 text-xs">{formatTime(mockDuration)}</p>
                </div>
            )}
            {/* --- END SLIDER SECTION --- */}
        </div>
    );
};

export default SearchContent;