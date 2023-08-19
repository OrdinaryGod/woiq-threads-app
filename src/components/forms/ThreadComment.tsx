'use client'

import { ThreadCommentValidationSchema } from "@/lib/validations/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { addCommentToThread } from "@/lib/actions/thread.action";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";


function ThreadComment({ user_Id, threadId, userImage }: { user_Id: string, threadId: string, userImage: string }) {
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(ThreadCommentValidationSchema),
        defaultValues: {
            thread: ''
        },
    })

    async function onSubmit(values: z.infer<typeof ThreadCommentValidationSchema>) {
        await addCommentToThread(threadId, values.thread, JSON.parse(user_Id), pathname);

        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-3 w-full">
                            <FormLabel className="text-base-regular text-light-2">
                                <Image
                                    src={userImage} alt="user photo"
                                    height={48} width={48}
                                    className="object-cover rounded-full"
                                ></Image>
                            </FormLabel>
                            <FormControl className=" border-none bg-transparent">
                                <Input
                                    type='text'
                                    {...field}
                                    placeholder='Comment...'
                                    className='no-focus text-light-1 outline-none'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="comment-form_btn">Replay</Button>
            </form>
        </Form>
    )
}

export default ThreadComment;