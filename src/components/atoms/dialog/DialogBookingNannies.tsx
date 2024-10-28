import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogBookingNanniesProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  //   id: number;
  name: string;
}

export default function DialogBookingNannies({
  open,
  setOpen,
  name,
}: DialogBookingNanniesProps) {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Booking Nannies</DialogTitle>
            <DialogDescription>
              Do you want to book a nannies named {name}?
            </DialogDescription>
          </DialogHeader>
          <div></div>
        </DialogContent>
      </Dialog>
    </>
  );
}
