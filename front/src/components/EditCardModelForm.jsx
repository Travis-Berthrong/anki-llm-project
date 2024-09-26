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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function EditCardModelForm({cardModel, submitHandler}) {
    const frontTemplate = cardModel.frontTemplate;
    const backTemplate = cardModel.backTemplate;

    const onSubmit = (data) => {
        submitHandler(data.frontTemplate, data.backTemplate);
    };

    const FormSchema = z.object({
        frontTemplate: z.string().min(10, {
            message: 'Front template must be at least 10 characters long',
        }),
        backTemplate: z.string().min(10, {
            message: 'Back template must be at least 10 characters long',
        }),
    });

    const form = useForm({
        resolver: zodResolver(FormSchema),
    });

    return (
    <div className=" px-4 py-6 flex flex-col items-start">
        <Form {...form}>
        <h1 className="text-2xl font-semibold pb-2">Edit Card Model</h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-6">
            <Tabs defaultValue="front" className="w-full max-w-md">
                <TabsList className="flex justify-center mb-4 font-semibold shadow-md">
                    <TabsTrigger value="front" className="flex-1 text-center bg-slate-100">Front</TabsTrigger>
                    <TabsTrigger value="back" className="flex-1 text-center bg-slate-100">Back</TabsTrigger>
                </TabsList>
                <TabsContent value="front"> 
                    <FormField
                        control={form.control}
                        name="frontTemplate"
                        defaultValue={frontTemplate}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold pl-4">Front Template</FormLabel>
                            <FormControl>
                            <Textarea
                                className="resize-none"
                                {...field}
                            />
                            </FormControl>
                            <FormDescription>
                                The front of the card. Supports HTML. Card fields are denoted by double curly braces, e.g. {'{{field}}'}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </TabsContent>
                <TabsContent value="back">
                        <FormField
                            control={form.control}
                            name="backTemplate"
                            defaultValue={backTemplate}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold pl-4">Back Template</FormLabel>
                                <FormControl>
                                <Textarea
                                    className="resize-none"
                                    {...field}
                                />
                                </FormControl>
                                <FormDescription>
                                    The back of the card. Supports HTML. Card fields are denoted by double curly braces, e.g. {'{{field}}'}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </TabsContent>
                </Tabs>
                <Button type="submit" className="w-full max-w-md">Submit</Button>
            </form>
        </Form>
    </div>
    );
}

EditCardModelForm.propTypes = {
    cardModel: PropTypes.shape({
        frontTemplate: PropTypes.string.isRequired,
        backTemplate: PropTypes.string.isRequired,
    }).isRequired,
    submitHandler: PropTypes.func.isRequired,
};