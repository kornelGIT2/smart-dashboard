import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { MachineDetailsCard } from "./MachineDetails";
import { BarChart3 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const SheetDetails = ({ dane }: { dane: any }) => {
  return (
    <Sheet>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <BarChart3 className="h-5 w-5" />
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>Szczegóły maszyny</TooltipContent>
      </Tooltip>

      <SheetContent side="bottom" className="h-auto max-h-[88vh]">
        <SheetHeader>
          <SheetTitle>Szczegóły maszyny</SheetTitle>
        </SheetHeader>

        <div className="mt-2 flex-1 overflow-y-auto px-4 pb-4">
          <MachineDetailsCard dane={dane ?? {}} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetDetails;
