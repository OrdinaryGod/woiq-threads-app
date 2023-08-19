'use client'
import { sidebarLinks } from "@/constants/index";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {useTranslations} from 'next-intl';

export default function BottomBar() {
    const pathname = usePathname()
    const t = useTranslations('leftSideBar');
    return (
        <section className="bottombar">
            <div className="bottombar_container">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`bottombar_link 
                            ${isActive && 'bg-primary-500'}`}
                        >
                            <Image src={link.imgURL} width={24} height={24} alt={link.label} />
                            <p className=" text-subtle-medium max-sm:hidden text-light-1">
                                {t(link.label).split(' ')[0]}
                            </p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}