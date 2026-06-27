import svgPaths from "./svg-m94p4u0dkm";
import imgProductImage from "./ce339585e7f9ff6801705d0866dd4ab36ce125bf.png";
import imgProductImage1 from "./b79f757d605f94cdef0b1935e15d9d2e43cc3ffc.png";
import imgAdminUserAvatar from "./cd93e63e37061b6975a6eff8cdfd54bdd839ccd1.png";

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[32px] whitespace-nowrap">
        <p className="leading-[40px]">Moderation Queue</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Review and manage pending customer feedback.</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[373.38px]" data-name="Container">
      <Heading1 />
      <Container1 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#fff8f5] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border border-[rgba(209,196,187,0.5)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[17px] py-[7px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[12px] text-center tracking-[0.96px] whitespace-nowrap">
          <p className="leading-[16px]">Pending Approval</p>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[6px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[7.5px] pt-[6.5px] px-[16px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] text-center tracking-[0.96px] whitespace-nowrap">
          <p className="leading-[16px]">Reported</p>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative rounded-[6px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center pb-[7.5px] pt-[6.5px] px-[16px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] text-center tracking-[0.96px] whitespace-nowrap">
          <p className="leading-[16px]">All Reviews</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#f5ece7] content-stretch flex items-start p-[5px] relative rounded-[8px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[10px] relative shrink-0 w-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 10">
        <g id="Container">
          <path d={svgPaths.p113f700} fill="var(--fill-0, #1E1B18)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#fff8f5] content-stretch flex gap-[8px] items-center px-[17px] py-[9px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container3 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">More Filters</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder />
      <Button3 />
    </div>
  );
}

function PageHeaderFilters() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Page Header & Filters">
      <Container />
      <Container2 />
    </div>
  );
}

function ProductImage() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Product Image">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgProductImage} />
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#f5ece7] relative rounded-[8px] shrink-0 size-[48px]" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <ProductImage />
      </div>
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Celestial Amber Eau de Parfum</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[109.92px]" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#4e453e] text-[13px] top-[9px] whitespace-nowrap">
        <p className="leading-[19.5px]">Order #ORD-8821</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[7.31px]" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#4e453e] text-[13px] top-[9px] whitespace-nowrap">
        <p className="leading-[19.5px]">•</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[80.63px]" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#4e453e] text-[13px] top-[9px] whitespace-nowrap">
        <p className="leading-[19.5px]">Oct 24, 2024</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pr-[80px] relative shrink-0 w-[309.8px]" data-name="Container">
      <Heading2 />
      <Container5 />
    </div>
  );
}

