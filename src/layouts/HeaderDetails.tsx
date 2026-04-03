import { useNavigate } from "react-router";
import Button from "../components/ui/Button";
import DropdownButton, { type DropdownItem } from "../components/ui/DropdownButton";
import { MoveLeft, type LucideIcon } from 'lucide-react';

export type ButtonProps = {
    title: string;
    icon?: LucideIcon;
    onClick?: () => void;
}

export type HeaderDetailsProps = {
    title: string;
    buttonPrimary: ButtonProps;
    buttonSecondary?: ButtonProps;
    buttonTertiary?: ButtonProps;
};

export default function HeaderDetails({ title, buttonPrimary, buttonSecondary, buttonTertiary }: HeaderDetailsProps) {
  const navigate = useNavigate();

  const mobileMenuItems: DropdownItem[] = [
    ...(buttonTertiary?.onClick ? [{ label: buttonTertiary.title, icon: buttonTertiary.icon ? <buttonTertiary.icon size={18} /> : undefined, onClick: buttonTertiary.onClick }] : []),
    ...(buttonSecondary?.onClick ? [{ label: buttonSecondary.title, icon: buttonSecondary.icon ? <buttonSecondary.icon size={18} /> : undefined, onClick: buttonSecondary.onClick }] : []),
    ...(buttonPrimary?.onClick ? [{ label: buttonPrimary.title, icon: buttonPrimary.icon ? <buttonPrimary.icon size={18} /> : undefined, onClick: buttonPrimary.onClick }] : []),
  ];

  return (
    <div className="flex bg-white px-1.25 py-1.25 w-full">
        <div className="flex flex-row justify-between items-center w-full px-5 py-2.5">
            <Button variant="outline" onClick={() => navigate(-1)}>
                <MoveLeft size={18}/>
                <p>Retour</p>
            </Button>

            <h2 className="text-xl font-bold">{title}</h2>

            {/* Desktop: boutons visibles */}
            <div className="hidden md:flex gap-10">
              {buttonTertiary && (<Button variant="outline" onClick={buttonTertiary?.onClick}>
                  {buttonTertiary?.icon && <buttonTertiary.icon size={18}/>}
                  <p>{buttonTertiary?.title}</p>
              </Button>)}
              {buttonSecondary && (<Button variant="outline" onClick={buttonSecondary?.onClick}>
                  {buttonSecondary?.icon && <buttonSecondary.icon size={18}/>}
                  <p>{buttonSecondary?.title}</p>
              </Button>)}
              <Button variant="primary" onClick={buttonPrimary?.onClick}>
                  {buttonPrimary?.icon && <buttonPrimary.icon size={18}/>}
                  <p>{buttonPrimary?.title}</p>
              </Button>
            </div>

            {/* Mobile: menu "..." */}
            {mobileMenuItems.length > 0 && (
              <div className="md:hidden">
                <DropdownButton items={mobileMenuItems} iconSize={20} />
              </div>
            )}
        </div>
    </div>
  );
}