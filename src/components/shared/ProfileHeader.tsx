import Image from "next/image";
import Link from "next/link";

interface Props {
    accountId: string
    name: string
    username: string
    image: string
    bio: string
    type?: string
    authUserId: string
}

function ProfileHeader({ accountId, name, username, image, bio, type, authUserId }: Props) {

    return (
        <div className="flex flex-col">
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <div className="relative h-20 w-20 object-cover">
                        <Image
                            src={image} alt="user photo"
                            fill
                            className="rounded-full object-cover"
                        ></Image>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <h2 className="text-heading3-bold  text-light-1">{name}</h2>
                        <p className="text-base-medium  text-gray-1">@{username}</p>
                    </div>
                </div>

                {accountId === authUserId && type !== "Community" && (
                    <Link href='/profile/edit'>
                        <div className='flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2'>
                            <Image
                                src='/assets/edit.svg'
                                alt='logout'
                                width={16}
                                height={16}
                            />
                            <p className='text-light-2 max-sm:hidden'>Edit</p>
                        </div>
                    </Link>
                )}
            </div>

            <p className="text-base-regular text-light-2 mt-6 max-w-lg">{bio}</p>

            <div className='mt-12 h-0.5 w-full bg-dark-3' />
        </div>
    )
}

export default ProfileHeader;