"use client";
import { FaPlay } from "react-icons/fa"
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({
  image,
  name,
  href,
}) => {

  const router = useRouter()

  const onClick = () => {

    router.push(href)
  }

  return (
    <button className="relative group flex items-center rounded-2xl overflow-hidden gap-x-4 bg-netural-100/10 hover:bg-neutral-100/20 transtion pr-4 border border-netural-100/20 justify-between " onClick={onClick}>
      <div className="flex gap-x-2"> 
      <div className="relative min-h-[64px] min-w-[64px] " >
        <Image src={image} alt="liked" fill className="object-cover"/>
      </div>
    <p className="font-medium truncate py-5">{name}</p>
    </div>
      <div className="absoulte transition opacity-0 rounded-full flex items-center bg-sky-400 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <FaPlay className="text-black"/>
      </div>
    </button>
  )
}

export default ListItem