import { useEffect, useMemo, useRef, useState } from "react";
import {
  Lock,
  ShieldCheck,
  CreditCard as CardIcon,
  CalendarDays,
  User as UserIcon,
  KeyRound,
} from "lucide-react";
import visaLogo from "@/assets/payments/visa.svg";
import mastercardLogo from "@/assets/payments/mastercard.svg";
import { cardErrorMessage } from "@/lib/card-validation";

const formatCardNumber = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

const inputBase =
  "h-[44px] w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-ring focus:ring-2 focus:ring-ring/30";

type Phase = "idle" | "verifying" | "approved";

const Field = ({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <div>
    <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-foreground">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2.2} />
      <span>{label}</span>
    </label>
    {children}
  </div>
);

/**
 * Demo payment gateway embedded under each card's details.
 * Front-end simulation only: card data is validated in the browser and never
 * sent anywhere or stored. Pressing "فعّل الآن" opens the card check screen
 * straight away.
 */
export default function CardPaymentGateway({ cardTitle }: { cardTitle: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [verifyCode, setVerifyCode] = useState("");

  const months = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    [],
  );
  const years = useMemo(() => {
    const y = new Date().getFullYear();
    return Array.from({ length: 12 }, (_, i) => String(y + i));
  }, []);

  // Auto-scroll to top when the card check screen takes over. Inside the card
  // dialog the overlay can land below the fold, so scroll both the page and
  // the dialog body to the top.
  useEffect(() => {
    if (phase !== "verifying") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    const dialogBody = sectionRef.current?.closest(
      "[data-radix-dialog-content]",
    );
    if (dialogBody) dialogBody.scrollTo({ top: 0, behavior: "smooth" });
  }, [phase]);

  const isValid =
    card.replace(/\s/g, "").length >= 15 &&
    name.trim().length >= 3 &&
    month &&
    year &&
    cvv.length >= 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = cardErrorMessage({ card, name, month, year, cvv });
    if (validationError) {
      setError(validationError);
      return;
    }
    // Demo only — no data leaves the browser: the verification code is
    // generated here and the card check screen opens straight away.
    setError(null);
    setVerifyCode(String(Math.floor(100000 + Math.random() * 900000)));
    setPhase("verifying");
  };

  const confirmOtp = () => {
    if (otp !== verifyCode) {
      setOtpError("رمز التحقق غير صحيح، حاول مرة أخرى.");
      return;
    }
    setOtpError(null);
    setPhase("approved");
  };

  const resendOtp = () => {
    setVerifyCode(String(Math.floor(100000 + Math.random() * 900000)));
    setOtp("");
    setOtpError(null);
  };

  const reset = () => {
    setPhase("idle");
    setCard("");
    setName("");
    setMonth("");
    setYear("");
    setCvv("");
    setError(null);
    setOtp("");
    setOtpError(null);
    setVerifyCode("");
  };

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      aria-label={`بوابة الدفع — ${cardTitle}`}
      className="mt-6 rounded-2xl border border-border bg-bank-lighter p-4 sm:p-5"
    >
      <div className="text-center">
        <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
          <Lock className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
        </div>
        <h3 className="text-base font-extrabold text-primary">بوابة الدفع الآمن</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          أدخل بيانات بطاقتك لتفعيل {cardTitle}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5">
        <img src={visaLogo} alt="Visa" className="h-5 w-auto sm:h-6" loading="lazy" />
        <span className="h-5 w-px bg-border" aria-hidden="true" />
        <img
          src={mastercardLogo}
          alt="Mastercard"
          className="h-6 w-auto sm:h-7"
          loading="lazy"
        />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3" noValidate>
        <Field label="رقم البطاقة" icon={CardIcon}>
          <input
            inputMode="numeric"
            dir="ltr"
            value={card}
            onChange={(e) => setCard(formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            className={`${inputBase} text-left tracking-widest`}
          />
        </Field>

        <Field label="اسم حامل البطاقة" icon={UserIcon}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 60))}
            placeholder="الاسم كما هو مدون على البطاقة"
            className={inputBase}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="شهر الانتهاء" icon={CalendarDays}>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className={inputBase}
            >
              <option value="">الشهر</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Field>
          <Field label="سنة الانتهاء" icon={CalendarDays}>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={inputBase}
            >
              <option value="">السنة</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="رمز الأمان (CVV)" icon={KeyRound}>
          <input
            inputMode="numeric"
            dir="ltr"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="123"
            className={`${inputBase} text-left tracking-widest`}
          />
        </Field>

        {error && (
          <p role="alert" className="text-xs font-semibold text-destructive">
            {error}
          </p>
        )}

        {/* فعّل الآن — the activation button sits under the gateway form */}
        <button
          type="submit"
          className={`mt-1 flex h-[48px] w-full items-center justify-center gap-2 rounded-lg text-sm font-extrabold shadow-sm transition-all ${
            isValid
              ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.99]"
              : "cursor-not-allowed bg-primary/40 text-primary-foreground"
          }`}
        >
          <Lock className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
          <span>فعّل الآن</span>
        </button>

        <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.2} aria-hidden="true" />
          <span>عملية الدفع مشفّرة وآمنة بالكامل</span>
        </div>
      </form>

      {phase === "verifying" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/20 px-4 backdrop-blur-sm">
          <div className="w-full max-w-[440px] rounded-2xl bg-card p-6 text-center shadow-xl">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
              <KeyRound className="h-7 w-7" strokeWidth={2.2} aria-hidden="true" />
            </div>
            <h4 className="text-lg font-extrabold text-primary">تحقق من البطاقة</h4>
            <p className="mt-1 text-xs leading-6 text-muted-foreground">
              أرسلنا رمز تحقق من 6 أرقام إلى رقم الجوال المسجل لدى البنك.
            </p>
            <div className="mt-3 rounded-lg border border-dashed border-primary/40 bg-primary/5 px-3 py-2 text-xs font-bold text-primary">
              وضع تجريبي — الرمز: <span dir="ltr">{verifyCode}</span>
            </div>
            <input
              dir="ltr"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                setOtpError(null);
              }}
              placeholder="● ● ● ● ● ●"
              className={`${inputBase} mt-4 text-center text-lg font-extrabold tracking-[0.4em]`}
            />
            {otpError && (
              <p role="alert" className="mt-2 text-xs font-semibold text-destructive">
                {otpError}
              </p>
            )}
            <button
              type="button"
              onClick={confirmOtp}
              disabled={otp.length < 6}
              className={`mt-4 h-[48px] w-full rounded-lg text-sm font-extrabold shadow-sm transition-all ${
                otp.length === 6
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.99]"
                  : "cursor-not-allowed bg-primary/40 text-primary-foreground"
              }`}
            >
              تأكيد الرمز
            </button>
            <button
              type="button"
              onClick={resendOtp}
              className="mt-2 text-xs font-semibold text-bank-link hover:opacity-80"
            >
              إعادة إرسال الرمز
            </button>
          </div>
        </div>
      )}

      {phase === "approved" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/20 px-4 backdrop-blur-sm">
          <div className="w-full max-w-[420px] rounded-2xl bg-card p-6 text-center shadow-xl">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-emerald-600/10 text-emerald-600">
              <ShieldCheck className="h-7 w-7" strokeWidth={2.2} aria-hidden="true" />
            </div>
            <h4 className="text-lg font-extrabold text-primary">تم تفعيل البطاقة</h4>
            <p className="mt-1 text-xs leading-6 text-muted-foreground">
              تمت الموافقة على عملية التفعيل بنجاح، وستصلك رسالة تأكيد من البنك.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-5 h-[44px] w-full rounded-lg bg-primary text-sm font-extrabold text-primary-foreground hover:bg-primary/90"
            >
              حسناً
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
