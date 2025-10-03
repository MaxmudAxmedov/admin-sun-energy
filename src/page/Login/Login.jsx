import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import login_img from "../../assets/img/login_img.jpg";
import { PatternFormat } from "react-number-format";

export default function Login() {
  const { handleSubmit, reset, register, control } = useForm({
    defaultValues: {
      password: "",
      phone: "",
    },
  });
  const submit = (data) => {
    console.log(data);

    // reset();
  };

  return (
    <div className="flex">
      <style>{`
        @keyframes slideInRight {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>
      <FormField className="flex-1" onSubmit={handleSubmit(submit)}>
        <div className="w-[400px] p-2 my-[20%] ml-[50px]">
          <h1 className="mb-2 text-[40px]">Ro'yhatdan O'tish</h1>

          <Input
            className="my-[20px]"
            placeholder="Parolingizni kiriting"
            type="text"
            // {...register("password")}
          />

          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input {...field} placeholder="Telefon raqamingizni kiriting" />
            )}
          />

          <Button className="mt-2" type="submit">
            send
          </Button>
        </div>
      </FormField>

      <div className="flex-1 h-[100vh] flex items-center justify-center">
        <img
          src={login_img}
          alt="img"
          style={{
            width: "900px",
            height: "100vh",
            borderRadius: "12px",
            animation: "slideInRight 1s ease-out forwards",
          }}
        />
      </div>
    </div>
  );
}
