import svgPaths from "./svg-ob3hbzoktb";
import imgThumbnail1 from "./ebc92afcb81783e9c18a34dcc8393940a49858ce.png";
import imgThumbnail2 from "./5b8be29cb7a673dc58024f67981342104d1fb7cb.png";
import imgThumbnail3 from "./5c1d7c6b55b8b440ae09818e4921207724310037.png";
import imgEtherealBloomCandle from "./ad1ac47c617506b69eafc6d246eecf7b11798d0b.png";
import imgRitualOfLightBackground from "./234e8ad3c8c05d61e0c28f57fbd2edcc532a8b09.png";

function Link() {
  return (
    <div className="content-stretch flex flex-col h-[26px] items-start pb-[6px] relative" data-name="Link">
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

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#7f756d] text-[14px] tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">HOME</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#7f756d] text-[14px] tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">/</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center px-[8px] relative self-stretch shrink-0" data-name="Margin">
      <Container7 />
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#7f756d] text-[14px] tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">SHOP</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#7f756d] text-[14px] tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">/</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center px-[8px] relative self-stretch shrink-0" data-name="Margin">
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] tracking-[1.4px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">ETHEREAL BLOOM</p>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Nav">
      <Link3 />
      <Margin />
      <Link4 />
      <Margin1 />
      <Container9 />
    </div>
  );
}

function NavMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0 w-full" data-name="Nav:margin">
      <Nav />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1e1b18] text-[40px] w-full">
        <p className="leading-[48px]">Ethereal Bloom</p>
      </div>
    </div>
  );
}

function Heading1Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Heading 1:margin">
      <Heading />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[18px] w-full">
        <p className="leading-[28px]">{`Rose & Bergamot`}</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0 w-full" data-name="Margin">
      <Container10 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[32px] w-full">
        <p className="leading-[40px]">$48</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Margin">
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] w-full">
        <p className="leading-[24px] mb-0">A delicate dance of early morning dew on fresh</p>
        <p className="leading-[24px] mb-0">petals. Ethereal Bloom captures the fleeting essence</p>
        <p className="leading-[24px] mb-0">of dawn, blending crisp bergamot with the velvet</p>
        <p className="leading-[24px] mb-0">warmth of wild rose, grounded in a soft, earthy</p>
        <p className="leading-[24px] mb-0">patchouli embrace. A scent designed to illuminate</p>
        <p className="leading-[24px]">the quiet moments.</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Margin">
      <Container12 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] tracking-[1.4px] uppercase w-full">
        <p className="leading-[20px]">SCENT PROFILE</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#735a36] text-[12px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">Top:</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-[#f5ece7] bottom-[44px] content-stretch flex gap-[8px] items-center left-0 px-[16px] py-[8px] rounded-[9999px] top-0" data-name="Background">
      <Container14 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[12px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">Bergamot</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#735a36] text-[12px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">Heart:</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="absolute bg-[#f5ece7] bottom-[44px] content-stretch flex gap-[8px] items-center left-[144.31px] px-[16px] py-[8px] rounded-[9999px] top-0" data-name="Background">
      <Container15 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[12px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">Rose</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#735a36] text-[12px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">Base:</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="absolute bg-[#f5ece7] bottom-0 content-stretch flex gap-[7.99px] items-center left-0 px-[16px] py-[8px] rounded-[9999px] top-[44px]" data-name="Background">
      <Container16 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[12px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">Patchouli</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[76px] relative shrink-0 w-full" data-name="Container">
      <Background />
      <Background1 />
      <Background2 />
    </div>
  );
}

function ScentNotesChips() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Scent Notes Chips">
      <Heading2 />
      <Container13 />
    </div>
  );
}

function ScentNotesChipsMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Scent Notes Chips:margin">
      <ScentNotesChips />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#7f756d] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">BURN TIME</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="col-1 justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container18 />
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[16px] whitespace-nowrap">
          <p className="leading-[24px]">Approx. 60 hours</p>
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#7f756d] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">WEIGHT</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="col-2 justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container20 />
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[16px] whitespace-nowrap">
          <p className="leading-[24px]">250g / 8.8 oz</p>
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#7f756d] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">INGREDIENTS</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">100% Natural Soy Wax, Cotton Wick, Essential Oils</p>
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="col-[1/span_2] justify-self-stretch relative row-2 self-start shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <Container21 />
      </div>
    </div>
  );
}

function Details() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__44px_52px] pb-[33px] relative shrink-0 w-full" data-name="Details">
      <div aria-hidden className="absolute border-[rgba(209,196,187,0.3)] border-b border-solid inset-0 pointer-events-none" />
      <Container17 />
      <Container19 />
      <Margin5 />
    </div>
  );
}

function DetailsMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0 w-full" data-name="Details:margin">
      <Details />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Add to Cart</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#6b5948] content-stretch flex items-center justify-center py-[16px] relative rounded-[9999px] shrink-0 w-full" data-name="Button">
      <Container23 />
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-px py-[17px] relative rounded-[9999px] shrink-0 w-full" data-name="Button">
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Buy Now</p>
      </div>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Actions">
      <Button3 />
      <Button4 />
    </div>
  );
}

function RightProductInfo() {
  return (
    <div className="col-[8/span_5] justify-self-stretch relative row-1 self-start shrink-0" data-name="Right: Product Info">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pl-[48px] py-[32px] relative size-full">
          <NavMargin />
          <Heading1Margin />
          <Margin2 />
          <Margin3 />
          <Margin4 />
          <ScentNotesChipsMargin />
          <DetailsMargin />
          <Actions />
        </div>
      </div>
    </div>
  );
}

function Thumbnail() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Thumbnail 1">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-10.26%] max-w-none top-0 w-[120.51%]" src={imgThumbnail1} />
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#f5ece7] h-[96px] relative rounded-[8px] shrink-0 w-[80px]" data-name="Button">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Thumbnail />
      </div>
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Thumbnail1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Thumbnail 2">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-10%] max-w-none top-0 w-[120%]" src={imgThumbnail2} />
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#f5ece7] content-stretch flex flex-col h-[96px] items-start justify-center opacity-60 overflow-clip relative rounded-[8px] shrink-0 w-[80px]" data-name="Button">
      <Thumbnail1 />
    </div>
  );
}

function Thumbnail2() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Thumbnail 3">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-10%] max-w-none top-0 w-[120%]" src={imgThumbnail3} />
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#f5ece7] content-stretch flex flex-col h-[96px] items-start justify-center opacity-60 overflow-clip relative rounded-[8px] shrink-0 w-[80px]" data-name="Button">
      <Thumbnail2 />
    </div>
  );
}

function Thumbnails() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-full items-start relative shrink-0" data-name="Thumbnails">
      <Button5 />
      <Button6 />
      <Button7 />
    </div>
  );
}

function EtherealBloomCandle() {
  return (
    <div className="flex-[1_0_0] min-h-px mix-blend-multiply relative w-full" data-name="Ethereal Bloom Candle">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-34.83%] max-w-none top-0 w-[169.65%]" src={imgEtherealBloomCandle} />
      </div>
    </div>
  );
}

function GlassmorphismBadge() {
  return (
    <div className="absolute backdrop-blur-[10px] bg-[rgba(250,248,245,0.4)] content-stretch flex flex-col items-start left-[24px] px-[17px] py-[9px] rounded-[9999px] top-[24px]" data-name="Glassmorphism Badge">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">BESTSELLER</p>
      </div>
    </div>
  );
}

function MainImage() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-w-px overflow-clip relative rounded-[12px] shadow-[0px_40px_40px_-15px_rgba(109,91,74,0.04)]" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 539.33 674.17' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(53.106 0 0 39.128 269.67 337.08)'><stop stop-color='rgba(200,169,126,0.15)' offset='0'/><stop stop-color='rgba(200,169,126,0)' offset='0.7'/></radialGradient></defs></svg>\"), linear-gradient(90deg, rgb(245, 236, 231) 0%, rgb(245, 236, 231) 100%)" }} data-name="Main Image">
      <EtherealBloomCandle />
      <GlassmorphismBadge />
    </div>
  );
}

function LeftImageGallery() {
  return (
    <div className="col-[1/span_7] content-stretch flex gap-[24px] h-[915px] items-start justify-self-stretch relative row-1 shrink-0" data-name="Left: Image Gallery">
      <Thumbnails />
      <MainImage />
    </div>
  );
}

function ProductSection2ColumnSplit() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_915px] relative shrink-0 w-full" data-name="Product Section: 2-Column Split">
      <RightProductInfo />
      <LeftImageGallery />
    </div>
  );
}

function RitualOfLightBackground() {
  return (
    <div className="flex-[1_0_0] min-h-px mix-blend-luminosity opacity-40 relative w-full" data-name="Ritual of Light Background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[186.67%] left-0 max-w-none top-[-43.33%] w-full" src={imgRitualOfLightBackground} />
      </div>
    </div>
  );
}

