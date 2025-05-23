'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@/util/supabase/client";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  user_name: string;
}

const SignupForm = () => {
  const supabase = createClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<FormData>();
  
  const [message, setMessage] = useState<string | null>(null);
  const email = watch("email");
  const password = watch("password");
  const userName = watch("user_name");

  const onSubmit = async (data: FormData) => {
    try {
      const { error:signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
        data: {
          display_name: userName,
          rating: 0,
          icon_id: 0
        }
  }
      })
      if (signUpError) {
        throw signUpError;
      }
      
      alert('登録完了メールを確認してください');
      router.push("/login");
    }catch(error){
      alert(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-800">新規登録</h1>

        {/* User Name Field */}
        <div className="space-y-1">
          <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">ユーザーネーム</label>
          <input
            id="user_name"
            type="user_name"
            {...register('user_name', { required: 'ユーザーネームは必須です' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'メールアドレスは必須です' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">パスワード（確認）</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: '確認用パスワードを入力してください',
              validate: value =>
                value === password || 'パスワードが一致しません'
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? '送信中...' : '登録'}
        </button>

        {/* Message */}
        {message && <p className="text-center text-green-600 mt-2">{message}</p>}
      </motion.form>
    </div>
  );
}

export default SignupForm;
