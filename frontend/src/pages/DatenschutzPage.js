import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export function DatenschutzPage() {
    const [html, setHtml] = useState("");
    useEffect(() => {
        fetch("/datenschutz.html")
            .then((res) => res.text())
            .then(setHtml)
            .catch(() => setHtml("<p>Datenschutzerklärung konnte nicht geladen werden.</p>"));
    }, []);
    return (_jsx("div", { className: "shell", children: _jsxs("div", { className: "layout", children: [_jsx("div", { style: { textAlign: "center", padding: "1.5rem 0 0.5rem" }, children: _jsx(Link, { to: "/login", className: "btn btn-secondary", children: "\u2190 Zur\u00FCck zum Login" }) }), _jsx("div", { className: "card", dangerouslySetInnerHTML: { __html: html } })] }) }));
}
