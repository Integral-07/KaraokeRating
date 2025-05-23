'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@/util/supabase/client";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const supabase = createClient();
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [message, setMessage] = useState<string | null>(null);

  const email = watch("email");
  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    try{
      const { error:signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (signInError) {
        throw signInError;
      }
      setMessage("Login Success!");
      await router.push("/dashboard");
    }catch{
      setMessage("メールアドレスまたはパスワードが間違っているか\nメールアドレスが認証されていません");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-800">ログイン</h1>

        {/* Email Field */}
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'メールアドレスは必須です' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="example@mail.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">パスワード</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'パスワードは必須です',
              minLength: { value: 6, message: '6文字以上で入力してください' }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="********"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? '送信中...' : 'ログイン'}
        </button>

        {/* Message */}
        {message && <p className="text-center text-green-600 mt-2">{message}</p>}
      </motion.form>
    </div>
  );
}



export default LoginForm;