import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { BookingNannies } from "@/types/booking/booking";

interface ApproveBookingProps {
  confirmApprove: () => void;
  data?: BookingNannies | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  isPending?: boolean;
}

const ApproveBookingNanniesDialog = ({
  open,
  setOpen,
  confirmApprove,
  data,
  isPending,
}: ApproveBookingProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approve Booking?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to approve the booking request? Approved data
            cannot be returned.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className={buttonVariants({ variant: "default" })}
            onClick={confirmApprove}
          >
            Approve
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ApproveBookingNanniesDialog;
