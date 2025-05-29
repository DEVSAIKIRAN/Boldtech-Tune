"use client"

import uniqid  from "uniqid"
import useUploadModal from "@/hooks/useUploadModal"
import Modal from "./Modal"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";


const UploadModal = () => {

const [isLoading, setIsLoading] = useState(false)

const uploadModal = useUploadModal();
const {user} = useUser()
const supabaseClient = useSupabaseClient()
const router = useRouter()

const {
    register,
    handleSubmit,
    reset
} = useForm<FieldValues>({
    defaultValues: {
        author: '',
        title: '',
        song: null,
        image: null
    }
})

const onSubmit: SubmitHandler<FieldValues> = async(values) => {
   try {
    setIsLoading(true);

    const imageFile = values.image?.[0]
    const songFile = values.song?.[0]

    if (!imageFile || !songFile || !user ){
      toast.error('Missing fileds')
      return
    }
   const uniqueID = uniqid();

   const {
    data: songData,
    error: songError
   } = await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqueID}`,songFile,{
    cacheControl: '3600',
    upsert: false
   })

   if (songError) {
    setIsLoading(false)
    return toast.error('Failed song upload')
   }

     const {
    data: imageData,
    error: imageError
   } = await supabaseClient.storage.from('images').upload(`image-${values.title}-${uniqueID}`,imageFile,{
    cacheControl: '3600',
    upsert: false
   })

   if (imageError) {
    setIsLoading(false)
    return toast.error('Failed song upload')
   }
  const { error: supabaseError} = await supabaseClient.from('songs').insert({ user_id: user.id, title: values.title, author: values.author, image_path: imageData.path , song_path: songData.path})

  if (supabaseError){
    setIsLoading(false)
    return toast.error('supabase.Error')
  }
  router.refresh()
  setIsLoading(false)
  toast.success('Song created!')
  reset()
   } catch (error){
    toast.error("somthing Went wrong")
   }
   finally{
    setIsLoading(false)
   }
}

const onChange = (open: boolean) => {
  if (!open) {
    uploadModal.onClose()
  }
}

    
  return (
    <div className="gap-4">
    <Modal title="Add a Song"  description="Upload Mp3 file" isOpen={uploadModal.isOpen} onChange={onChange} >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-x-4">
           <Input id="title" disabled={isLoading} {...register('title', {required: true})} placeholder="Song title" className="flex w-full  bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none gap-y-4 rounded-lg"/>
             <Input id="author" disabled={isLoading} {...register('author', {required: true})} placeholder="Song author"/>
             <div>
                Select a song
                 <Input id="song" disabled={isLoading} {...register('song', {required: true})} placeholder="" type="file" accept=".mp3"/>
             </div>
              <div>
                Select a Image
                 <Input id="image" disabled={isLoading} {...register('image', {required: true})} placeholder="" type="file" accept="image/*"/>
             </div>
             <Button className="gap-x-4 bg-sky-400 rounded-full font-bold hover:bg-sky-600"> Create</Button>
        </form>
    </Modal>
    </div>
  )
}

export default UploadModal