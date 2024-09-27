"use client"

import PropTypes from 'prop-types';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from './ui/textarea';
import { useEffect } from 'react';

export default function EditSystemPromptForm({systemPrompt, submitHandler}) {

    const onSubmit = (data) => {
        submitHandler(data.systemPrompt);
    };

    const FormSchema = z.object({
        systemPrompt: z.string().min(10, {
            message: 'System prompt must be at least 10 characters long',
        }).refine(value => value.startsWith('### System:'), {
            message: 'System prompt must start with "### System:"',
        }),
    });

    const form = useForm({
        resolver: zodResolver(FormSchema),
    });

    useEffect(() => {
        form.reset({
            systemPrompt,
        });
    }, [systemPrompt, form]);

    return (
    <div className=" px-4 py-6 flex flex-col items-start w-full h-full">
        <Form {...form}>
        <h1 className="text-2xl font-semibold pb-2">Edit System Prompt</h1>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="systemPrompt"
                    defaultValue={systemPrompt}
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-semibold pl-4">System Prompt</FormLabel>
                        <FormControl>
                        <Textarea
                            {...field}
                            placeholder="Enter system prompt here"
                            className="w-full min-h-36"
                        />
                        </FormControl>
                        <FormDescription>System prompt is used to define the response format returned by the model.<br/>Prompt must begin with {'"### System:"'}</FormDescription>
                        <FormMessage {...form.formState} name="systemPrompt" />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full mt-2 py-2">Save</Button>
            </form>
        </Form>
    </div>
    );
}

EditSystemPromptForm.propTypes = {
    systemPrompt: PropTypes.string.isRequired,
    submitHandler: PropTypes.func.isRequired,
};