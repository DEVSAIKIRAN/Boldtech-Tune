"use client"
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight} from "react-icons/rx";
import { HiHome, HiSearch } from "react-icons/hi"
import { Sidebar, SidebarTrigger } from "@/components/ui/sidebar";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import useUploadModal from "@/hooks/useUploadModal";
import { AiOutlinePlus } from "react-icons/ai";
interface HeaderProps {
    children: React.ReactNode;
    className?: string
}
const Header: React.FC<HeaderProps> = ({
    children,className
}) => {
      const authModal = useAuthModal();

  const uploadModal = useUploadModal()

  const onClick = () => {
    if (!user) {
      return authModal.onOpen()
    }

    return uploadModal.onOpen();
  };
    const router = useRouter();
    
    const supabaseClient = useSupabaseClient();

    const { user, userDetails} = useUser()

    const AuthModal = useAuthModal();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();

        router.refresh();

        if (error) {
            toast.error('error happened')
        }
        else{
            toast.success('Logged out!')
        }
    };

  return (
    <div suppressHydrationWarning>
    <div className={clsx(`h-fit flex gap-x-2 justify-between p-6`,className)}>
        
        <div className="flex gap-x-2">
        <div className="bg-black rounded-full flex items-center md:flex gap-x-2 " title="Menu" >
              {user?   <SidebarTrigger/> : <div></div>}
            </div>
        <div className="hidden md:flex gap-x-2 items-center " title="Back">
            <button className="bg-black rounded-full flex" onClick={() => router.forward()}> 
            <RxCaretLeft className="text-white "size={25}/>
            </button>
             <button className="bg-black rounded-full flex" title="ForWard">
            <RxCaretRight className="text-white "size={25} onClick={() => router.back()}/>
            </button>
        </div>
        <div className=" md:hidden gap-x-2 items-center ">
         {user? 
                 <button onClick={onClick} className=" rounded-s-full rounded-e-full  bg-black  flex items-center md:flex  p-4" > <AiOutlinePlus/></button>: <div></div>}</div>
        </div>
        <div className="flex justify-between items-center gap-x-4">
            {user ? (<> <div className="flex gap-x-4 items-center">
                <button className="bg-sky-500 px-6 py-2 rounded-full text-black font-bold" onClick={handleLogout}> 
            Log Out
            </button>
            <button className="bg-sky-500 px-3 py-3 rounded-full text-black font-bold" onClick={() => router.push('/account')}>
                {userDetails?.avatar_url ? ( // Check if avatar_url exists
                                    <Image
                                        src={userDetails.avatar_url}
                                        alt="User Avatar"
                                        width={20} // Set appropriate width
                                        height={20} // Set appropriate height
                                        className="rounded-full" // Add styling if needed
                                    />
                                ) : (
                                    <FaUserAlt/> // Fallback icon if no avatar_url
                                )}
            </button>
            </div> </>): (
            <>
           <div>
            <button className="bg-transparent px-6 py-2 rounded-full text-neutral-400 font-bold" onClick={AuthModal.onOpen}>
              Sign Up
            </button>
            <button className="bg-sky-500 px-6 py-2 rounded-full text-black font-bold" onClick={AuthModal.onOpen}> 
            Log in
            </button>
           </div>
            </>) }
        </div>
        
    </div>
    {children}
    </div>
  )
}

export default Header