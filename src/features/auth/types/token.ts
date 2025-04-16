// JWT デコード用型
export type DecodedToken = {
  role: "ADMIN" | "USER";
  exp: number;
};
