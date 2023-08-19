import { SignedIn, SignOutButton, OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes"

export default function TopBar() {
    return (
        <nav className="topbar">
            <Link href={'/'} className="flex items-center gap-4">
                <Image
                    src="/windy-logo.svg"
                    alt="windy-logo"
                    width={28}
                    height={28}
                />
                <p className=" text-heading3-bold text-light-1 max-xs:hidden">Woiq-Threads</p>
            </Link>

            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                    <SignedIn>
                        {/* <UserButton afterSignOutUrl="/" /> */}
                        <SignOutButton>
                            {/* <div className="flex cursor-pointer"> */}
                            <Image
                                src="/assets/logout.svg"
                                alt="logout"
                                width={24}
                                height={24}
                                className="flex cursor-pointer"
                            />
                            {/* </div> */}
                        </SignOutButton>
                    </SignedIn>
                </div>

                {/* 组织 */}
                <OrganizationSwitcher
                    appearance={{
                        baseTheme: dark,
                        elements: {
                            organizationSwitcherTrigger: "py-2 px-4",
                        },
                    }}
                />
            </div>
        </nav >
    )
}