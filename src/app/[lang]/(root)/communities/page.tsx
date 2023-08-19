import CommunityCard from '@/components/cards/CommunityCard'
import Pagination from '@/components/shared/Pagination';
import SearchBar from '@/components/shared/SearchBar';
import { fetchCommunities } from '@/lib/actions/community.action';
import { fetchUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    // console.log('---------', searchParams);

    // TODO 待优化 这个查询很占内存
    const result = await fetchCommunities({
        searchString: searchParams.q,
        pageNumber: searchParams?.page ? +searchParams.page : 1,
        pageSize: 25,
    });
    // console.log('users------', result.communities[0].members);

    return (
        <section className="">
            <h1 className="head-text mb-10">Communities</h1>

            <div className='mt-5'>
                <SearchBar routeType='communities' />
            </div>

            <div className='mt-9 flex flex-wrap gap-4'>
                {
                    result.communities.map((item) => {
                        const members = item.members.map((member: any) => ({ image: member.image }))
                        return (
                            <CommunityCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                username={item.username}
                                imageUrl={item.image}
                                bio={item.bio}
                                members={members}
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

        </section>
    )
}

export default Page;