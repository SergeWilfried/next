import { EyeOffIcon, EyeIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createElement, useState } from "react";
import { z } from "zod";
import { Box } from "../box";

export const passwordSchema = z
  .string({
    required_error: "Password can not be empty.",
  })
  .regex(/^.{8,20}$/, {
    message: "Minimum 8 and maximum 20 characters.",
  })
  .regex(/(?=.*[A-Z])/, {
    message: "At least one uppercase character.",
  })
  .regex(/(?=.*[a-z])/, {
    message: "At least one lowercase character.",
  })
  .regex(/(?=.*\d)/, {
    message: "At least one digit.",
  })
  .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
    message: "At least one special character.",
  });

type PasswordFieldProps = {
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export function PasswordField({
  name = "password",
  placeholder = "Enter password",
  value,
  onChange,
}: PasswordFieldProps) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <Box className="relative">
      <Input
        name={name}
        type={passwordVisibility ? "text" : "password"}
        autoComplete="on"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pr-12"
      />
      <Box
        className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
        onClick={() => setPasswordVisibility(!passwordVisibility)}
      >
        {createElement(passwordVisibility ? EyeOffIcon : EyeIcon, {
          className: "h-6 w-6",
        })}
      </Box>
    </Box>
  );
}