function HeaderInfo() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header Info">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <BackgroundBorder1 />
        <Container4 />
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(107,89,72,0.1)] content-stretch flex items-center justify-center pb-[6.5px] pt-[5.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Overlay">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">SJ</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[0] not-italic relative shrink-0 whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center mb-[-0.5px] relative shrink-0 text-[#1e1b18] text-[14px] tracking-[0.7px]">
        <p className="leading-[20px]">Sarah Jenkins</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#4e453e] text-[12px]">
        <p className="leading-[18px]">Verified Buyer</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Overlay />
      <Paragraph />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="h-[14.25px] relative shrink-0 w-[15px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14.25">
          <path d={svgPaths.p389def00} fill="var(--fill-0, #FFDDB0)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="h-[14.25px] relative shrink-0 w-[15px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14.25">
          <path d={svgPaths.p389def00} fill="var(--fill-0, #FFDDB0)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="h-[14.25px] relative shrink-0 w-[15px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14.25">
          <path d={svgPaths.p389def00} fill="var(--fill-0, #FFDDB0)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="h-[14.25px] relative shrink-0 w-[15px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14.25">
          <path d={svgPaths.p389def00} fill="var(--fill-0, #FFDDB0)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="h-[14.25px] relative shrink-0 w-[15px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14.25">
          <path d={svgPaths.p1755bb80} fill="var(--fill-0, #D1C4BB)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[14.25px] items-start relative shrink-0" data-name="Container">
      <Container12 />
      <Container13 />
      <Container14 />
      <Container15 />
      <Container16 />
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container10 />
        <Container11 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] tracking-[0.7px] w-full">
          <p className="leading-[20px]">Beautiful scent, but fades quickly</p>
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] w-full">
          <p className="leading-[24px] mb-0">The initial notes of amber and sandalwood are</p>
          <p className="leading-[24px] mb-0">absolutely heavenly. It feels very luxurious and</p>
          <p className="leading-[24px]">warm when first applied. However, I noticed that…</p>
        </div>
      </div>
    </div>
  );
}

function ReviewContent() {
  return (
    <div className="bg-[#fbf2ed] relative rounded-[8px] shrink-0 w-full" data-name="Review Content">
      <div aria-hidden className="absolute border border-[rgba(209,196,187,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start p-[17px] relative size-full">
        <Container9 />
        <Heading3 />
        <Container17 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[10.5px] relative shrink-0 w-[13.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 10.5">
        <g id="Container">
          <path d={svgPaths.p1d4fdb00} fill="var(--fill-0, #6B5948)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Button">
      <Container18 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Reply to Customer</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[14.85px] relative shrink-0 w-[16.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.5 14.85">
        <g id="Container">
          <path d={svgPaths.p198cc090} fill="var(--fill-0, #BA1A1A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#fff8f5] content-stretch flex gap-[6px] items-center px-[17px] py-[9px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border border-[rgba(186,26,26,0.3)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container20 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#ba1a1a] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Hide</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Container">
          <path d={svgPaths.p1041200} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#6b5948] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[6px] items-center pb-[9.5px] pt-[8.5px] px-[16px] relative rounded-[8px] shrink-0" data-name="Button">
      <Container21 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Approve</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Container">
      <Button5 />
      <Button6 />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex items-center justify-between pt-[8px] relative shrink-0 w-full" data-name="Actions">
      <Button4 />
      <Container19 />
    </div>
  );
}

function ActionsMargin() {
  return (
    <div className="h-[70px] min-h-[46px] relative shrink-0 w-full" data-name="Actions:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-end min-h-[inherit] pt-[24px] relative size-full">
        <Actions />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[12.25px] relative shrink-0 w-[11.083px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0833 12.25">
        <g id="Container">
          <path d={svgPaths.p254f7400} fill="var(--fill-0, #785E39)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function StatusBadge() {
  return (
    <div className="absolute bg-[#fddaac] right-[25px] rounded-[9999px] top-[25px]" data-name="Status Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[5.99px] items-center px-[10px] py-[4px] relative size-full">
        <Container22 />
        <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#785e39] text-[12px] tracking-[0.96px] whitespace-nowrap">
          <p className="leading-[16px]">Pending</p>
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-[#fff8f5] col-1 justify-self-stretch relative rounded-[12px] row-1 self-start shrink-0" data-name="Card 1">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
          <HeaderInfo />
          <ReviewContent />
          <ActionsMargin />
          <StatusBadge />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function ProductImage1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Product Image">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgProductImage1} />
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#f5ece7] relative rounded-[8px] shrink-0 size-[48px]" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <ProductImage1 />
      </div>
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Midnight Vetiver Candle</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[112.02px]" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#4e453e] text-[13px] top-[9px] whitespace-nowrap">
        <p className="leading-[19.5px]">Order #ORD-8799</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[7.31px]" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#4e453e] text-[13px] top-[9px] whitespace-nowrap">
        <p className="leading-[19.5px]">•</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[80.61px]" data-name="Container">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[#4e453e] text-[13px] top-[9px] whitespace-nowrap">
        <p className="leading-[19.5px]">Oct 23, 2024</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Container26 />
      <Container27 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start pr-[128px] relative shrink-0 w-[343.94px]" data-name="Container">
      <Heading4 />
      <Container24 />
    </div>
  );
}

function HeaderInfo1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header Info">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-start relative size-full">
        <BackgroundBorder2 />
        <Container23 />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#e9e1dc] content-stretch flex items-center justify-center pb-[6.5px] pt-[5.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">MD</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-0.5px] relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Michael D.</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container31 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] whitespace-nowrap">
        <p className="leading-[18px]">Verified Buyer</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Background />
      <Container30 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="h-[14.25px] relative shrink-0 w-[15px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14.25">
          <path d={svgPaths.p389def00} fill="var(--fill-0, #FFDDB0)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="h-[14.25px] relative shrink-0 w-[15px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14.25">
          <path d={svgPaths.p1755bb80} fill="var(--fill-0, #D1C4BB)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="h-[14.25px] relative shrink-0 w-[15px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14.25">
          <path d={svgPaths.p1755bb80} fill="var(--fill-0, #D1C4BB)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="h-[14.25px] relative shrink-0 w-[15px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14.25">
          <path d={svgPaths.p1755bb80} fill="var(--fill-0, #D1C4BB)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="h-[14.25px] relative shrink-0 w-[15px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 14.25">
          <path d={svgPaths.p1755bb80} fill="var(--fill-0, #D1C4BB)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex h-[14.25px] items-start relative shrink-0" data-name="Container">
      <Container33 />
      <Container34 />
      <Container35 />
      <Container36 />
      <Container37 />
    </div>
  );
}

function Container28() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container29 />
        <Container32 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] tracking-[0.7px] w-full">
          <p className="leading-[20px]">Terrible packaging</p>
        </div>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] w-full">
          <p className="leading-[24px] mb-0">The candle arrived completely shattered. What kind</p>
          <p className="leading-[24px] mb-0">of idiots pack glass in a single layer of bubble</p>
          <p className="leading-[24px] mb-0">wrap? Absolutely f***ing ridiculous considering</p>
          <p className="leading-[24px]">how much this cost.</p>
        </div>
      </div>
    </div>
  );
}

function ReviewContent1() {
  return (
    <div className="bg-[rgba(255,218,214,0.2)] relative rounded-[8px] shrink-0 w-full" data-name="Review Content">
      <div aria-hidden className="absolute border border-[rgba(186,26,26,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start p-[17px] relative size-full">
        <Container28 />
        <Heading5 />
        <Container38 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 13.5">
        <g id="Container">
          <path d={svgPaths.p134adb80} fill="var(--fill-0, #6B5948)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Button">
      <Container39 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Open Support Ticket</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13.5">
        <g id="Container">
          <path d={svgPaths.p1af14480} fill="var(--fill-0, #BA1A1A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#fff8f5] content-stretch flex gap-[6px] items-center px-[17px] py-[9px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border border-[rgba(186,26,26,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container41 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#ba1a1a] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Delete Review</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Button8 />
    </div>
  );
}

function Actions1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Actions">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pt-[8px] relative size-full">
        <Button7 />
        <Container40 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[9.917px] relative shrink-0 w-[8.75px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 9.91667">
        <g id="Container">
          <path d={svgPaths.p88e5080} fill="var(--fill-0, #93000A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function StatusBadge1() {
  return (
    <div className="absolute bg-[#ffdad6] right-[25px] rounded-[9999px] top-[25px]" data-name="Status Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[10px] py-[4px] relative size-full">
        <Container42 />
        <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#93000a] text-[12px] tracking-[0.96px] whitespace-nowrap">
          <p className="leading-[16px]">Reported (Profanity)</p>
        </div>
      </div>
    </div>
  );
}

function Card2Reported() {
  return (
    <div className="bg-[#fff8f5] col-2 justify-self-stretch relative rounded-[12px] row-1 self-start shrink-0" data-name="Card 2 (Reported)">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
          <HeaderInfo1 />
          <ReviewContent1 />
          <Actions1 />
          <StatusBadge1 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(186,26,26,0.3)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function ReviewCardsGrid() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_376px] relative shrink-0 w-full" data-name="Review Cards Grid">
      <Card />
      <Card2Reported />
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[10px] relative shrink-0 w-[6.167px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.16667 10">
        <g id="Container">
          <path d={svgPaths.p30c9c200} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="Button">
      <Container43 />
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#6b5948] content-stretch flex items-center justify-center pb-[6.5px] pt-[5.5px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">1</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[6.5px] pt-[5.5px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">2</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[6.5px] pt-[5.5px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">3</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">...</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[10px] relative shrink-0 w-[6.167px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.16667 10">
        <g id="Container">
          <path d={svgPaths.p2ba68100} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[6px] shrink-0" data-name="Button">
      <Container45 />
    </div>
  );
}

function PaginationPlaceholder() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="Pagination Placeholder">
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
      <Container44 />
      <Button13 />
    </div>
  );
}

function PageContent() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Page Content">
      <div className="overflow-auto rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-start p-[24px] relative size-full">
          <PageHeaderFilters />
          <ReviewCardsGrid />
          <PaginationPlaceholder />
        </div>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] w-full">
          <p className="leading-[normal]">Search reviews, products, or customers...</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f5ece7] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pl-[41px] pr-[17px] py-[11px] relative size-full">
          <Container46 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute bottom-[21.43%] content-stretch flex flex-col items-start left-[12px] top-[21.43%]" data-name="Container">
      <div className="relative shrink-0 size-[18px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p8a35e00} fill="var(--fill-0, #4E453E)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="flex-[1_0_0] max-w-[448px] min-w-px relative" data-name="Search">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] relative size-full">
        <Input />
        <Container47 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p164b49c0} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="content-stretch flex items-center justify-center p-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <Container48 />
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20.1px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1 20">
        <g id="Container">
          <path d={svgPaths.p3cdadd00} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="content-stretch flex items-center justify-center p-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <Container49 />
    </div>
  );
}