function BackgroundImage() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start justify-center" data-name="Background Image">
      <RitualOfLightBackground />
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 size-[33px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
        <g id="Container">
          <path d={svgPaths.pbd1c680} fill="var(--fill-0, #6B5948)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="relative shrink-0" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pl-[170.7px] pr-[170.72px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1e1b18] text-[32px] text-center whitespace-nowrap">
          <p className="leading-[40px]">A Ritual of Light</p>
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pb-[7.5px] px-[1.08px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[18px] text-center whitespace-nowrap">
          <p className="leading-[29.25px] mb-0">For the best experience, allow the wax to melt completely to the</p>
          <p className="leading-[29.25px] mb-0">edges during the first burn to prevent tunneling. Trim the wick to</p>
          <p className="leading-[29.25px] mb-0">{`1/4" before each use to ensure a clean, steady flame. Let the scent`}</p>
          <p className="leading-[29.25px] mb-0">envelop your space, transforming the ordinary into a gallery of light</p>
          <p className="leading-[29.25px]">and shadow.</p>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative shrink-0" data-name="Button">
      <div aria-hidden className="absolute border-[#6b5948] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pb-[5px] relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
          <p className="leading-[20px]">Read Full Care Guide</p>
        </div>
      </div>
    </div>
  );
}

function OverlayContent() {
  return (
    <div className="backdrop-blur-[10px] bg-[rgba(250,248,245,0.4)] content-stretch flex flex-col gap-[24px] items-center max-w-[672px] p-[49px] relative rounded-[16px] shrink-0" data-name="Overlay Content">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container24 />
      <Heading1 />
      <Container25 />
      <Button8 />
    </div>
  );
}

function ParallaxScentProfileRitualSection() {
  return (
    <div className="bg-[#efe6e2] content-stretch flex h-[600px] items-center justify-center overflow-clip relative rounded-[16px] shadow-[0px_40px_40px_-15px_rgba(109,91,74,0.04)] shrink-0 w-full" data-name="Parallax Scent Profile / Ritual Section">
      <BackgroundImage />
      <OverlayContent />
    </div>
  );
}

function Container6() {
  return (
    <div className="max-w-[1440px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[120px] items-start max-w-[inherit] px-[80px] relative size-full">
        <ProductSection2ColumnSplit />
        <ParallaxScentProfileRitualSection />
      </div>
    </div>
  );
}

function MainContentCanvas() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[240px] pt-[120px] relative shrink-0 w-full" data-name="Main Content Canvas">
      <Container6 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[40px] w-full">
        <p className="leading-[48px]">Lumos Aura</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[320px] relative shrink-0 w-[320px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px] mb-0">Elevating spaces through high-end</p>
        <p className="leading-[24px]">olfactory art and cosmic mysticism.</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">© 2024 Lumos Aura. All rights reserved.</p>
      </div>
    </div>
  );
}

function Brand() {
  return (
    <div className="col-[1/span_4] content-stretch flex flex-col gap-[24px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Brand">
      <Container27 />
      <Container28 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] tracking-[1.4px] uppercase w-full">
        <p className="leading-[20px]">EXPLORE</p>
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container31 />
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Brand Story</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Newsletter</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-full items-start relative shrink-0 w-[89.44px]" data-name="Container">
      <Margin6 />
      <Link5 />
      <Link6 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] tracking-[1.4px] uppercase w-full">
        <p className="leading-[20px]">SUPPORT</p>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Margin">
      <Container33 />
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Shipping Policy</p>
      </div>
    </div>
  );
}

function Link8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function Link9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Contact</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-full items-start relative shrink-0 w-[116.14px]" data-name="Container">
      <Margin7 />
      <Link7 />
      <Link8 />
      <Link9 />
    </div>
  );
}

function Links() {
  return (
    <div className="col-[5/span_8] content-stretch flex gap-[48px] h-[160px] items-start justify-end justify-self-stretch relative row-1 shrink-0" data-name="Links">
      <Container30 />
      <Container32 />
    </div>
  );
}

function Container26() {
  return (
    <div className="max-w-[1440px] relative shrink-0 w-full" data-name="Container">
      <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_160px] max-w-[inherit] px-[80px] relative size-full">
        <Brand />
        <Links />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#f5ece7] content-stretch flex flex-col items-start py-[120px] relative shrink-0 w-full" data-name="Footer">
      <Container26 />
    </div>
  );
}

export default function EtherealBloomProductDetail() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 248, 245) 0%, rgb(255, 248, 245) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Ethereal Bloom - Product Detail">
      <TopNavBar />
      <MainContentCanvas />
      <Footer />
    </div>
  );
}