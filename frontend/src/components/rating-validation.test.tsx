import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

function Status({ selected }: { selected: number }) {
  return <div>{selected === 10 ? "gültig" : "ungültig"}</div>;
}

describe("rating validation smoke", () => {
  it("zeigt gültig bei 10 Punkten", () => {
    render(<Status selected={10} />);
    expect(screen.getByText("gültig")).toBeTruthy();
  });
});
