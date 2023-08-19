import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab"
import { fetchCommunityDetails } from "@/lib/actions/community.action";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { communityTabs } from '@/constants'
import UserCard from "@/components/cards/UserCard";

export default async function Page({ params }: { params: { id: string } }) {
    if (!params.id) return null;

    const user = await currentUser();
    if (!user) return null;

    const communityInfo = await fetchCommunityDetails(params.id);

    return (
        <div>
            <ProfileHeader
                accountId={communityInfo.createdBy.id}
                name={communityInfo.name}
                username={communityInfo.username}
                image={communityInfo.image}
                bio={communityInfo.bio}
                authUserId={user.id}
                type="Community"
            />

            <Tabs defaultValue="threads" className="w-full">
                <TabsList className="tab">
                    {
                        communityTabs.map((tabItem) => {
                            return (
                                <TabsTrigger key={`trigger-${tabItem.value}}`} value={tabItem.value} className="tab">
                                    <Image
                                        src={tabItem.icon}
                                        alt={tabItem.label}
                                        width={24}
                                        height={24}
                                    ></Image>
                                    <span className="max-sm:hidden">{tabItem.label}</span>

                                    {tabItem.label === "Threads" && (
                                        <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                                            {communityInfo.threads.length}
                                        </p>
                                    )}
                                </TabsTrigger>
                            )
                        })
                    }
                </TabsList>

                <TabsContent key={`content-threads`} value={`threads`} className="">
                    <ThreadsTab
                        accountId={communityInfo._id}
                        currentUserId={user.id}
                        accountType='Community'
                    />
                </TabsContent>
                <TabsContent key={`content-members`} value={`members`} className="">
                    <section className='mt-9 flex flex-col gap-10'>
                        {communityInfo.members.map((member: any) => (
                            <UserCard
                                key={member.id}
                                id={member.id}
                                name={member.name}
                                username={member.username}
                                imageUrl={member.image}
                                personType='User'
                            />
                        ))}
                    </section>
                </TabsContent>
                <TabsContent key={`content-requests`} value={`requests`} className="">
                    {/* @ts-ignore */}
                    <ThreadsTab
                        currentUserId={user.id}
                        accountId={communityInfo._id}
                        accountType='Community'
                    />
                </TabsContent>

            </Tabs>

        </div>
    )
}   