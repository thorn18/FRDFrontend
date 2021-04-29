import React from "react";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import Navbar from "../src/components/Navbar/Navbar";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("test login menu", () => {
  it("renders with menu closed", () => {
    render(<Navbar />);

    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });
  
  it("renders the menu button when open", async () => {
    const { getByTestId, getByRole } = render(<Navbar />);

    fireEvent.click(getByTestId('login-link'));

    expect(getByRole('button')).toBeVisible();
  })
})