"use client"
import { Song } from "@/types"
import {TbPlaylist} from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import MediaItem from "./MediaItem";

interface LibraryProps {
  songs : Song[]
}
const Libary: React.FC<LibraryProps> = ({
  songs
}) => {

  const authModal = useAuthModal();

  const uploadModal = useUploadModal()

  const { user } = useUser()

  const onClick = () => {
    if (!user) {
      return authModal.onOpen()
    }

    return uploadModal.onOpen();
  };
    return (
    <div className="flex flex-col">
        <div className="justify-between flex items-center  px-5 pt-4">
            <div className="inline-flex items-center gap-x-2">
                <TbPlaylist size={19} className="text-netural-900"/>
                <p className="text-netural-900 hover:text-white">
                    Your Libary
                </p>
                <Button onClick={onClick} className="bg-neutral-600 rounded-s-full rounded-e-full hover:bg-neutral-400 " > <AiOutlinePlus/></Button>
            </div>   
           
        </div>
        <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((item) => (
          <MediaItem onClick={() => {}} key={item.id} data={item}/>
        ))}
        </div>
        
    </div>
    
  )
}

export default Libary