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
import { Textarea } from "@/components/ui/textarea"

export default function EditCardModelForm({cardModel, submitHandler}) {
    const frontTemplate = cardModel.frontTemplate;
    const backTemplate = cardModel.backTemplate;

    const onSubmit = (e) => {
        e.preventDefault();
        submitHandler(e.target.frontTemplate.value, e.target.backTemplate.value);
    }

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
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="frontTemplate"
            defaultValue={frontTemplate}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Front Template</FormLabel>
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
            <FormField
                control={form.control}
                name="backTemplate"
                defaultValue={backTemplate}
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Back Template</FormLabel>
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
}

EditCardModelForm.propTypes = {
    cardModel: PropTypes.shape({
        frontTemplate: PropTypes.string.isRequired,
        backTemplate: PropTypes.string.isRequired,
    }).isRequired,
    submitHandler: PropTypes.func.isRequired,
};