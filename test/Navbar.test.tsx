import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Navbar from "../src/components/Navbar/Navbar";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("test login menu", () => {
  it("renders with menu closed", () => {
    const { getAllByRole } = render(<Navbar />);

    expect(getAllByRole('button')).toHaveLength(1);
  });
  
  it("renders the menu button when open", async () => {
    const { getByTestId } = render(<Navbar />);

    fireEvent.click(getByTestId('toggle-btn'));

    expect(getByTestId('login-link')).toBeVisible();
  })
})