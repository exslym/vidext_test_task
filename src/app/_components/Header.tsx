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
        "relative z-10 p-2 flex w-full bg-gray-primary dark:bg-dark-primary shadow-inset-bottom-lightgray dark:shadow-inset-bottom-black",
        classes
      )}
    >
      {children}
    </header>
  );
};
export default Header;
