"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface IHeaderProps {
  classes?: string;
  children?: ReactNode;
}

export const Header: React.FC<IHeaderProps> = ({
  children,
  classes,
}: IHeaderProps) => {
  return (
    <header
      className={cn(
        "relative z-10 p-2 flex w-full bg-gray-primary [box-shadow:inset_0_-1px_lightgray] dark:bg-dark-primary dark:[box-shadow:inset_0_-1px_black]",
        classes
      )}
    >
      {children}
    </header>
  );
};
export default Header;
