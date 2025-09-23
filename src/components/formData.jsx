import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ProductSchema } from "@/schemas/product-schema";
import { da } from "zod/v4/locales";

export const FormData = () => {
  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      count: 0,
      price: 0,
      watt: "",
    },
  });
  const submit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h2 className="text-[20px] my-5">Create Product</h2>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            {/* <FormField control={form.control} name="name" render={}/> */}
          </form>
        </Form>
      </div>
    </div>
  );
};
