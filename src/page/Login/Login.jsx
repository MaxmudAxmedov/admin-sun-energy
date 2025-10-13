import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import login_img from "../../assets/img/login_img.jpg";
import { login } from "@/services/uselogin";
import { setStorage } from "@/storage/local-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { handleSubmit, reset, register } = useForm();
  const nav = useNavigate();
  const { mutate, isPending } = login();
  const submit = (values) => {
    mutate(values, {
      onSuccess: (res) => {
        setStorage("token", res?.Data?.access_token);
        setStorage("refresh_token", res?.Data?.refresh_token);
        toast("Kirish muvaffaqiyatli bajarildi!");
        nav("/");
        reset();
      },
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <style>{`
        @keyframes slideInRight {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      <form
        className="flex-1 flex items-center justify-center"
        onSubmit={handleSubmit(submit)}
      >
        <div className="bg-white shadow-xl rounded-2xl p-10 w-[400px]">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            KIRISH
          </h1>

          <div className="mb-5">
            <label className="text-gray-700 text-sm font-medium mb-2 block">
              UserName
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              {...register("login")}
            />
          </div>

          <div className="mb-5">
            <label className="text-gray-700 text-sm font-medium mb-2 block">
              Password
            </label>
            <input
              type="Password"
              {...register("password")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          <Button
            disabled={isPending}
            loading={isPending}
            className="w-full bg-blue-600 cursor-pointer border-none hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
          >
            Yuborish
          </Button>
        </div>
      </form>
      <div className="flex-1 flex items-center justify-center">
        <img
          src={login_img}
          alt="Login illustration"
          className="w-[900px] h-screen object-cover rounded-l-2xl animate-[slideInRight_1s_ease-out_forwards]"
        />
      </div>
    </div>
  );
}
