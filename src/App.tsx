import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { InputDate } from "@/components/ui/input-date";
import { InputDateTime } from "@/components/ui/input-datetime";
import { InputPassword } from "@/components/ui/input-password";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function App() {
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
        comboboxPlaceholder="Seleccionar país"
        notFoundText="País no encontrado."
        searchPlaceholder="Buscar país..."
        items={[
          {
            label: "Colombia",
            value: "CO",
          },
          {
            label: "Venecozuela",
            value: "VE",
          },
          {
            label: "Perú",
            value: "PE",
          },
          {
            label: "Ecuador",
            value: "EC",
          },
        ]}
      />

      <InputDate />
      <InputDateTime />
    </>
  );
}

export default App;
