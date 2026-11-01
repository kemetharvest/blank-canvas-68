// Image keys the data panel can use. A row's image field is either one of these
// keys or a full https:// image link pasted into the panel.
import cardAmex from "@/assets/card-amex.webp";
import cardClassic from "@/assets/card-classic.webp";
import cardFlyPlus from "@/assets/card-fly-plus.webp";
import cardPlatinum from "@/assets/card-platinum.webp";
import cardTitanium from "@/assets/card-titanium.webp";
import cardWorldElite from "@/assets/card-world-elite.webp";
import cardWorld from "@/assets/card-world.webp";
import cardsFan from "@/assets/cards-fan.jpg";
import newsFintech from "@/assets/news-fintech.jpg";
import newsSchool from "@/assets/news-school.jpg";
import programInstallment from "@/assets/program-installment.webp";
import programInstantDiscount from "@/assets/program-instant-discount.webp";
import savingsBanner from "@/assets/savings-banner.jpg";
import slideCards3 from "@/assets/slide-cards-3cards.png";
import newsCareem from "@/assets/news-careem.jpg.asset.json";
import savingsWinners from "@/assets/savings-winners.jpg.asset.json";
import slide55 from "@/assets/slide-55.jpg.asset.json";
import slideAnsulema from "@/assets/slide-ansulema.jpg.asset.json";
import slideCashback from "@/assets/slide-cashback.jpg.asset.json";
import slideHousing from "@/assets/slide-housing.jpg.asset.json";
import slideMeu from "@/assets/slide-meu.jpg.asset.json";
import slideSchool from "@/assets/slide-school.jpg.asset.json";
import slideTawfeer from "@/assets/slide-tawfeer.jpg.asset.json";

const IMAGES: Record<string, string> = {
  "card-amex": cardAmex,
  "card-classic": cardClassic,
  "card-fly-plus": cardFlyPlus,
  "card-platinum": cardPlatinum,
  "card-titanium": cardTitanium,
  "card-world": cardWorld,
  "card-world-elite": cardWorldElite,
  "cards-fan": cardsFan,
  "news-careem": newsCareem.url,
  "news-fintech": newsFintech,
  "news-school": newsSchool,
  "program-installment": programInstallment,
  "program-instant-discount": programInstantDiscount,
  "savings-banner": savingsBanner,
  "savings-winners": savingsWinners.url,
  "slide-55": slide55.url,
  "slide-ansulema": slideAnsulema.url,
  "slide-cards-3cards": slideCards3,
  "slide-cashback": slideCashback.url,
  "slide-housing": slideHousing.url,
  "slide-meu": slideMeu.url,
  "slide-school": slideSchool.url,
  "slide-tawfeer": slideTawfeer.url,
};

export const IMAGE_KEYS = Object.keys(IMAGES).sort();

export function resolveImage(value: string | null | undefined): string {
  if (!value) return "";
  if (/^(https?:)?\/\//.test(value) || value.startsWith("/")) return value;
  return IMAGES[value] ?? "";
}
