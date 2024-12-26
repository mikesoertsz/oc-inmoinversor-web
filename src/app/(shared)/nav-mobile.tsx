import Link from 'next/link';
import React from 'react';


type MobileNavbarProps = {
    open: boolean;
    navitems: { text: string, url: string }[];
    buttons: { text: string, icon: JSX.Element, url: string }[];
}
const MobileNavbar = ({ open, navitems, buttons }: MobileNavbarProps) => {
    return (
        <div className={`absolute overflow-hidden top-[76px] z-50 ${open ? "right-[14px] sm:right-[-250px]" : "right-[-250px] sm:right-[-250px]"} transition-all duration-150 rounded-md bg-black shadow-neutral-700 shadow-md flex flex-col max-w-[220px] w-full ease-linear`}>
            {navitems.map((item, index) => (
                <Link key={index} href={item.url} className="px-4 py-2 text-white hover:bg-white hover:text-black  transition duration-300 ease-in-out text-center">{item.text}</Link>
            ))}
            {buttons.map((item, index) => (
                <Link key={index} href={item.url} className="px-4 py-2 text-white hover:bg-white hover:text-black  transition duration-300 ease-in-out flex items-center gap-1.5 justify-center ">
                    {item.icon}
                    {item.text}
                </Link>
            ))}
        </div>
    );
};

export default MobileNavbar;
