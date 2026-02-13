"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StrataFormData = {
  kodElementu: string;
  kategoria: string;
  czas: number;
  opis: string;
};

export default function RaportStratForm() {
  // Tworzymy formę z react-hook-form
  const form = useForm<StrataFormData>({
    defaultValues: {
      kodElementu: "",
      kategoria: "",
      czas: 0,
      opis: "",
    },
  });

  const onSubmit = (data: StrataFormData) => {
    console.log("Raport strat:", data);
    alert("Raport wysłany!");
    // tutaj API call
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg max-w-lg mx-auto space-y-4 w-full"
      >
        {/* Kod elementu */}
        <FormField
          control={form.control}
          name="kodElementu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kod elementu</FormLabel>
              <FormControl>
                <Input placeholder="Wprowadź kod elementu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Kategoria */}
        <FormField
          control={form.control}
          name="kategoria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategoria</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Wybierz kategorię" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maszyna">Maszyna</SelectItem>
                    <SelectItem value="material">Materiał</SelectItem>
                    <SelectItem value="operator">Operator</SelectItem>
                    <SelectItem value="inne">Inne</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Czas */}
        <FormField
          control={form.control}
          name="czas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Czas [min]</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="Czas straty w minutach"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Opis */}
        <FormField
          control={form.control}
          name="opis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis problemu</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Opisz szczegóły straty..."
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-2 font-semibold text-black">
          Zgłoś stratę
        </Button>
      </form>
    </Form>
  );
}
