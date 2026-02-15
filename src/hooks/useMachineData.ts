import { useQuery } from "@tanstack/react-query";
import { getHistoryMachineData, getLatestMachineData } from "@/lib/api";
import type { MachineData } from "@/types";

export const useGetLatestMachineData = () => {
  return useQuery<MachineData>({
    queryKey: ["latestMachineData"],
    queryFn: getLatestMachineData,
  });
};

export const useGetHistoryMachineData = () => {
  return useQuery<MachineData[]>({
    queryKey: ["historyMachineData"],
    queryFn: getHistoryMachineData,
  });
};