import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import slideAnsulema from "@/assets/slide-ansulema.jpg.asset.json";
import slideHousing from "@/assets/slide-housing.jpg.asset.json";
import slideCashback from "@/assets/slide-cashback.jpg.asset.json";
import slideTawfeer from "@/assets/slide-tawfeer.jpg.asset.json";
import slideSchool from "@/assets/slide-school.jpg.asset.json";
import slide55 from "@/assets/slide-55.jpg.asset.json";
import slideMeu from "@/assets/slide-meu.jpg.asset.json";
import slideCards3 from "@/assets/slide-cards-3cards.png";

type Slide = {
  id: string;
  image: string;
  alt: string;
  headline?: string;
};

const SLIDES: Slide[] = [
  {
    id: "ansulema",
    image: slideAnsulema.url,
    alt: "الأنسليمة — تمليك عقد في الأردن بفائدة 0% على 4 سنوات",
  },
  {
    id: "cards-cashback",
    image: slideCards3,
    alt: "بطاقات البنك الائتمانية — كاش باك على جميع البطاقات، فعّل الآن واحصل على الاسترداد",
    headline: "كاش باك على جميع البطاقات\nفعّل الآن واحصل على الاسترداد",
  },
  {
    id: "housing",
    image: slideHousing.url,
    alt: "بيت الأحلام ما رح يحلم! امتلك بيتك اليوم بنسبة فائدة ثابتة 4.99% لأول 3 سنوات وتمويل لغاية 100%",
  },
  {
    id: "cashback",
    image: slideCashback.url,
    alt: "كاش باك بفائدة 3.5% وبحد أعلى 200 دينار بس تدفع بأي من بطاقات ماستركارد الائتمانية",
  },
  {
    id: "tawfeer",
    image: slideTawfeer.url,
    alt: "حسابات التوفير الجوائز قدرة — اقتنع أو غَح حسابات التوفير الجوائز ولا تقنوت فرصتك للربح!",
  },
  {
    id: "school",
    image: slideSchool.url,
    alt: "طريقة أسمال! قشر رسوم المدارس والمجاميع بفائدة 0% وفترة سداد مرنة لغاية 12 شهراً باستخدام بطاقات ماستركارد الائتمانية",
  },
  {
    id: "55",
    image: slide55.url,
    alt: "خمسين سنة بين أهلنا وناسنا",
  },
  {
    id: "meu",
    image: slideMeu.url,
    alt: "بكالوريوس أو ماجستير؟ كمّل مشوارك الجامعي بقرة — 0% فائدة على الطالب وفرصة سداد مرنة لغاية 5 سنوات",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % SLIDES.length),
      6000
    );
    return () => clearInterval(timer);
  }, [index]);

  const slide = SLIDES[index]!;

  return (
    <section className="relative overflow-hidden" aria-roledescription="carousel">
      <div key={slide.id} className="animate-in fade-in duration-700">
        <div className="relative">
          <Link
            to="/cards"
            aria-label="افتح صفحة البطاقات"
            className="block cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="aspect-[768/570] w-full object-cover sm:aspect-[16/7] lg:aspect-[16/5]"
            />
            {slide.headline && (
              <div className="absolute inset-y-0 start-0 flex w-1/2 items-center ps-4 sm:ps-10">
                <h2 className="whitespace-pre-line text-lg font-bold leading-snug text-primary-foreground drop-shadow-md sm:text-2xl sm:leading-tight lg:text-3xl">
                  {slide.headline}
                </h2>
              </div>
            )}
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2 sm:bottom-4">
        {SLIDES.map((item, barIndex) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(barIndex)}
            aria-label={`الشريحة ${barIndex + 1}`}
            aria-current={barIndex === index}
            className={`h-1 w-9 rounded-full shadow-sm transition-colors sm:w-14 ${
              barIndex === index ? "bg-white" : "bg-white/45"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