function Actions2() {
  return (
    <div className="relative shrink-0" data-name="Actions">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-center relative size-full">
        <Button14 />
        <Button15 />
      </div>
    </div>
  );
}

function HeaderTopNavBarAdminSmall() {
  return (
    <div className="absolute bg-[#fff8f5] content-stretch flex h-[64px] items-center justify-between left-0 pb-px px-[24px] right-0 top-0" data-name="Header - TopNavBar (Admin Small)">
      <div aria-hidden className="absolute border-[#d1c4bb] border-b border-solid inset-0 pointer-events-none" />
      <Search />
      <Actions2 />
    </div>
  );
}

function MainContentArea() {
  return (
    <div className="bg-[#fff8f5] content-stretch flex flex-[1_0_0] flex-col h-[1024px] items-start justify-center min-w-px overflow-clip pt-[64px] relative" data-name="Main Content Area">
      <PageContent />
      <HeaderTopNavBarAdminSmall />
    </div>
  );
}

function AdminUserAvatar() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Admin User Avatar">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-9.32%] max-w-none top-0 w-[118.64%]" src={imgAdminUserAvatar} />
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-[#e9e1dc] h-[40px] relative rounded-[9999px] shrink-0 w-[34.03px]" data-name="Background+Border">
      <div className="content-stretch flex items-center justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <AdminUserAvatar />
      </div>
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[18px] whitespace-nowrap">
        <p className="leading-[22.5px] mb-0">Lumos Aura</p>
        <p className="leading-[22.5px]">Command</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">System Administrator</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[142.77px]" data-name="Container">
      <Heading />
      <Container51 />
    </div>
  );
}

