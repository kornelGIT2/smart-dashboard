import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FilePenLine } from "lucide-react";
import RaportStratForm from "./RaportStratForm";
import { useState } from "react";

export default function RaportDrawer() {
  const [reportType, setReportType] = useState<"strata" | "awaria">("strata");

  return (
    <Sheet>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <FilePenLine className="h-5 w-5" />
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>Szybkie raportowanie</TooltipContent>
      </Tooltip>

      <SheetContent side="right" className="w-full sm:max-w-xl p-0">
        <SheetHeader>
          <SheetTitle>
            {reportType === "awaria" ? "Raportowanie awarii" : "Raportowanie strat"}
          </SheetTitle>
        </SheetHeader>

        <div className="px-4 pb-4 overflow-y-auto">
          <RaportStratForm onReportTypeChange={setReportType} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
