"use client";

import { useState, useEffect } from "react";
import { useListUsers } from "@/api/generated/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import Search from "@/components/ui/Search";
import { Table, Column } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagenation";
import {
  formatDateToJapanese,
  formatGender,
  formatRole,
} from "@/features/admin/user/util";
import { UserView } from "@/features/admin/user/types/view";

export default function AdminUserPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";
  const [q, setQ] = useState(initialQuery);
  const [debouncedQ] = useDebounce(q, 500);
  const initialBirthDayFrom = searchParams.get("birthDayFrom") ?? "";
  const initialBirthDayTo = searchParams.get("birthDayTo") ?? "";
  const initialPageParam = searchParams.get("page");
  const initialPage = initialPageParam
    ? parseInt(initialPageParam, 10) || 1
    : 1;

  const [birthDayFrom, setBirthDayFrom] = useState(initialBirthDayFrom);
  const [birthDayTo, setBirthDayTo] = useState(initialBirthDayTo);
  const [debouncedBirthDayFrom] = useDebounce(birthDayFrom, 500);
  const [debouncedBirthDayTo] = useDebounce(birthDayTo, 500);
  const [page, setPage] = useState(initialPage);
  const limit = 10;

  const normalizeDateTime = (input: string) =>
    input ? new Date(input).toISOString() : undefined;

  const { data, error } = useListUsers({
    q: debouncedQ,
    birthDayFrom: normalizeDateTime(debouncedBirthDayFrom) || undefined,
    birthDayTo: normalizeDateTime(debouncedBirthDayTo) || undefined,
    page: page.toString(),
    limit: limit.toString(),
  });

  const userList: UserView[] =
    data?.users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        prefecture: user.prefecture,
        city: user.city,
        gender: formatGender(user.gender),
        birthday: formatDateToJapanese(user.birthday),
        role: formatRole(user.role),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    }) ?? [];

  const columns: Column<UserView>[] = [
    { key: "name", label: "名前" },
    { key: "email", label: "メール" },
    {
      key: "prefecture",
      label: "住所",
      render: (_, row) => row.prefecture + row.city,
    },
    {
      key: "gender",
      label: "性別",
      render: (value) => (
        <span
          className={`inline-block px-2 py-1 rounded text-sm font-medium ${
            value === "男性"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: "birthday", label: "誕生日" },
    {
      key: "role",
      label: "権限",
      render: (value) => (
        <span
          className={`inline-block px-2 py-1 rounded text-sm font-medium ${
            value === "一般"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQ) params.set("q", debouncedQ);
    if (debouncedBirthDayFrom)
      params.set("birthDayFrom", debouncedBirthDayFrom);
    if (debouncedBirthDayTo) params.set("birthDayTo", debouncedBirthDayTo);
    if (page !== 1) params.set("page", page.toString());
    router.replace(`/admin/user?${params.toString()}`);
  }, [debouncedQ, debouncedBirthDayFrom, debouncedBirthDayTo, page, router]);

  return (
    <div className="p-8 w-full h-full">
      <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-100 px-6 py-4">
          <h1 className="text-xl font-bold text-gray-700">ユーザー一覧</h1>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <Search
              placeholder="ユーザー名で検索"
              value={q}
              onChange={(val) => setQ(val)}
            />
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  生年月日 From
                </label>
                <input
                  type="date"
                  className="border rounded px-3 py-2 w-64"
                  value={birthDayFrom}
                  onChange={(e) => setBirthDayFrom(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  生年月日 To
                </label>
                <input
                  type="date"
                  className="border rounded px-3 py-2 w-64"
                  value={birthDayTo}
                  onChange={(e) => setBirthDayTo(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error != null && (
            <div className="bg-red-100 text-red-700 p-4 rounded">
              ユーザー取得に失敗しました
            </div>
          )}
          {userList.length === 0 ? (
            <div className="text-gray-700 p-4 rounded">
              ユーザーが見つかりませんでした
            </div>
          ) : (
            <Table data={userList} columns={columns} keyField="id" />
          )}

          <Pagination
            page={page}
            limit={limit}
            totalCount={data?.total}
            onPageChange={(newPage) => setPage(newPage)}
            disableNext={false}
          />
        </div>
      </div>
    </div>
  );
}
