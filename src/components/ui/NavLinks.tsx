"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const links = [
  { name: "Home", href: "/admin", icon: HomeIcon },
  { name: "User", href: "/admin/user", icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3
              ${
                isActive
                  ? "bg-sky-100 text-blue-600"
                  : "bg-gray-100 text-gray-300 hover:bg-sky-100 hover:text-blue-600"
              }
            `}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
