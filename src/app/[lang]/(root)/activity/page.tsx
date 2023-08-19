import { fetchUser, getActivity } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image"
import Link from "next/link";

async function Page() {
    const user = await currentUser()
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const result = await getActivity(userInfo._id)

    return (
        <section>
            <h1 className="head-text mb-8">Activity</h1>

            <div className="mt-10 flex flex-col gap-5">
                {
                    result.length ?
                        (<>
                            {
                                result.map((item) => {
                                    return (
                                        <Link key={item._id} href={`/thread/${item.parentId}`}>
                                            <article className="activity-card">
                                                <Image
                                                    src={item.author.image}
                                                    alt="user photo"
                                                    height={20}
                                                    width={20}
                                                    className="object-cover cursor-pointer rounded-full"
                                                />

                                                <p className="text-small-regular text-light-1">
                                                    <span className="!text-small-regular text-primary-500 mr-1">
                                                        {item.author.name}
                                                    </span>
                                                    {" "}
                                                    {'replied to your thread'}
                                                </p>
                                            </article>
                                        </Link>
                                    )
                                })
                            }
                        </>)
                        :
                        (<p className='!text-base-regular text-light-3'>No activity yet</p>)
                }


            </div>
        </section>
    )
}

export default Page;