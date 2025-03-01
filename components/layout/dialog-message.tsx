"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {LoaderPinwheel} from 'lucide-react';


interface DialogMessagesProps {
  open: boolean;
}
function DialogMessages({open }: DialogMessagesProps) {

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="[&>button]:hidden"
      >
        <DialogTitle></DialogTitle>
        <DialogHeader className="flex items-center justify-center">
          <DialogDescription
            className="text-center flex flex-col items-center gap-y-4"
          >
            <span className="text-3xl font-bold text-slate-900 ">Play Transaction</span>
            <span className="text-xl text-slate-500 mb-4">Confirm transaction in your wallet</span>
            <span><LoaderPinwheel  className="h-10 w-10 animate-spin text-[#b18597]"/></span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DialogMessages;
