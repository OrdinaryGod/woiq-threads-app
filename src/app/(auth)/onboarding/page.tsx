import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

async function Page() {
    const userInfo = await currentUser()

    const userInfoData = {
        id: userInfo?.id || '',
        // objectId: userInfo?._id,
        username: userInfo?.username || '',
        name: userInfo?.firstName || '',
        image: userInfo?.profileImageUrl || '',
        // : userInfo?.imageUrl,  // webp格式
    }
    // console.log('userInfo------------', userInfo);

    return (
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-10">
            <div className="">
                <h1 className="head-text">Onboarding</h1>
                <p className="mt-3 text-base-regular text-light-2">Complete your profile now to use Threads</p>
            </div>

            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile
                    user={userInfoData}
                    btnTitle="Continue"
                />
            </section>
        </main>
    )
}

export default Page;