import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
function Status({ selected }) {
    return _jsx("div", { children: selected === 10 ? "gültig" : "ungültig" });
}
describe("rating validation smoke", () => {
    it("zeigt gültig bei 10 Punkten", () => {
        render(_jsx(Status, { selected: 10 }));
        expect(screen.getByText("gültig")).toBeTruthy();
    });
});
