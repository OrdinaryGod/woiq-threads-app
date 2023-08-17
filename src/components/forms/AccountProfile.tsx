"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import {
    Form, FormField, FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { UserValidationSchema } from "@/lib/validations/user";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import { updateUser } from "@/lib/actions/user.action";

interface Props {
    user: {
        id: string;
        objectId?: string;
        username: string;
        name: string;
        bio?: string;
        image: string;
    };
    btnTitle: string
}

function AccountProfile({ user, btnTitle }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const { startUpload } = useUploadThing('media');
    const [files, setFiles] = useState<File[]>([])

    const form = useForm({
        resolver: zodResolver(UserValidationSchema),
        defaultValues: {
            username: user.username || '',
            name: user.name || '',
            bio: user.bio || '',
            profile_photo: user.image || ''
        },
    })

    function handleImage(e: ChangeEvent<HTMLInputElement>, fieldChange: (values: string) => void) {
        e.preventDefault()
        const fileReader = new FileReader();

        if (e.target.files?.length) {
            const file = e.target.files[0]
            setFiles(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    }

    async function onSubmit(values: z.infer<typeof UserValidationSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // console.log('onsubmit-----', values)
        const blob = values.profile_photo;
        const hasImageChanged = isBase64Image(blob);
        if (hasImageChanged) {
            const imgRes = await startUpload(files);

            // console.log(imgRes);

            if (imgRes && imgRes[0].url) {
                values.profile_photo = imgRes[0].url;
            }
        }

        // 修改数据库
        await updateUser({
            name: values.name,
            path: pathname,
            username: values.username,
            userId: user.id,
            bio: values.bio,
            image: values.profile_photo,
        });

        // 判断是否是 profile 页面操作
        if (pathname === "/profile/edit") {
            router.back();
        } else {
            router.push("/");
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className="flex gap-4 items-center">
                            <FormLabel className="account-form_image-label">
                                {field.value ? (
                                    <Image
                                        src={field.value}
                                        alt='profile_icon'
                                        width={96}
                                        height={96}
                                        priority
                                        className='rounded-full object-contain h-full'
                                    />
                                ) : (
                                    <Image
                                        src='/assets/profile.svg'
                                        alt='profile_icon'
                                        width={24}
                                        height={24}
                                        className='object-contain'
                                    />
                                )}
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="account-form_image-input"
                                    onChange={(e) => handleImage(e, field.onChange)} />
                            </FormControl>
                            {/* <FormDescription>
                                This is your public display photo.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-gray-200">Name</FormLabel>
                            <FormControl className="flex-1 text-gray-200 text-base-semibold">
                                <Input
                                    type="text"
                                    className="account-form_input no-focus"
                                    {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">Username</FormLabel>
                            <FormControl className="flex-1 text-gray-200 text-base-semibold">
                                <Input
                                    type="text"
                                    className="account-form_input no-focus"
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">Bio</FormLabel>
                            <FormControl className="flex-1 text-gray-200 text-base-semibold">
                                <Textarea
                                    rows={10}
                                    className="account-form_input no-focus"
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="bg-primary-500">{btnTitle}</Button>
            </form>
        </Form>
    )
}

export default AccountProfile;