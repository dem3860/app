// app/admin/page.tsx
"use client";

// sampleです
export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-blue-800">
          管理者ダッシュボード
        </h1>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <h2 className="text-sm text-gray-500">登録ユーザー数</h2>
            <p className="text-2xl font-bold text-blue-600">1,248</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <h2 className="text-sm text-gray-500">イベント件数</h2>
            <p className="text-2xl font-bold text-green-600">83</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <h2 className="text-sm text-gray-500">今月の新規登録</h2>
            <p className="text-2xl font-bold text-purple-600">32</p>
          </div>
        </section>
        <section className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            最近のアクティビティ
          </h2>
          <ul className="space-y-2 text-sm">
            <li>📅 2025/04/16 - ユーザー登録</li>
            <li>📅 2025/04/15 - イベント作成</li>
            <li>📅 2025/04/14 - ユーザー情報更新</li>
          </ul>
        </section>
        <section className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            最近のユーザー登録
          </h2>
          <ul className="space-y-2 text-sm">
            <li>👤 山田 太郎 - 2025/04/16</li>
            <li>👤 佐藤 花子 - 2025/04/15</li>
            <li>👤 鈴木 一郎 - 2025/04/14</li>
          </ul>
        </section>

        {/* お知らせ */}
        <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow">
          <p className="text-sm text-yellow-800 font-medium">
            ⚠️ 2025年5月1日にシステムメンテナンスを予定しています。
          </p>
        </section>
      </div>
    </main>
  );
}
