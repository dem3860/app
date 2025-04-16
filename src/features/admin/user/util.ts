import {
  ListUsers200UsersItemGender,
  ListUsers200UsersItemRole,
} from "@/api/generated/schemas";

// 性別変換
export const formatGender = (gender: ListUsers200UsersItemGender): string => {
  switch (gender) {
    case "MALE":
      return "男性";
    case "FEMALE":
      return "女性";
    case "OTHER":
      return "その他";
    default:
      return "不明";
  }
};

// 権限変換
export const formatRole = (role: ListUsers200UsersItemRole): string => {
  switch (role) {
    case "ADMIN":
      return "管理者";
    case "USER":
      return "一般";
    default:
      return "不明";
  }
};
export const formatDateToJapanese = (isoDate: string): string => {
  if (!isoDate) return "不明";
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};
