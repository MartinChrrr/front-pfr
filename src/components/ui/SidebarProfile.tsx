type SidebarProfileProps = {
  name: string;
  email: string;
  avatarUrl?: string;
};

export default function SidebarProfile({
  name,
  email,
  avatarUrl,
}: SidebarProfileProps) {
  return (
    <div className="flex items-center gap-[13px] rounded-[10px] bg-primary-300 px-4 py-4 w-[236px]">
      <div className="size-[30px] shrink-0 overflow-hidden rounded-full bg-gray-300">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={name}
            className="size-full object-cover"
          />
        )}
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
