"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import ButtonApp from "@/components/ui/button-app";
import Image from "next/image";
import { useMemo } from "react";

interface DialogStatusProps {
  data: DataStatusProps;
  open: boolean;
  resetGame: () => void;
}

interface DataStatusProps {
  status: string;
  message: string;
  point: number;
}

function DialogStatus({ data, open, resetGame }: DialogStatusProps) {
  const { status, message, point } = data;
  const onchangeDialog = (value: boolean) => {
    if (!value) {
      resetGame();
    }
  };

  const ImageStatus = () => {
    if (status === "win")
      return (
        <Image
          src="/win.gif"
          alt="status"
          unoptimized
          width={200}
          height={200}
        />
      );
    if (status === "lose")
      return (
        <Image
          src="/lose.gif"
          alt="status"
          unoptimized
          width={200}
          height={200}
        />
      );
    return (
      <Image src="/tie.gif" alt="status" unoptimized width={200} height={200} />
    );
  };

  const classStatus = useMemo(() => {
    if (status === "win") return "text-yellow-400";
    if (status === "tie") return "text-green-400";
  }, [status]);

  return (
    <Dialog open={open} onOpenChange={onchangeDialog}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogTitle></DialogTitle>
        <DialogHeader className="flex items-center justify-center">
          {status && <ImageStatus />}
          <DialogDescription
            className={` ${classStatus} text-3xl font-extrabold text-center flex flex-col items-center`}
          >
            {message}
            <span>
              <span className="text-slate-700">Earn Points: </span> {point}
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <ButtonApp className="h-12 w-1/2 mx-auto my-auto mb-4 rounded-2xl">
            Continue
          </ButtonApp>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default DialogStatus;
