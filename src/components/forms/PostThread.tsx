'use client'

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThreadValidationSchema } from "@/lib/validations/thread";
import { z } from "zod";
import { useOrganization } from "@clerk/nextjs";
import { createThread } from "@/lib/actions/thread.action";

function PostThread({ userId }: { userId: string }) {
    const router = useRouter();
    const pathname = usePathname()
    const { organization } = useOrganization()

    const form = useForm({
        resolver: zodResolver(ThreadValidationSchema),
        defaultValues: {
            thread: '',
            accountId: userId
        },
    })

    async function onSubmit(values: z.infer<typeof ThreadValidationSchema>) {
        const data = {
            text: values.thread,
            author: userId,
            communityId: organization ? organization.id : null,
            path: pathname,
        }

        await createThread(data)

        router.push('/')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col justify-start gap-10 ">
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-regular text-light-2">Content</FormLabel>
                            <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                                <Textarea
                                    rows={15}
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-primary-500">Post Thread</Button>
            </form>
        </Form>
    )
}

export default PostThread;