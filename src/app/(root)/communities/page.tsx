import CommunityCard from '@/components/cards/CommunityCard'
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

    const result = await fetchCommunities({
        searchString: searchParams.q || '',
        pageNumber: searchParams?.page ? +searchParams.page : 1,
        pageSize: 20
    })

    // console.log('users------', result);

    if (!result.communities.length) {
        result.communities = [
            {
                id: '001',
                name: 'Neue',
                username: 'neue',
                image: 'https://images.clerk.dev/oauth_google/img_2TuXz5jZZHgpZw6S9YCLxrkHYnL.png',
                bio: 'this is bio',
                members: [
                    { image: 'https://images.clerk.dev/oauth_google/img_2TuXz5jZZHgpZw6S9YCLxrkHYnL.png' },
                    { image: 'https://images.clerk.dev/oauth_google/img_2TuXz5jZZHgpZw6S9YCLxrkHYnL.png' },
                    { image: 'https://images.clerk.dev/oauth_google/img_2TuXz5jZZHgpZw6S9YCLxrkHYnL.png' }
                ]
            },
            {
                id: '002',
                name: 'Neue',
                username: 'neue',
                image: 'https://images.clerk.dev/oauth_google/img_2TuXz5jZZHgpZw6S9YCLxrkHYnL.png',
                bio: 'this is bio',
                members: [{
                    image: 'https://images.clerk.dev/oauth_google/img_2TuXz5jZZHgpZw6S9YCLxrkHYnL.png'
                }]
            },
            {
                id: '003',
                name: 'Neue',
                username: 'neue',
                image: 'https://images.clerk.dev/oauth_google/img_2TuXz5jZZHgpZw6S9YCLxrkHYnL.png',
                bio: 'this is bio',
                members: [{
                    image: 'https://images.clerk.dev/oauth_google/img_2TuXz5jZZHgpZw6S9YCLxrkHYnL.png'
                }]
            },
            {
                id: '004',
                name: 'Neue',
                username: 'neue',
                image: 'https://images.clerk.dev/oauth_google/img_2TuXz5jZZHgpZw6S9YCLxrkHYnL.png',
                bio: 'this is bio',
                members: [
                    { image: 'https://images.clerk.dev/oauth_google/img_2TuXz5jZZHgpZw6S9YCLxrkHYnL.png' },
                    { image: 'https://images.clerk.dev/oauth_google/img_2TuXz5jZZHgpZw6S9YCLxrkHYnL.png' }
                ]
            }
        ]
    }

    return (
        <section className="">
            <h1 className="head-text mb-10">Communities</h1>

            <div className='mt-5'>
                <SearchBar routeType='communities' />
            </div>

            <div className='mt-9 flex flex-wrap gap-4'>
                {
                    result.communities.map((item) => {
                        return (
                            <CommunityCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                username={item.username}
                                imageUrl={item.image}
                                bio={item.bio}
                                members={item.members}
                            />
                        )
                    })
                }
            </div>

            {/* TODO Pagintion */}

        </section>
    )
}

export default Page;