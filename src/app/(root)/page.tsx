// app/page.tsx (主文件)

import ThreadCard from "@/components/cards/ThreadCard"
import Pagination from "@/components/shared/Pagination";
import { fetchPosts } from "@/lib/actions/thread.action"
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home(
  {
    searchParams
  }: {
    searchParams: { [key: string]: string | undefined };
  }
) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  );
  // console.log('result----', result.posts)

  return (
    <>
      <h1 className="mb-6 head-text">Home</h1>

      <div className="flex flex-col gap-10">
        {
          result.posts.map((thread) => {
            return (
              <ThreadCard
                key={thread._id}
                author={thread.author}
                content={thread.text}
                threadId={thread._id}
                community={thread.community}
                createdAt={thread.createdAt}
                currentUserId={user.id}
                parentId={thread.parentId}
                comments={thread.children}
              />
            )
          })
        }
      </div>

      <Pagination
        path='/'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />

    </>
  )
}