// app/page.tsx (主文件)

import ThreadCard from "@/components/cards/ThreadCard"
import { fetchPosts } from "@/lib/actions/thread.action"
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts()
  // console.log('result----', result.posts);

  return (
    <section>
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
                comments={thread.children}
              />
            )
          })
        }
      </div>

    </section>
  )
}