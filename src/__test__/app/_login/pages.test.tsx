// __tests__/Login.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "@/app/login/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Mock next-auth useSession
jest.mock("next-auth/react");

// Mock next/navigation useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Login Component", () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    (useRouter as jest.Mock).mockReturnValue({
      replace: jest.fn(),
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form", () => {
    render(<Login />);
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("allows user to input username and password and submit", async () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "itsupport" } });
    fireEvent.change(passwordInput, { target: { value: "Admin@123" } });

    expect(usernameInput).toHaveValue("itsupport");
    expect(passwordInput).toHaveValue("Admin@123");

    // Mock axios post response here or mock fetchData as needed
    // For demo, just click submit and expect something

    fireEvent.click(submitButton);

     });
});
