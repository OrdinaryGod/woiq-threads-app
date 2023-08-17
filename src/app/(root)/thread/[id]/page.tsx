import ThreadComment from "@/components/forms/ThreadComment"
import ThreadCard from "@/components/cards/ThreadCard"
import { fetchThreadById } from "@/lib/actions/thread.action"
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    if (!params.id) return null;

    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const result = await fetchThreadById(params.id)
    // console.log(result);
    return (
        <section>
            <div>
                <ThreadCard
                    // key={result._id}
                    currentUserId={user.id}
                    author={result.author}
                    content={result.text}
                    threadId={result._id}
                    comments={result.children}
                />
            </div>

            <div className="">
                <ThreadComment
                    user_Id={userInfo._id}
                    userImage={userInfo.image}
                    threadId={result.id}
                />
            </div>

            <div className="mt-10">
                {result.children.map((threadChildrenItem: any) => {
                    return (
                        <ThreadCard
                            key={threadChildrenItem._id}
                            currentUserId={user.id}
                            author={threadChildrenItem.author}
                            content={threadChildrenItem.text}
                            threadId={threadChildrenItem._id}
                            comments={threadChildrenItem.children}
                            isComment
                        />
                    )
                })}
            </div>

        </section>
    )
}