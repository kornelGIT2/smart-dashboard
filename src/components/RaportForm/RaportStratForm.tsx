"use client";

import { useEffect } from "react";
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
import { Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StrataFormData = {
  typRaportu: "strata" | "awaria";
  kodElementu: string;
  kategoria: string;
  czas: number;
  kodAwarii: string;
  priorytetAwarii: string;
  opis: string;
};

type RaportStratFormProps = {
  onReportTypeChange?: (type: StrataFormData["typRaportu"]) => void;
};

export default function RaportStratForm({ onReportTypeChange }: RaportStratFormProps) {
  const form = useForm<StrataFormData>({
    defaultValues: {
      typRaportu: "strata",
      kodElementu: "",
      kategoria: "",
      czas: 0,
      kodAwarii: "",
      priorytetAwarii: "",
      opis: "",
    },
  });

  const typRaportu = form.watch("typRaportu");
  const isAwariaReport = typRaportu === "awaria";

  useEffect(() => {
    onReportTypeChange?.(typRaportu);
  }, [typRaportu, onReportTypeChange]);

  const onSubmit = (data: StrataFormData) => {
    console.log("Raport:", data);
    alert(isAwariaReport ? "Raport awarii wysłany!" : "Raport strat wysłany!");
    // tutaj API call
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="typRaportu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Typ raportu</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz typ raportu" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="strata">Raport strat</SelectItem>
                    <SelectItem value="awaria">Raport awarii</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kodElementu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kod elementu / stanowiska</FormLabel>
                <FormControl>
                  <Input placeholder="Wprowadź kod elementu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kategoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategoria</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz kategorię" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="maszyna">Maszyna</SelectItem>
                    <SelectItem value="material">Materiał</SelectItem>
                    <SelectItem value="operator">Operator</SelectItem>
                    <SelectItem value="inne">Inne</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="czas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isAwariaReport ? "Czas przestoju [min]" : "Czas straty [min]"}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder={isAwariaReport ? "Czas przestoju awarii" : "Czas straty w minutach"}
                    value={field.value || ""}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isAwariaReport && (
            <>
              <FormField
                control={form.control}
                name="kodAwarii"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kod awarii</FormLabel>
                    <FormControl>
                      <Input placeholder="Np. AW-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priorytetAwarii"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priorytet awarii</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz priorytet" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="niski">Niski</SelectItem>
                        <SelectItem value="sredni">Średni</SelectItem>
                        <SelectItem value="krytyczny">Krytyczny</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        <FormField
          control={form.control}
          name="opis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isAwariaReport ? "Opis awarii" : "Opis problemu"}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    isAwariaReport
                      ? "Opisz objawy i przebieg awarii..."
                      : "Opisz szczegóły straty..."
                  }
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            className="group text-black w-full md:w-auto min-w-48 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <Send className="h-4 w-4 text-black transition-transform duration-200 group-hover:translate-x-0.5" />
            {isAwariaReport ? "Zgłoś awarię" : "Zgłoś stratę"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
