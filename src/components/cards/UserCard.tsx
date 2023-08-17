'use client'
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
    id: string
    imageUrl: string
    name: string
    username: string
    personType?: string
}

function UserCard({ id, name, username, imageUrl, personType }: Props) {
    const router = useRouter();

    const isCommunity = personType === 'Community'
    return (
        <div className="user-card">
            <div className="user-card_avatar">
                <div className="relative h-12 w-12 object-cover">
                    <Image
                        src={imageUrl}
                        alt="user photo"
                        fill
                        className="rounded-full object-cover"
                    ></Image>
                </div>
                <div className="flex flex-col items-start justify-center">
                    <h2 className="text-base-semibold  text-light-1">{name}</h2>
                    <p className="text-small-medium  text-gray-1">@{username}</p>
                </div>
            </div>

            <Button
                className="user-card_btn"
                onClick={() => {
                    if (isCommunity) {
                        router.push(`/communities/${id}`);
                    } else {
                        router.push(`/profile/${id}`);
                    }
                }}
            >View</Button>
        </div>
    )
}

export default UserCard;