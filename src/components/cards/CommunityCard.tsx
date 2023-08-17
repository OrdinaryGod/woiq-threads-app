'use client'
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
    id: string
    imageUrl: string
    name: string
    username: string //slug
    bio: string
    members: {
        image: string
    }[]
}

function CommunityCard({ id, name, username, imageUrl, bio, members }: Props) {
    const router = useRouter();

    return (
        <div className="community-card">
            <div className="flex items-start justify-start gap-3 xs:items-center">
                <Link href={`/communities/${id}`} className="relative h-12 w-12 object-cover">
                    <Image
                        src={imageUrl}
                        alt="community photo"
                        fill
                        className="rounded-full object-cover"
                    ></Image>
                </Link>
                <div className="flex flex-col items-start justify-center">
                    <Link href={`/communities/${id}`}>
                        <h2 className="text-base-semibold  text-light-1">{name}</h2>
                    </Link>
                    <p className="text-small-medium  text-gray-1">@{username}</p>
                </div>
            </div>

            <p className="mt-4 text-subtle-medium text-gray-1">{bio}</p>

            <div className="flex justify-between mt-4">
                <Button
                    className="community-card_btn"
                    onClick={() => {
                        router.push(`/communities/${id}`);
                    }}
                >View</Button>


                {members.length > 0 && (
                    <div className='flex items-center'>
                        {members.map((member, index) => (
                            <Image
                                key={index}
                                src={member.image}
                                alt={`user_${index}`}
                                width={28}
                                height={28}
                                className={`${index !== 0 && "-ml-2"
                                    } rounded-full object-cover`}
                            />
                        ))}
                        {members.length > 3 && (
                            <p className='ml-1 text-subtle-medium text-gray-1'>
                                {members.length}+ Users
                            </p>
                        )}
                    </div>
                )}

            </div>

        </div>
    )
}

export default CommunityCard;