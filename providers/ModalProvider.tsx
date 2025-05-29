"use client"

import AuthModal from "@/app/(app-components)/AuthModal"
import Modal from "@/app/(app-components)/Modal"
import UploadModal from "@/app/(app-components)/UploadModal"
import { useEffect, useState } from "react"

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
    setIsMounted(true)
    },[])
    
    if (!isMounted) {
        return(null)
    }

  return (
    <> 
     <AuthModal/>
     <UploadModal/>
    </>
  )
}

export default ModalProvider