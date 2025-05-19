'use client'

import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* ロゴ */}
        <Link href="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-800">
          Karaoke Rating
        </Link>

        {/* ナビゲーション */}
        <nav className="space-x-4 hidden sm:block">
          <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600">
            ダッシュボード
          </Link>
          <Link href="/notes" className="text-gray-700 hover:text-indigo-600">
            ノート
          </Link>
          <Link href="/profile" className="text-gray-700 hover:text-indigo-600">
            プロフィール
          </Link>
        </nav>

        {/* ログアウト or ログイン */}
        <div>
          <Link
            href="/login"
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            ログイン
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
