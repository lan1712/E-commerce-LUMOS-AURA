import svgPaths from "./svg-i9qltjo252";
import imgPlaceholder from "./0493b23c1255b8c2bf1389105b63a8834a0b0a12.png";
import imgPlaceholder1 from "./db7a43eb3eb3a617161b7b25e5e636cbabd0c853.png";
import imgProduct from "./22675bbce2030fc33ab14bb643fd73097523ce18.png";
import imgProduct1 from "./a1c093c33fd2dbdff145507ac99833dd2272a3b7.png";

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[6px] relative" data-name="Link">
      <div aria-hidden className="absolute border-[#6b5948] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Shop</p>
      </div>
    </div>
  );
}

function LinkCssTransform() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start justify-center pr-[0.95px] py-[0.65px] relative shrink-0" data-name="Link:css-transform">
      <div className="flex h-[24.7px] items-center justify-center relative shrink-0 w-[35.87px]">
        <div className="flex-none scale-x-95 scale-y-95">
          <Link />
        </div>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Gift Collection</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">About</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[32px] items-start pl-[0.94px] relative shrink-0" data-name="Container">
      <LinkCssTransform />
      <Link1 />
      <Link2 />
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p8a35e00} fill="var(--fill-0, #6B5948)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p85bff00} fill="var(--fill-0, #6B5948)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p3faf9100} fill="var(--fill-0, #6B5948)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container5 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[80px] max-w-[1440px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between max-w-[inherit] px-[80px] relative size-full">
          <Container1 />
          <Container2 />
          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] left-[483.48px] text-[#6b5948] text-[64px] top-[39.5px] tracking-[-3.2px] whitespace-nowrap">
            <p className="leading-[72px]">Lumos Aura</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopNavBar() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(255,248,245,0.4)] content-stretch flex flex-col items-start pb-px relative shrink-0 w-[1280px]" data-name="TopNavBar">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.2)] border-b border-solid inset-0 pointer-events-none" />
      <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 left-0 shadow-[0px_40px_40px_-15px_rgba(109,91,74,0.04)] top-0 w-[1280px]" data-name="TopNavBar:shadow" />
      <Container />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1e1b18] text-[64px] tracking-[-1.28px] w-full">
        <p className="leading-[72px]">Order History</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[18px] w-full">
        <p className="leading-[28px]">Track your recent olfactory acquisitions and past curations.</p>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Header">
      <Heading />
      <Container6 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4.5px] items-start leading-[0] relative shrink-0 whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[1.2px] uppercase">
        <p className="leading-[16px]">ORDER #LA-9021</p>
      </div>
      <div className="flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#1e1b18] text-[24px]">
        <p className="leading-[32px]">Oct 24, 2024</p>
      </div>
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-[#fddaac] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background+Shadow">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#785e39] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">PROCESSING</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between relative size-full">
        <Paragraph />
        <BackgroundShadow />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] w-full">
        <p className="leading-[24px]">2 Items • $245.00</p>
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="placeholder">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgPlaceholder} />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#e9e1dc] relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <Placeholder />
      </div>
      <div aria-hidden className="absolute border-2 border-[#efe6e2] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Placeholder1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="placeholder">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgPlaceholder1} />
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="absolute bg-[#e9e1dc] left-[-16px] rounded-[9999px] size-[48px] top-0" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-[2px] relative rounded-[inherit] size-full">
        <Placeholder1 />
      </div>
      <div aria-hidden className="absolute border-2 border-[#efe6e2] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Margin() {
  return (
    <div className="h-[48px] relative shrink-0 w-[32px]" data-name="Margin">
      <BackgroundBorder1 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder />
      <Margin />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#efe6e2] relative rounded-[12px] shrink-0 w-full" data-name="Background">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative size-full">
          <Container9 />
          <Container10 />
          <Container11 />
          <div className="absolute bg-[#6b5948] bottom-[-0.5px] left-0 top-0 w-[4px]" data-name="Background" />
        </div>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4.5px] items-start leading-[0] relative shrink-0 whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[1.2px] uppercase">
        <p className="leading-[16px]">ORDER #LA-8804</p>
      </div>
      <div className="flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#1e1b18] text-[24px]">
        <p className="leading-[32px]">Sep 12, 2024</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#807265] content-stretch flex flex-col items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#fffbff] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">DELIVERED</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Paragraph1 />
        <Background1 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] w-full">
          <p className="leading-[24px]">1 Item • $120.00</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#fff8f5] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(209,196,187,0.3)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
        <Container12 />
        <Container13 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4.5px] items-start leading-[0] relative shrink-0 whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[1.2px] uppercase">
        <p className="leading-[16px]">ORDER #LA-8122</p>
      </div>
      <div className="flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#1e1b18] text-[24px]">
        <p className="leading-[32px]">Jul 05, 2024</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#807265] content-stretch flex flex-col items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Background">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#fffbff] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">DELIVERED</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Paragraph2 />
        <Background2 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] w-full">
          <p className="leading-[24px]">3 Items • $410.00</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-[#fff8f5] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(209,196,187,0.3)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[25px] relative size-full">
        <Container14 />
        <Container15 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="col-[1/span_4] content-stretch flex flex-col gap-[8px] items-start justify-self-stretch pb-[274px] relative row-1 self-start shrink-0" data-name="Container">
      <Background />
      <BackgroundBorder2 />
      <BackgroundBorder3 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1e1b18] text-[40px] whitespace-nowrap">
        <p className="leading-[48px]">Order Details</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[18px] whitespace-nowrap">
        <p className="leading-[28px]">Placed on October 24, 2024</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-[241.33px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading1 />
        <Container17 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] text-right tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">TOTAL AMOUNT</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[32px] text-right whitespace-nowrap">
        <p className="leading-[40px]">$245.00</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0 w-[110.45px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container19 />
        <Container20 />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[rgba(209,196,187,0.3)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex items-end justify-between pb-[25px] relative size-full">
          <Container16 />
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] text-center tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">TRACKING JOURNEY</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[15.673px] relative shrink-0 w-[14.167px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.1666 15.673">
        <g id="Container">
          <path d={svgPaths.p1044e580} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundShadow2() {
  return (
    <div className="bg-[#6b5948] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background+Shadow">
      <Container24 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">PENDING</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0" data-name="Container">
      <BackgroundShadow2 />
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[9.436px] relative shrink-0 w-[17.673px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.673 9.43585">
        <g id="Container">
          <path d={svgPaths.p1f3e3c00} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundShadow3() {
  return (
    <div className="bg-[#6b5948] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background+Shadow">
      <Container27 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">CONFIRMED</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0" data-name="Container">
      <BackgroundShadow3 />
      <Container28 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bottom-[-32px] content-stretch flex flex-col items-start left-[-20.95px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] tracking-[0.7px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">PROCESSING</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0 size-[19px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.9999 18.9999">
        <g id="Container">
          <path d={svgPaths.p18aed800} fill="var(--fill-0, #6B5948)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-[#fff8f5] content-stretch drop-shadow-[0px_0px_10px_rgba(115,90,54,0.15)] flex items-center justify-center p-[2px] relative rounded-[9999px] shrink-0 size-[56px]" data-name="Background+Border+Shadow">
      <div aria-hidden className="absolute border-2 border-[#6b5948] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container31 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="absolute bg-[#735a36] blur-[6px] inset-0 opacity-30 rounded-[9999px]" data-name="Background+Blur" />
      <Container30 />
      <BackgroundBorderShadow />
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[12.548px] relative shrink-0 w-[17.756px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.7564 12.548">
        <g id="Container">
          <path d={svgPaths.p1af22c0} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-[#e9e1dc] content-stretch flex items-center justify-center p-px relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(209,196,187,0.3)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container33 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">SHIPPING</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder4 />
      <Container34 />
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[14.078px] relative shrink-0 w-[12.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4999 14.0785">
        <g id="Container">
          <path d={svgPaths.p23980280} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="bg-[#e9e1dc] content-stretch flex items-center justify-center p-px relative rounded-[9999px] shrink-0 size-[48px]" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(209,196,187,0.3)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container36 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">DELIVERED</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder5 />
      <Container37 />
    </div>
  );
}

function Container22() {
  return (
    <div className="max-w-[768px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between max-w-[inherit] pr-[0.05px] relative size-full">
          <Container23 />
          <div className="-translate-y-1/2 absolute bg-[#e9e1dc] h-[2px] left-[24px] right-[23.99px] top-1/2" data-name="Horizontal Divider" />
          <div className="-translate-y-1/2 absolute bg-[#6b5948] h-[2px] left-[3.63%] right-[46.37%] top-1/2" data-name="Horizontal Divider" />
          <Container26 />
          <Container29 />
          <Container32 />
          <Container35 />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start py-[32px] relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container22 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[1.4px] uppercase w-full">
          <p className="leading-[20px]">ITEMS IN THIS ORDER</p>
        </div>
      </div>
    </div>
  );
}

function Product() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="product">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-10%] max-w-none top-0 w-[120%]" src={imgProduct} />
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#e9e1dc] content-stretch flex flex-col h-[96px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[80px]" data-name="Background">
      <Product />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1e1b18] text-[20px] w-full">
        <p className="leading-[28px]">Midnight Santal</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] w-full">
        <p className="leading-[24px]">50ml Extrait de Parfum</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Container">
      <Heading4 />
      <Container41 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] text-right tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Qty 1</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[18px] text-right whitespace-nowrap">
        <p className="leading-[28px]">$160.00</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[68.38px]" data-name="Container">
      <Container43 />
      <Container44 />
    </div>
  );
}

function Container39() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[24px] items-center p-[16px] relative size-full">
          <Background3 />
          <Container40 />
          <Container42 />
        </div>
      </div>
    </div>
  );
}

function Product1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="product">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-10%] max-w-none top-0 w-[120%]" src={imgProduct1} />
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#e9e1dc] content-stretch flex flex-col h-[96px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[80px]" data-name="Background">
      <Product1 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1e1b18] text-[20px] w-full">
        <p className="leading-[28px]">Celestial Amber</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] w-full">
        <p className="leading-[24px]">Travel Spray 10ml</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Container">
      <Heading5 />
      <Container47 />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] text-right tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Qty 1</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[18px] text-right whitespace-nowrap">
        <p className="leading-[28px]">$85.00</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[60.33px]" data-name="Container">
      <Container49 />
      <Container50 />
    </div>
  );
}

