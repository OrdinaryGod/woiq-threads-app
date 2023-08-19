import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab"
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { profileTabs } from '@/constants'


export default async function Page({ params }: { params: { id: string } }) {
    if (!params.id) return null;

    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(params.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    return (
        <div>
            <ProfileHeader
                accountId={userInfo.id}
                name={userInfo.name}
                username={userInfo.username}
                image={userInfo.image}
                bio={userInfo.bio}
                authUserId={user.id}
            />

            <Tabs defaultValue="threads" className="w-full">
                <TabsList className="tab">
                    {
                        profileTabs.map((tabItem) => {
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
                                            {userInfo.threads.length}
                                        </p>
                                    )}
                                </TabsTrigger>
                            )
                        })
                    }
                </TabsList>

                {/* Content  TODO 2个tab内容待开发 */}
                {
                    profileTabs.map((tabItem) => {
                        return (
                            <TabsContent key={`content-${tabItem.value}`} value={tabItem.value} className="">
                                <ThreadsTab 
                                    accountId={params.id}
                                    currentUserId={user.id}
                                    accountType='User'
                                />
                            </TabsContent>
                        )
                    })
                }
            </Tabs>

        </div>
    )
}