import { useRef, useState } from "react";
import { FileUp, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UploadReceipt({ onUploaded }: { onUploaded?: (fileName: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  return (
    <div className="rounded-info border border-dashed border-gold/60 bg-surface p-5 text-center">
      <FileUp className="mx-auto h-8 w-8 text-gold-deep" strokeWidth={1.4} />
      <p className="mt-2 text-sm font-semibold text-foreground">Sube el comprobante de tu transferencia</p>
      <p className="mt-1 text-xs text-muted-foreground">Imagen o PDF. Subir el comprobante no confirma el pago hasta su aprobación.</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,application/pdf"
        className="sr-only"
        onChange={(event) => {
          const name = event.target.files?.[0]?.name ?? "comprobante.jpg";
          setFileName(name);
          onUploaded?.(name);
        }}
      />
      <Button type="button" variant="velvet" className="mt-4" onClick={() => inputRef.current?.click()}>
        <Paperclip /> Seleccionar archivo
      </Button>
      {fileName && (
        <p className="mt-3 text-xs font-semibold text-status-success" role="status">
          Adjuntado: {fileName}
        </p>
      )}
    </div>
  );
}
