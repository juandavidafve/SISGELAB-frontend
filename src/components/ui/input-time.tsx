import { useState, useEffect } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { InputNumber } from "./input-number";

interface InputTimeProps {
  value: string;
  onChange: (value: string) => void;
}

export function InputTime({ value, onChange }: InputTimeProps) {
  const [hours, setHours] = useState(() => parseTime(value).hours);
  const [minutes, setMinutes] = useState(() => parseTime(value).minutes);
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  function parseTime(time: string) {
    const [h, m] = time.split(":");
    const hNum = parseInt(h);
    const mNum = parseInt(m);

    return {
      hours: !isNaN(hNum) ? hNum : 0,
      minutes: !isNaN(mNum) ? mNum : 0,
    };
  }

  function appendZero(num: number) {
    return num > 9 ? num : `0${num}`;
  }

  useEffect(() => {
    const h = period === "PM" ? (hours % 12) + 12 : hours % 12;
    const time = `${appendZero(h)}:${appendZero(minutes)}`;
    onChange(time);
  }, [hours, minutes, period]);

  return (
    <div className="flex items-center gap-2">
      <InputNumber
        value={hours}
        onChange={setHours}
        min={1}
        max={12}
        className="w-12 text-center"
      />

      <span>:</span>

      <InputNumber
        value={minutes}
        onChange={setMinutes}
        min={0}
        max={59}
        className="w-12 text-center"
      />

      <Select
        value={period}
        onValueChange={(val) => setPeriod(val as "AM" | "PM")}
      >
        <SelectTrigger className="w-fit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
