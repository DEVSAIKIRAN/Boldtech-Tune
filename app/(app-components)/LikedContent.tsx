"use client";

import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";

interface LikedContentProps {
    songs: Song[]
}

const LikedContent: React.FC<LikedContentProps> = ({
    songs
}) => {
    const router = useRouter();
    const {isLoading, user} = useUser();

    useEffect(() => {
        if (!isLoading && !user){
            router.replace('/')
        }
    },[isLoading, user, router])

    if (songs.length === 0){
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-netural-400">No liked Songs</div>
        )
    }
  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
        {songs.map((song) => (
            <div className="flex items-center gap-x-4 w-full" key={song.id}>
                <div className="flex-1">
                    <MediaItem data={song} onClick={() => {}}/>
                </div>
                <LikeButton songId={song.id} />
            </div>
        ))}
    </div>
  )
}

export default LikedContent