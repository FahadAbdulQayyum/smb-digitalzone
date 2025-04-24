import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

interface ButtonProps {
    title: string;
    style: string;
    ic: string;
    lic: string;
    wide: boolean;
    cntr: boolean;
  }

const Button = ({style="border-colorful", title, ic, lic, wide, cntr}: ButtonProps) => {
  return (
    <button className={`${style === "border-colorful" ? "border-colorful-btn" : "bg-colorful-btn"} ${wide ? "w-full remove-mrgn" : ""}` }>
        <span className={`flex items-end ${cntr ? "justify-center" : ""}`}>
            <Icon icon={lic} fontSize={20} className="mr-1" />
            <p className={`${title === "Search for" ? "text-gray-500 font-thin" : ""}`}>{title}</p>
            <Icon icon={ic} fontSize={20} className="mr-1" />
        </span>
    </button>
  )
}

export default Button