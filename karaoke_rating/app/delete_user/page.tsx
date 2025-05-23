'use client'

import { createClient } from "@/util/supabase/admin";
import { useState } from "react";
const DeleteUser = () => {

  const [userId, setUserId] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!userId) {
      setResult('ユーザーIDを入力してください');
      return;
    }

    const supabase = await createClient();
    const {error} = await supabase.auth.admin.deleteUser(userId);

    if(error){

        alert(error);
    }
  };

  return (
    <>
    <div className="p-4 space-y-2">
      <h2 className="text-lg font-bold">ユーザー削除</h2>
      <input
        type="text"
        placeholder="ユーザーIDを入力"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded"
        >
        削除
      </button>
      {result && <p>{result}</p>}
    </div>
    </>
  );
};


export default DeleteUser;