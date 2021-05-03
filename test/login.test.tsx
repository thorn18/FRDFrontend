import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Navbar from "../src/components/Navbar/Navbar";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

