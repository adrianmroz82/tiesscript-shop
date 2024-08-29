import { ChangeEvent } from "react";

import { Input } from "@/components/shadcn-ui/input";

interface Props {
  label: string;
  name: string;
  value: string | number;
  onChange: (_e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function AddProductTextInput({ label, name, value, onChange }: Props) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name}>{label}</label>
      <Input id={name} name={name} value={value} onChange={onChange} />
    </div>
  );
}
