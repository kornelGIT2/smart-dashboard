import axios from 'axios';
import type { MachineData } from '@/types';

export const askChat = async (prompt: string): Promise<string> => {
  const response = await axios.post('http://127.0.0.1:8000/generate', { text: prompt } );
  return response.data.response;
};

export const getLatestMachineData = async (): Promise<MachineData> => {
  const response = await axios.get('http://127.0.0.1:8000/api/machine-data/latest');
  return response.data;
};

export const getHistoryMachineData= async (): Promise<MachineData[]> => {
  const response = await axios.get('http://127.0.0.1:8000/api/machine-data/history');
  return response.data;
};