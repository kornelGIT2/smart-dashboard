import { useMutation } from '@tanstack/react-query';
import { askChat } from '@/lib/api';

export const useAskChat = () => {
  return useMutation<string, Error, string>({
    mutationFn: async (prompt: string) => {
      return askChat(prompt);
    },
  });
};
