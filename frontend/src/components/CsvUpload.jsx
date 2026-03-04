import React, { useRef } from "react";

export function CsvUpload({ label, onUpload, example, accept = ".csv" }) {
  const fileInput = useRef();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      onUpload(evt.target.result, file.name);
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
        <button type="button" onClick={() => fileInput.current.click()}>
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
