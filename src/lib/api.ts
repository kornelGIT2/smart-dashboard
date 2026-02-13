import axios from 'axios';

export const askChat = async (prompt: string): Promise<string> => {
    console.log("Wysyłanie zapytania do API:", prompt);
  const response = await axios.post('http://127.0.0.1:8000/generate', { text: prompt } );
  return response.data.response;
};
