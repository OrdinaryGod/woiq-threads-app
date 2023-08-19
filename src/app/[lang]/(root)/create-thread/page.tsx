import PostThread from "@/components/forms/PostThread";
import { fetchUserId } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

async function Page() {
    const userInfo = await currentUser()
    if (!userInfo) return null;

    const userData = await fetchUserId(userInfo.id)
    
    return (
        <section className="">
            <h1 className="head-text mb-8">Create Thread</h1>

            <div className="">
                <PostThread userId={JSON.stringify(userData._id)}/>
            </div>
        </section>
    )
}

export default Page;