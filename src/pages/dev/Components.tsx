import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import {
  FileUpload,
  FileUploadClear,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadList,
} from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { InputDate } from "@/components/ui/input-date";
import { InputDateTime } from "@/components/ui/input-datetime";
import { InputPassword } from "@/components/ui/input-password";
import ItemList from "@/components/ui/item-list";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Components() {
  const [files, setFiles] = useState<File[]>([]);
  const [comboValue, setComboValue] = useState<number | null>(null);
  const [itemListValue, setItemListValue] = useState<
    {
      country: string;
      currency: string;
    }[]
  >([]);
  return (
    <>
      <Button>Wenas</Button>
      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Option Two</Label>
        </div>
      </RadioGroup>
      <div className="items-top flex space-x-2">
        <Checkbox id="terms1" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
          <p className="text-sm text-muted-foreground">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
      <Badge>SSDSD</Badge>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
      <InputPassword />
      <Combobox
        value={comboValue}
        onChange={setComboValue}
        comboboxPlaceholder="Seleccionar país"
        notFoundText="País no encontrado."
        searchPlaceholder="Buscar país..."
        items={["Colombia", "Venecozuela"]}
      />
      <ItemList
        label="País"
        options={[
          {
            country: "Colombia",
            currency: "COP",
          },
          {
            country: "Venecozuela",
            currency: "Bolivar",
          },
        ]}
        value={itemListValue}
        onChange={setItemListValue}
        valueLabel="country"
      ></ItemList>
      <InputDate />
      <InputDateTime />

      <FileUpload value={files} onValueChange={setFiles} multiple>
        <FileUploadDropzone />

        <FileUploadList>
          {files.map((file) => (
            <FileUploadItem key={file.name} value={file} />
          ))}
        </FileUploadList>
        <FileUploadClear />
      </FileUpload>
    </>
  );
}
