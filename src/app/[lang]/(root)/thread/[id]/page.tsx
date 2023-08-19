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
                    currentUserId={user.id}
                    author={result.author}
                    content={result.text}
                    threadId={result._id}
                    community={result.community}
                    createdAt={result.createdAt}
                    parentId={result.parentId}
                    comments={result.children}
                />
            </div>

            <div className="">
                <ThreadComment
                    user_Id={JSON.stringify(userInfo._id)}
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
                            community={threadChildrenItem.community}
                            createdAt={threadChildrenItem.createdAt}
                            parentId={threadChildrenItem.parentId}
                            comments={threadChildrenItem.children}
                            isComment
                        />
                    )
                })}
            </div>

        </section>
    )
}