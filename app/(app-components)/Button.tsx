"use client";

import clsx from "clsx";
import { forwardRef } from "react";

interface ButtonProps 
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement , ButtonProps>(({
    className,
    children,
    disabled,
    type = "button",
    ...props
}, ref) => {
    return (
        <button type={type} className={clsx(`w-full rounded-full bg-sky-500 border-transparent border px-2 py-2 disabled:opacity-50 text-black font-bold hover:opacity-75 transition`, className)} disabled={disabled} ref={ref} {...props}>
            {children}
        </button>
    )
})

Button.displayName = "Button"

export default Button