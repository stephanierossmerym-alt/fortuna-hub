import { Delete } from "lucide-react";
import { cn } from "@/lib/utils";

type NumberPadProps = {
  value: string;
  digits: number;
  onChange: (next: string) => void;
  className?: string;
};

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "back"] as const;

export function NumberPad({ value, digits, onChange, className }: NumberPadProps) {
  const press = (key: string) => {
    if (key === "clear") return onChange("");
    if (key === "back") return onChange(value.slice(0, -1));
    if (value.length >= digits) return;
    onChange(value + key);
  };

  return (
    <div className={cn("mx-auto w-full max-w-xs", className)}>
      <div className="mb-4 flex justify-center gap-2" aria-live="polite">
        {Array.from({ length: digits }).map((_, index) => (
          <span
            key={index}
            className="flex h-16 w-12 items-center justify-center rounded-button border border-gold/60 bg-card text-3xl font-extrabold tabular-nums text-foreground"
          >
            {value[index] ?? ""}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {keys.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => press(key)}
            aria-label={key === "back" ? "Borrar último dígito" : key === "clear" ? "Limpiar" : `Número ${key}`}
            className="flex min-h-14 items-center justify-center rounded-button border border-gold/45 bg-card text-xl font-bold tabular-nums text-foreground transition-transform active:scale-[0.98]"
          >
            {key === "back" ? <Delete className="h-5 w-5 text-gold-deep" /> : key === "clear" ? <span className="text-xs font-bold uppercase tracking-[0.14em] text-gold-deep">Limpiar</span> : key}
          </button>
        ))}
      </div>
    </div>
  );
}
