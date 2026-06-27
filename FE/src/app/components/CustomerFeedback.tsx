import { useState } from "react";
import { Star } from "lucide-react";
import imgCustomerMoment from "../../assets/customer-feedback-lifestyle.png";

const reviewPages = [
  [
    {
      name: "Linh Nguyen",
      initials: "LN",
      color: "#b66f5c",
      text: "Mùi hương rất đặc trưng, nến cháy đều và thơm lâu. Packaging đẹp, rất phù hợp để làm quà tặng.",
    },
    {
      name: "Thao Pham",
      initials: "TP",
      color: "#8f745f",
      text: "Moonlit Vanilla là mùi hương mình yêu thích nhất để thư giãn vào buổi tối.",
    },
    {
      name: "Minh Anh",
      initials: "MA",
      color: "#6f8178",
      text: "Discovery Set tiện lắm, có thể thử nhiều mùi trước khi chọn nến full size.",
    },
  ],
  [
    {
      name: "Hoang Yen",
      initials: "HY",
      color: "#9a6c73",
      text: "White Tea Serenity nhẹ và sạch, rất hợp cho phòng ngủ và những ngày cần thư giãn.",
    },
    {
      name: "Bao Tran",
      initials: "BT",
      color: "#7d715e",
      text: "Hộp quà được đóng gói chỉn chu, giao nhanh và sản phẩm giống hình.",
    },
    {
      name: "Quynh Nhu",
      initials: "QN",
      color: "#687b82",
      text: "Mùi Citrus Bloom tươi sáng, không bị gắt và giữ mùi tốt trong phòng làm việc.",
    },
  ],
];

export function CustomerFeedback() {
  const [page, setPage] = useState(0);

  return (
    <section className="relative w-full overflow-hidden border-y border-[#eadfd7] bg-[#fffaf6]">
      <div className="absolute bottom-0 right-0 top-10 hidden w-[36%] overflow-hidden xl:block">
        <img
          src={imgCustomerMoment}
          alt="Lumos Aura candle and coffee in a warm morning setting"
          className="h-full w-full object-cover"
          style={{ objectPosition: "52% center" }}
        />
        <div
          className="absolute inset-y-0 left-0 w-[38%]"
          style={{
            background:
              "linear-gradient(90deg, #fffaf6 0%, rgba(255,250,246,0.86) 28%, rgba(255,250,246,0.35) 68%, transparent 100%)",
            backdropFilter: "blur(7px)",
            WebkitBackdropFilter: "blur(7px)",
            maskImage: "linear-gradient(90deg, black 0%, black 45%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(90deg, black 0%, black 45%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-0 pt-14 md:px-10 xl:min-h-[470px]">
        <div className="flex w-full flex-col justify-center xl:w-[72%]">
          <div className="mb-8 flex items-center justify-center gap-5 xl:justify-start">
            <span className="hidden h-px flex-1 bg-[#d7c4b4] xl:block" />
            <h2
              className="shrink-0 text-center"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: 38,
                color: "#3d3530",
                lineHeight: "46px",
              }}
            >
              Loved by Our Customers
            </h2>
            <div className="hidden flex-1 items-center xl:flex">
              <span className="h-2 w-2 rotate-45 bg-[#c99a6c]" />
              <span className="h-px flex-1 bg-[#d7c4b4]" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {reviewPages[page].map((review) => (
              <article
                key={review.name}
                className="min-h-[225px] border border-[#e6d9cf] bg-white/85 p-6"
                style={{
                  borderRadius: 16,
                  boxShadow: "0 10px 30px rgba(83, 65, 50, 0.065)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white text-[13px] font-semibold text-white shadow-sm"
                    style={{ backgroundColor: review.color }}
                  >
                    {review.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold text-[#3d3530]">{review.name}</p>
                    <div className="mt-1 flex gap-1" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} size={15} fill="#d98a32" color="#d98a32" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-[14px] leading-6 text-[#5f554e]">{review.text}</p>
              </article>
            ))}
          </div>

          <div className="mb-10 mt-7 flex justify-center gap-3">
            {reviewPages.map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index)}
                className="flex h-5 w-5 items-center justify-center"
                aria-label={`Show review page ${index + 1}`}
              >
                <span
                  className="block rounded-full transition-all"
                  style={{
                    width: page === index ? 10 : 7,
                    height: page === index ? 10 : 7,
                    backgroundColor: page === index ? "#6b5948" : "transparent",
                    border: page === index ? "none" : "2px solid #cdbdaf",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="relative -mx-5 mt-2 h-[300px] overflow-hidden md:-mx-10 xl:hidden">
          <img
            src={imgCustomerMoment}
            alt="Lumos Aura candle and coffee in a warm morning setting"
            className="h-full w-full object-cover"
            style={{ objectPosition: "center 58%" }}
          />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#fffaf6] to-transparent" />
        </div>
      </div>
    </section>
  );
}
