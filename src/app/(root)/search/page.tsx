import UserCard from '@/components/cards/UserCard'
import SearchBar from '@/components/shared/SearchBar';
import { fetchUser, fetchUsers } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    // console.log('---------', searchParams);

    const result = await fetchUsers({
        userId: user.id,
        searchString: searchParams.q || '',
        pageNumber: searchParams?.page ? +searchParams.page : 1,
        pageSize: 20
    })

    // console.log('users------', result);

    return (
        <section className="">
            <h1 className="head-text mb-10">Search</h1>

            <SearchBar routeType='search' />

            <div className='mt-14'>
                {
                    result.users.map((item) => {
                        return (
                            <UserCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                username={item.username}
                                imageUrl={item.image}
                                personType="User"
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