function Container45() {
  return (
    <div className="relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[24px] items-center p-[16px] relative size-full">
          <Background4 />
          <Container46 />
          <Container48 />
        </div>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
        <Container39 />
        <Container45 />
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pt-[33px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[rgba(209,196,187,0.3)] border-solid border-t inset-0 pointer-events-none" />
      <Heading3 />
      <Container38 />
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <div className="bg-[#f5ece7] col-[5/span_8] justify-self-stretch relative rounded-[16px] row-1 self-start shadow-[0px_20px_40px_-15px_rgba(109,91,74,0.05)] shrink-0" data-name="Background+Shadow">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[32px] relative size-full">
          <div className="absolute bg-[#735a36] blur-[50px] opacity-10 right-[-128.01px] rounded-[9999px] size-[384px] top-[-128px]" data-name="Background+Blur" />
          <HorizontalBorder />
          <Container21 />
          <HorizontalBorder1 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="gap-x-[64px] gap-y-[64px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_778px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <BackgroundShadow1 />
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[1440px] relative shrink-0 w-full" data-name="Main">
      <div className="content-stretch flex flex-col gap-[64px] items-start max-w-[inherit] pb-[120px] pt-[140px] px-[80px] relative size-full">
        <Header />
        <Container7 />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[40px] w-full">
        <p className="leading-[48px]">Lumos Aura</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[320px] relative shrink-0 w-[320px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">© 2024 Lumos Aura. All rights reserved.</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="col-[1/span_4] content-stretch flex flex-col gap-[24px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <Container53 />
      <Container54 />
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">BRAND STORY</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">NEWSLETTER</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">SHIPPING POLICY</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">PRIVACY POLICY</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">CONTACT</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="col-[5/span_8] content-stretch flex gap-[32px] h-[96px] items-start justify-end justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Link3 />
      <Link4 />
      <Link5 />
      <Link6 />
      <Link7 />
    </div>
  );
}

function Container51() {
  return (
    <div className="max-w-[1440px] relative shrink-0 w-full" data-name="Container">
      <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_96px] max-w-[inherit] px-[80px] relative size-full">
        <Container52 />
        <Container55 />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#f5ece7] content-stretch flex flex-col items-start py-[120px] relative shrink-0 w-full" data-name="Footer">
      <Container51 />
    </div>
  );
}

export default function MyOrdersLumosAura() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 248, 245) 0%, rgb(255, 248, 245) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="My Orders - Lumos Aura">
      <TopNavBar />
      <Main />
      <Footer />
    </div>
  );
}