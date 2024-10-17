import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type CustomdialogTriggerprops = {
  header?: string;
  content: React.ReactNode;
  children: React.ReactNode;
  description?: string;
  className?: string;
};

const CustomDialogTrigger = ({
  children,
  className,
  content,
  description,
  header,
}: CustomdialogTriggerprops) => {
  return (
    <Dialog>
      <DialogTrigger className={twMerge("", className)}>
        {children}
      </DialogTrigger>
      <DialogContent className="h-screen block sm:h-[440px] overflow-auto w-full">
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialogTrigger;
