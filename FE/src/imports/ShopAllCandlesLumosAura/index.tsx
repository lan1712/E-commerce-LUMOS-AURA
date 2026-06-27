import svgPaths from "./svg-3k033xt6mr";
import imgProductImage from "./7083cbd9b52d1a7ac79f639fc672d086eb09e983.png";
import imgProductImage1 from "./cc5576f87db596d7d3969c0dc08758ae2e97536f.png";
import imgProductImage2 from "./ce446b6485ef17726ef8aac500d30af016e37a5d.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[64px] text-center tracking-[-1.28px] whitespace-nowrap">
        <p className="leading-[72px]">The Collection</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[672px] relative shrink-0 w-[672px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[18px] text-center whitespace-nowrap">
        <p className="leading-[28px] mb-0">Explore our curated selection of fine olfactory art, designed to elevate your</p>
        <p className="leading-[28px]">space and spirit.</p>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full" data-name="Header">
      <Heading />
      <Container />
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 size-[8.167px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 8.16667">
        <g id="Container">
          <path d={svgPaths.p2317cf00} fill="var(--fill-0, #1E1B18)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container4 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f5ece7] relative rounded-[9999px] self-stretch shrink-0" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center pb-[6.5px] pt-[5.5px] px-[12px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[12px] tracking-[0.96px] whitespace-nowrap">
            <p className="leading-[16px]">Woody</p>
          </div>
          <Button />
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center pb-[6.5px] pt-[5.5px] relative shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[12px] text-center tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">Clear all</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Background />
      <Button1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Heading 3">
      <div aria-hidden className="absolute border-[#d1c4bb] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Scent Category</p>
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="image">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="image">
          <path d={svgPaths.pf079980} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Input() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#6b5948] left-[-1px] rounded-[4px] size-[18px] top-1/2" data-name="Input">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <Image />
      </div>
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[28px] top-1/2" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Woody</p>
      </div>
    </div>
  );
}

function ItemLabel() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Item → Label">
      <Input />
      <Container7 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Floral</p>
      </div>
    </div>
  );
}

function ItemLabel1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Item → Label">
      <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name="Input">
        <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Fresh</p>
      </div>
    </div>
  );
}

function ItemLabel2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Item → Label">
      <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name="Input">
        <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <Container9 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Spicy</p>
      </div>
    </div>
  );
}

function ItemLabel3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Item → Label">
      <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name="Input">
        <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <Container10 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="List">
      <ItemLabel />
      <ItemLabel1 />
      <ItemLabel2 />
      <ItemLabel3 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <List />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Heading 3">
      <div aria-hidden className="absolute border-[#d1c4bb] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Burn Time</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">40+ Hours</p>
      </div>
    </div>
  );
}

function ItemLabel4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Item → Label">
      <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name="Input">
        <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <Container12 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">60+ Hours</p>
      </div>
    </div>
  );
}

function ItemLabel5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Item → Label">
      <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name="Input">
        <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <Container13 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">80+ Hours</p>
      </div>
    </div>
  );
}

function ItemLabel6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Item → Label">
      <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name="Input">
        <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <Container14 />
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="List">
      <ItemLabel4 />
      <ItemLabel5 />
      <ItemLabel6 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <List1 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[9px] relative shrink-0 w-full" data-name="Heading 3">
      <div aria-hidden className="absolute border-[#d1c4bb] border-b border-solid inset-0 pointer-events-none" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Price</p>
      </div>
    </div>
  );
}

function Container18() {
  return <div className="flex-[1_0_0] h-[16px] min-w-px relative" data-name="Container" />;
}

function Container17() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 right-0 top-[-6px]" data-name="Container">
      <Container18 />
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f5ece7] h-[4px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <Container17 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">$0</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">$150+</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[8px] items-start px-[8px] relative size-full">
        <Input1 />
        <Container19 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Container16 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container11 />
      <Container15 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container5 />
    </div>
  );
}

function Aside() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[32px] relative self-stretch shrink-0 w-[256px]" data-name="Aside">
      <Container2 />
    </div>
  );
}

function ProductImage() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px mix-blend-multiply relative" data-name="Product Image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[75.19%] left-0 max-w-none top-[12.41%] w-full" src={imgProductImage} />
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="backdrop-blur-[10px] bg-[rgba(250,248,245,0.4)] relative rounded-[9999px] shrink-0 w-full" data-name="Button">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[25px] py-[13px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
            <p className="leading-[20px]">Quick View</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-[5%] opacity-0 right-[5%]" data-name="Container">
      <Button2 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#fbf2ed] relative shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center p-[32px] relative size-full">
          <div className="absolute inset-0 opacity-0" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 264 330' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(21.13 0 0 21.13 132 165)'><stop stop-color='rgba(200,169,126,0.15)' offset='0'/><stop stop-color='rgba(200,169,126,0)' offset='0.7'/></radialGradient></defs></svg>\")" }} data-name="Gradient" />
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <ProductImage />
          </div>
          <Container24 />
        </div>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0 w-full z-[2]" data-name="Margin">
      <Background1 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[32px] text-center whitespace-nowrap">
        <p className="leading-[40px]">Midnight Cedar</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Sandalwood, Amber, Vetiver</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] text-center tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">$45</p>
      </div>
    </div>
  );
}

