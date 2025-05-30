import * as Dialog from "@radix-ui/react-dialog"
import { IoMdClose } from "react-icons/io"

interface Modalprops {
    isOpen: boolean
    onChange: (open: boolean) => void;
    title: string
    description:string
    children: React.ReactNode
}

const Modal: React.FC<Modalprops> = ({
    isOpen,
    onChange,
    title,
    description,
    children
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
     <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0">
          <Dialog.Content className="rounded-2xl fixed drop-shadow-md border border-neutral-700 top-[50%] md:left-[60%] left-[50%] max-h-full h-full  md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%]  bg-neutral-800 p-[25px] focus:outline-none">
            <Dialog.Title className="text-xl text-center font-bold mb-4">
                {title}
            </Dialog.Title>
            <Dialog.Description className="mb-5 text-sm leading-normal text-center">
                {description}
            </Dialog.Description >
            <div>
                {children}
            </div>
            <Dialog.Close asChild>
                <button className="text-netural-400 hover:text-white absolute top-[10px] right-[10px] inline-flex w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none h-[25px]">
                    <IoMdClose />
                </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
     </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal