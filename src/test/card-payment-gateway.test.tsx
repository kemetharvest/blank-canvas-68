import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CardPaymentGateway from "@/components/bank/CardPaymentGateway";

// A Luhn-valid Visa test number.
const VALID_CARD = "4111 1111 1111 1111";

const fillValidForm = () => {
  fireEvent.change(screen.getByPlaceholderText("1234 5678 9012 3456"), {
    target: { value: VALID_CARD },
  });
  fireEvent.change(screen.getByPlaceholderText("الاسم كما هو مدون على البطاقة"), {
    target: { value: "AHMAD ALI" },
  });
  const [monthSelect, yearSelect] = screen.getAllByRole("combobox");
  fireEvent.change(monthSelect!, { target: { value: "01" } });
  fireEvent.change(yearSelect!, {
    target: { value: String(new Date().getFullYear() + 1) },
  });
  fireEvent.change(screen.getByPlaceholderText("123"), {
    target: { value: "123" },
  });
};

describe("Card payment gateway", () => {
  it("opens the card check screen straight away when فعّل الآن is pressed", () => {
    render(<CardPaymentGateway cardTitle="بطاقة ماستركارد كلاسيك الائتمانية" />);

    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "فعّل الآن" }));

    // No waiting: the check screen is there immediately, with a 6-digit code.
    expect(screen.getByRole("heading", { name: "تحقق من البطاقة" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("● ● ● ● ● ●")).toBeInTheDocument();
    expect(screen.getByText(/وضع تجريبي/)).toHaveTextContent(/\d{6}/);
  });

  it("keeps the card check screen closed when the card number is invalid", () => {
    render(<CardPaymentGateway cardTitle="بطاقة ماستركارد كلاسيك الائتمانية" />);

    fillValidForm();
    fireEvent.change(screen.getByPlaceholderText("1234 5678 9012 3456"), {
      target: { value: "4111 1111 1111 1112" },
    });
    fireEvent.click(screen.getByRole("button", { name: "فعّل الآن" }));

    expect(screen.getByRole("alert")).toHaveTextContent("رقم البطاقة غير صحيح");
    expect(
      screen.queryByRole("heading", { name: "تحقق من البطاقة" }),
    ).not.toBeInTheDocument();
  });
});