function BackgroundAlignCenter() {
  return (
    <div className="content-stretch flex items-center justify-center relative self-stretch shrink-0" data-name="Background:align-center">
      <div className="bg-[#d1c4bb] relative rounded-[9999px] shrink-0 size-[4px]" data-name="Background" />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] text-center tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">60 Hours</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex gap-[16px] h-[20px] items-start justify-center pt-[4px] relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <BackgroundAlignCenter />
      <Container29 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full z-[1]" data-name="Container">
      <Heading4 />
      <Container26 />
      <Container27 />
    </div>
  );
}

function Container23() {
  return (
    <div className="col-1 content-stretch flex flex-col isolate items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Margin />
      <Container25 />
    </div>
  );
}

function ProductImage1() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px mix-blend-multiply relative" data-name="Product Image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[75.19%] left-0 max-w-none top-[12.41%] w-full" src={imgProductImage1} />
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="backdrop-blur-[10px] bg-[rgba(250,248,245,0.4)] relative rounded-[9999px] shrink-0 w-full" data-name="Button">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[25px] py-[13px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
            <p className="leading-[20px]">Quick View</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-[5%] opacity-0 right-[5%]" data-name="Container">
      <Button3 />
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#fbf2ed] relative shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center p-[32px] relative size-full">
          <div className="absolute inset-0 opacity-0" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 264 330' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(21.13 0 0 21.13 132 165)'><stop stop-color='rgba(200,169,126,0.15)' offset='0'/><stop stop-color='rgba(200,169,126,0)' offset='0.7'/></radialGradient></defs></svg>\")" }} data-name="Gradient" />
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <ProductImage1 />
          </div>
          <Container31 />
        </div>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0 w-full z-[2]" data-name="Margin">
      <Background2 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[32px] text-center whitespace-nowrap">
        <p className="leading-[40px]">Palo Santo Glow</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Palo Santo, Myrrh, Bergamot</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] text-center tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">$52</p>
      </div>
    </div>
  );
}

function BackgroundAlignCenter1() {
  return (
    <div className="content-stretch flex items-center justify-center relative self-stretch shrink-0" data-name="Background:align-center">
      <div className="bg-[#d1c4bb] relative rounded-[9999px] shrink-0 size-[4px]" data-name="Background" />
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] text-center tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">80 Hours</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex gap-[16px] h-[20px] items-start justify-center pt-[4px] relative shrink-0 w-full" data-name="Container">
      <Container35 />
      <BackgroundAlignCenter1 />
      <Container36 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full z-[1]" data-name="Container">
      <Heading5 />
      <Container33 />
      <Container34 />
    </div>
  );
}

function Container30() {
  return (
    <div className="col-2 content-stretch flex flex-col isolate items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Margin1 />
      <Container32 />
    </div>
  );
}

function ProductImage2() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px mix-blend-multiply relative" data-name="Product Image">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[75.19%] left-0 max-w-none top-[12.41%] w-full" src={imgProductImage2} />
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="backdrop-blur-[10px] bg-[rgba(250,248,245,0.4)] relative rounded-[9999px] shrink-0 w-full" data-name="Button">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[25px] py-[13px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
            <p className="leading-[20px]">Quick View</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-[5%] opacity-0 right-[5%]" data-name="Container">
      <Button4 />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#fbf2ed] relative shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center p-[32px] relative size-full">
          <div className="absolute inset-0 opacity-0" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 264 330' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(21.13 0 0 21.13 132 165)'><stop stop-color='rgba(200,169,126,0.15)' offset='0'/><stop stop-color='rgba(200,169,126,0)' offset='0.7'/></radialGradient></defs></svg>\")" }} data-name="Gradient" />
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <ProductImage2 />
          </div>
          <Container38 />
        </div>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0 w-full z-[2]" data-name="Margin">
      <Background3 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[32px] text-center whitespace-nowrap">
        <p className="leading-[40px]">Wild Fig</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] text-center whitespace-nowrap">
        <p className="leading-[24px]">Fig Leaf, Galbanum, Cedarwood</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] text-center tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">$48</p>
      </div>
    </div>
  );
}

function BackgroundAlignCenter2() {
  return (
    <div className="content-stretch flex items-center justify-center relative self-stretch shrink-0" data-name="Background:align-center">
      <div className="bg-[#d1c4bb] relative rounded-[9999px] shrink-0 size-[4px]" data-name="Background" />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] text-center tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">60 Hours</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[16px] h-[20px] items-start justify-center pt-[4px] relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <BackgroundAlignCenter2 />
      <Container43 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full z-[1]" data-name="Container">
      <Heading6 />
      <Container40 />
      <Container41 />
    </div>
  );
}

function Container37() {
  return (
    <div className="col-3 content-stretch flex flex-col isolate items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <Margin2 />
      <Container39 />
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[1_0_0] gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_515px] min-w-px relative self-stretch" data-name="Container">
      <Container23 />
      <Container30 />
      <Container37 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[24px] h-[515px] items-start relative shrink-0 w-full" data-name="Container">
      <Aside />
      <Container22 />
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[1440px] relative shrink-0 w-full" data-name="Main">
      <div className="content-stretch flex flex-col gap-[64px] items-start max-w-[inherit] px-[80px] py-[120px] relative size-full">
        <Header />
        <Container1 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[40px] w-full">
        <p className="leading-[48px]">Lumos Aura</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[384px] relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] w-full">
        <p className="leading-[24px] mb-0">Elevating everyday spaces with cosmic</p>
        <p className="leading-[24px]">mysticism and high-end olfactory art.</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">© 2024 Lumos Aura. All rights reserved.</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="col-[1/span_4] content-stretch flex flex-col gap-[24px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <Container46 />
      <Container47 />
      <Container48 />
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[2.5px] pt-[5.5px] relative shrink-0 w-full" data-name="Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">Brand Story</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[2.5px] pt-[5.5px] relative shrink-0 w-full" data-name="Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">Newsletter</p>
      </div>
    </div>
  );
}

function List2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List">
      <Item />
      <Item1 />
    </div>
  );
}

function Container49() {
  return (
    <div className="col-[7/span_2] content-stretch flex flex-col items-start justify-self-stretch pb-[104px] relative row-1 self-start shrink-0" data-name="Container">
      <List2 />
    </div>
  );
}

function Item2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[2.5px] pt-[5.5px] relative shrink-0 w-full" data-name="Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">Shipping Policy</p>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[2.5px] pt-[5.5px] relative shrink-0 w-full" data-name="Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function List3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List">
      <Item2 />
      <Item3 />
    </div>
  );
}

function Container50() {
  return (
    <div className="col-[9/span_2] content-stretch flex flex-col items-start justify-self-stretch pb-[104px] relative row-1 self-start shrink-0" data-name="Container">
      <List3 />
    </div>
  );
}

function ListItem() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[2.5px] pt-[5.5px] relative shrink-0 w-full" data-name="List → Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">Contact</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="col-[11/span_2] content-stretch flex flex-col items-start justify-self-stretch pb-[144px] relative row-1 self-start shrink-0" data-name="Container">
      <ListItem />
    </div>
  );
}

function Container44() {
  return (
    <div className="max-w-[1440px] relative shrink-0 w-full" data-name="Container">
      <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_168px] max-w-[inherit] px-[80px] relative size-full">
        <Container45 />
        <Container49 />
        <Container50 />
        <Container51 />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#f5ece7] content-stretch flex flex-col items-start py-[120px] relative shrink-0 w-full" data-name="Footer">
      <Container44 />
    </div>
  );
}

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

function Container53() {
  return (
    <div className="content-stretch flex gap-[32px] items-start pl-[0.94px] relative shrink-0" data-name="Container">
      <LinkCssTransform />
      <Link1 />
      <Link2 />
    </div>
  );
}

function Container55() {
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

function Button5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container55 />
    </div>
  );
}

function Container56() {
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

function Button6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container56 />
    </div>
  );
}

function Container57() {
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

function Button7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <Container57 />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Container">
      <Button5 />
      <Button6 />
      <Button7 />
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[80px] max-w-[1440px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between max-w-[inherit] px-[80px] relative size-full">
          <Container53 />
          <Container54 />
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
    <div className="absolute backdrop-blur-[12px] bg-[rgba(255,248,245,0.4)] content-stretch flex flex-col items-start left-0 pb-px top-0 w-[1280px]" data-name="TopNavBar">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.2)] border-b border-solid inset-0 pointer-events-none" />
      <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 left-0 shadow-[0px_40px_40px_-15px_rgba(109,91,74,0.04)] top-0 w-[1280px]" data-name="TopNavBar:shadow" />
      <Container52 />
    </div>
  );
}

export default function ShopAllCandlesLumosAura() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[22px] pt-[80px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 248, 245) 0%, rgb(255, 248, 245) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Shop All Candles - Lumos Aura">
      <Main />
      <Footer />
      <TopNavBar />
    </div>
  );
}