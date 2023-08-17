import ThreadCard from "@/components/cards/ThreadCard"
import { fetchCommunityPosts } from "@/lib/actions/community.action";
import { fetchUserPosts } from "@/lib/actions/user.action"
import { redirect } from "next/navigation";

interface Props {
    accountId: string
    currentUserId: string
    accountType: string  //账户类型（是否加入社区）
}

interface Result {
    name: string;
    image: string;
    id: string;
    threads: {
        _id: string;
        text: string;
        parentId: string | null;
        author: {
            name: string;
            image: string;
            id: string;
        };
        community: {
            id: string;
            name: string;
            image: string;
        } | null;
        createdAt: string;
        children: {
            author: {
                image: string;
            };
        }[];
    }[];
}

async function ThreadsTab({ accountId, currentUserId, accountType }: Props) {
    let result: Result;

    if (accountType === 'Community') {
        result = await fetchCommunityPosts(accountId)
    } else {
        result = await fetchUserPosts(accountId)
    }

    if (!result) redirect("/");

    return (
        <section className="mt-10 flex flex-col gap-10">
            {result.threads.map((thread: any) => {
                return (
                    <ThreadCard
                        key={thread._id}
                        currentUserId={currentUserId}
                        author={result}
                        content={thread.text}
                        threadId={thread._id}
                        community={
                            accountType === 'Community' ?
                                { id: result.id, name: result.name, image: result.image } : thread.community
                        }
                        createdAt={thread.createdAt}
                        parentId={thread.parentId}
                        comments={thread.children}
                    />
                )
            })}
        </section>
    )
}

export default ThreadsTab;