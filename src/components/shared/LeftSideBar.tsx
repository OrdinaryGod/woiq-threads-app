'use client'
import { sidebarLinks } from "@/constants/index";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";
import {useTranslations} from 'next-intl';

// type SidebarLink = { imgURL: string, route: string, label: string }

export default function LeftSideBar() {
    const pathname = usePathname()
    const router = useRouter()
    const { userId } = useAuth()
    const t = useTranslations('leftSideBar');
    return (
        <section className="leftsidebar custom-scrollbar">
            <div className="flex flex-1 flex-col w-full gap-6 px-6">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route
                    if (link.route === '/profile') link.route = `/profile/${userId}`;
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`leftsidebar_link 
                            ${isActive && 'bg-primary-500'}`}
                        >
                            <Image src={link.imgURL} width={24} height={24} alt={link.label} />
                            <p className=" max-lg:hidden text-light-1">{t(link.label)}</p>
                        </Link>
                    )
                })}
            </div>

            <div className="px-6 mt-10">
                <SignedIn>
                    <SignOutButton signOutCallback={() => router.push('/sign-in')}>
                        <div className="flex cursor-pointer gap-4 p-4">
                            <Image
                                src="/assets/logout.svg"
                                alt="logout"
                                width={24}
                                height={24}
                            />
                            <p className="text-light-2 max-lg:hidden">{t('logout')}</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>

    )
}