import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const baseClasses = `
  inline-flex items-center justify-start gap-[5px]
  px-[15px] py-[8px]
  rounded-md
  transition-colors
`;

const variants: Record<ButtonVariant, string> = {
  primary: `
    bg-primary-500 text-white rounded-[10px]
    hover:bg-primary-700
  `,
  outline: `
    bg-white text-black rounded-[10px]
    shadow-[inset_0_0_0_1px_#000]
    hover:shadow-[inset_0_0_0_2px_#000]
  `,
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
