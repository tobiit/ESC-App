import React, { useRef } from "react";

interface CsvUploadProps {
  label: string;
  onUpload: (text: string, filename?: string) => void;
  example?: string;
  accept?: string;
}

export function CsvUpload({ label, onUpload, example, accept = ".csv" }: CsvUploadProps) {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const result = typeof evt.target?.result === "string" ? evt.target.result : "";
      onUpload(result, file.name);
    };
    reader.readAsText(file);
  };

  return (
    <div className="csv-upload">
      <label>
        {label}
        <input
          type="file"
          accept={accept}
          style={{ display: "none" }}
          ref={fileInput}
          onChange={handleFile}
        />
        <button type="button" onClick={() => fileInput.current?.click()}>
          Datei auswählen
        </button>
      </label>
      {example && (
        <a href={example} download style={{ marginLeft: 8 }}>
          Beispiel herunterladen
        </a>
      )}
    </div>
  );
}
