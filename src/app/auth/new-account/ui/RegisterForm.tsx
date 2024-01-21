"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import Link from "next/link";
import { login, registerUser } from "@/actions";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    setErrorMessage('');

    const { name, email, password } = data;
    const resp = await registerUser({ name, email, password });

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    await login({ email: email.toLowerCase(), password });
    window.location.replace('/');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="email">Full Name</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              "border-red-500": errors?.name?.type === 'required'
            }
          )
        }
        type="text"
        autoFocus
        { ...register("name", { required: true })}
      />

      <label htmlFor="email">Email</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              "border-red-500": errors?.email?.type === 'required'
            }
          )
        }
        type="email"
        { ...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="email">Password</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              "border-red-500": errors?.password?.type === 'required'
            }
          )
        }
        type="password"
        { ...register("password", { required: true, minLength: 6 })}
      />

      {
        errorMessage && (
          <span className="text-red-500">{errorMessage}</span>
        )
      }

      <button className="btn-primary">Create account</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Login
      </Link>
    </form>
  );
};
