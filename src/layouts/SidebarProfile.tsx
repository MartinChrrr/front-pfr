import { useAuth } from "../hooks/useAuth";

export default function SidebarProfile() {
  const { user } = useAuth();
  const name = user ? `${user.first_name} ${user.last_name}` : "";
  const email = user?.email ?? "";
  return (
    <div className="flex items-center gap-[13px] rounded-[10px] bg-primary-300 px-4 py-4 w-[236px]">
      <div className="size-[30px] shrink-0 overflow-hidden rounded-full bg-gray-300">

      </div>
      <div className="min-w-0">
        <p className="truncate text-[13px] font-medium leading-[20px] text-white">
          {name}
        </p>
        <p className="truncate text-[13px] font-medium leading-[20px] text-white">
          {email}
        </p>
      </div>
    </div>
  );
}
