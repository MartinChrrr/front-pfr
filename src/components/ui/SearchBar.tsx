import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder = "Rechercher..." }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-placeholder" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-text-placeholder py-2 pl-10 pr-3 outline-none focus:border-primary-300"
      />
    </div>
  );
}
