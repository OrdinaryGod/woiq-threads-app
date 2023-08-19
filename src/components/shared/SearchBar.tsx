"use client"
import Image from "next/image"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {useTranslations} from 'next-intl';

interface Props {
    routeType: string
}

export default function SearchBar({ routeType }: Props) {
    const router = useRouter()
    const [searchStr, setSearchtr] = useState('')
    const t = useTranslations('searchBar');

    useEffect(() => {
        // 节流防抖
        const delayDebounceFn = setTimeout(() => {
            if (searchStr) {
                router.push(`/${routeType}?q=` + searchStr);
            } else {
                router.push(`/${routeType}`);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchStr, routeType])

    return (
        <div className="searchbar">
            <Image
                src="/assets/search.svg"
                alt="search"
                width={24}
                height={24}
            />

            <Input
                type="text"
                value={searchStr}
                onChange={(e) => setSearchtr(e.target.value)}
                placeholder={routeType === 'search' ? t('Search creators') : t('Search communities')}
                className="searchbar_input no-focus"
            />
        </div>
    )
}