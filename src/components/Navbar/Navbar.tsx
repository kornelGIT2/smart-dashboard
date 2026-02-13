import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { LogOut, RefreshCw, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import SheetDetails from "../MachineDetails/SheetDetails";
import { useState } from "react";
import AIChatPanel from "../Assistent AI/AssistentAI";
import RaportDrawer from "../RaportForm/RaportDrawer";

type NavbarDBProps = {
  dane?: any;
  onRefresh?: () => void;
};

export default function NavbarDB({ dane, onRefresh }: NavbarDBProps) {
  const [aiOpen, setAiOpen] = useState(false);
  const machineName =
    dane?.nazwaMaszyny ?? dane?.nazwa_maszyny ?? dane?.maszyna ?? "Holzma";

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 h-16 bg-white shadow-md flex items-center justify-between px-6">
        <div className="text-lg font-semibold">{machineName}</div>

        <TooltipProvider>
          <div className="flex items-center gap-2">
            {/* Refresh */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" onClick={onRefresh}>
                  <RefreshCw className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Odśwież dane</TooltipContent>
            </Tooltip>
            {/* Szczegóły */}
            <SheetDetails dane={dane} />
            <RaportDrawer />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setAiOpen(!aiOpen)}
                >
                  <MessageSquare className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Asystent AI</TooltipContent>
            </Tooltip>

            {/* Logout */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost">
                  <LogOut className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Wyloguj</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </header>

      <AIChatPanel open={aiOpen} setOpen={setAiOpen} />
    </>
  );
}