function BrandHeader() {
  return (
    <div className="relative shrink-0 w-full" data-name="Brand Header">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] relative size-full">
          <BackgroundBorder3 />
          <Container50 />
        </div>
      </div>
    </div>
  );
}

function BrandHeaderMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Brand Header:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[32px] relative size-full">
        <BrandHeader />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p20793584} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Container52 />
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
            <p className="leading-[20px]">Dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p643d217} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Container53 />
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
            <p className="leading-[20px]">Products</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19.982px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9815 20">
        <g id="Container">
          <path d={svgPaths.pb5c2400} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link2() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Container54 />
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
            <p className="leading-[20px]">Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
        <g id="Container">
          <path d={svgPaths.p39955c80} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link3() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Container55 />
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
            <p className="leading-[20px]">Users</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
        <g id="Container">
          <path d={svgPaths.p12995800} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link4() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Container56 />
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
            <p className="leading-[20px]">Vouchers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p3f5ffe80} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link5() {
  return (
    <div className="bg-[#6b5948] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] opacity-90 relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Container57 />
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[0.7px] whitespace-nowrap">
            <p className="leading-[20px]">Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.pea74a00} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Link6() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[16px] py-[12px] relative size-full">
          <Container58 />
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
            <p className="leading-[20px]">Policies</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavigationLinks() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Navigation Links">
      <div className="overflow-auto rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pb-[503px] pt-[4px] px-[16px] relative size-full">
          <Link />
          <Link1 />
          <Link2 />
          <Link3 />
          <Link4 />
          <Link5 />
          <Link6 />
        </div>
      </div>
    </div>
  );
}

function SideNavBarAdmin() {
  return (
    <div className="absolute bg-[#fbf2ed] content-stretch flex flex-col h-[1024px] items-start left-0 pr-px py-[32px] top-0 w-[256px]" data-name="SideNavBar (Admin)">
      <div aria-hidden className="absolute border-[#d1c4bb] border-r border-solid inset-0 pointer-events-none" />
      <BrandHeaderMargin />
      <NavigationLinks />
    </div>
  );
}

export default function ReviewsLumosAuraAdmin() {
  return (
    <div className="content-stretch flex items-start justify-center pl-[256px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 248, 245) 0%, rgb(255, 248, 245) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Reviews - Lumos Aura Admin">
      <MainContentArea />
      <SideNavBarAdmin />
    </div>
  );
}