"use client"

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { Control, UseFormSetValue } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const countries = [
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" },
    { label: "Australia", value: "au" },
    { label: "Germany", value: "de" },
    { label: "France", value: "fr" },
    { label: "Japan", value: "jp" },
    { label: "Brazil", value: "br" },
    { label: "India", value: "in" },
    { label: "South Africa", value: "za" },
    { label: "Nigeria", value: "ng" },
    { label: "Mexico", value: "mx" },
    { label: "Argentina", value: "ar" },
    { label: "Chile", value: "cl" },
    { label: "Colombia", value: "co" },
    { label: "Peru", value: "pe" },
    { label: "Venezuela", value: "ve" },
    { label: "Burkina Faso", value: "bf" },
    { label: "Togo", value: "tg" },
    { label: "Cote d'Ivoire", value: "ci" },
    { label: "Senegal", value: "sn" },
    { label: "Mali", value: "ml" },
    { label: "Niger", value: "ne" },
    { label: "Chad", value: "td" },
    { label: "Central African Republic", value: "cf" },
    { label: "Democratic Republic of the Congo", value: "cd" },
    { label: "Republic of the Congo", value: "cg" },
  ] as const

interface CountrySelectProps {
  control: Control<any>
  setValue: UseFormSetValue<any>
  name: string
}

export function CountrySelect({ control, setValue, name }: CountrySelectProps) {
  const [open, setOpen] = useState(false)
  const [value, setSearchValue] = useState("")

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Country</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? countries.find(
                        (country) => country.value === field.value
                      )?.label
                    : "Select country"}
                  <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search country..."
                  className="h-9"
                  onValueChange={(search) => setSearchValue(search)}
                />
                <CommandList>
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    {countries
                      .filter((country) =>
                        country.label.toLowerCase().includes(value.toLowerCase())
                      )
                      .map((country) => (
                        <CommandItem
                          value={country.label}
                          key={country.value}
                          onSelect={() => {
                            setValue(name, country.value)
                            setOpen(false)
                          }}
                        >
                          {country.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto size-4",
                              country.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>
            This is the country that will be used in the dashboard.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
