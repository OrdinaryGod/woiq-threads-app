import Image from "next/image";

interface Props {
    accountId: string
    name: string
    username: string
    image: string
    bio: string
}

function ProfileHeader({ accountId, name, username, image, bio }: Props) {

    return (
        <div className="flex flex-col">
            <div className="flex gap-3">
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

            <p className="text-base-regular text-light-2 mt-6 max-w-lg">{bio}</p>

            <div className='mt-12 h-0.5 w-full bg-dark-3' />
        </div>
    )
}

export default ProfileHeader;