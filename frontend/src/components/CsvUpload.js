import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
export function CsvUpload({ label, onUpload, example, accept = ".csv" }) {
    const fileInput = useRef(null);
    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            const result = typeof evt.target?.result === "string" ? evt.target.result : "";
            onUpload(result, file.name);
        };
        reader.readAsText(file);
    };
    return (_jsxs("div", { className: "csv-upload", children: [_jsxs("label", { children: [label, _jsx("input", { type: "file", accept: accept, style: { display: "none" }, ref: fileInput, onChange: handleFile }), _jsx("button", { type: "button", onClick: () => fileInput.current?.click(), children: "Datei ausw\u00E4hlen" })] }), example && (_jsx("a", { href: example, download: true, style: { marginLeft: 8 }, children: "Beispiel herunterladen" }))] }));
}
