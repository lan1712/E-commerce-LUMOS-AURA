import svgPaths from "./svg-47f1jl6let";
import imgMapOfParisLocation from "./d23f576f5fdb799e18abbb974d927f937b7c42d0.png";

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

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[64px] text-center tracking-[-1.28px] whitespace-nowrap">
        <p className="leading-[72px]">Connect with the Aura</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[672px] relative shrink-0 w-[672px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[18px] text-center whitespace-nowrap">
        <p className="leading-[28px] mb-0">We invite you to reach out for personalized fragrance consultations, inquiries</p>
        <p className="leading-[28px] mb-0">about our bespoke collections, or any assistance you may require on your</p>
        <p className="leading-[28px]">olfactory journey.</p>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center py-[64px] relative shrink-0 w-full" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1120 300' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(57.974 0 0 57.974 560 150)'><stop stop-color='rgba(200,169,126,0.1)' offset='0'/><stop stop-color='rgba(200,169,126,0)' offset='0.7'/></radialGradient></defs></svg>\")" }} data-name="Header">
      <Heading />
      <Container6 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[32px] w-full">
          <p className="leading-[40px]">Send a Message</p>
        </div>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] w-full">
        <p className="leading-[20px]">Name</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(209,196,187,0.5)] w-full">
          <p className="leading-[normal]">Your full name</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="relative shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex items-start justify-center overflow-clip pb-[11px] pt-[10px] relative rounded-[inherit] size-full">
        <Container8 />
      </div>
      <div aria-hidden className="absolute border-[#d1c4bb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Input />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] w-full">
        <p className="leading-[20px]">Email</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(209,196,187,0.5)] w-full">
          <p className="leading-[normal]">your@email.com</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex items-start justify-center overflow-clip pb-[11px] pt-[10px] relative rounded-[inherit] size-full">
        <Container10 />
      </div>
      <div aria-hidden className="absolute border-[#d1c4bb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Input1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] w-full">
        <p className="leading-[20px]">Message</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(209,196,187,0.5)] w-full">
          <p className="leading-[24px]">How can we assist you?</p>
        </div>
      </div>
    </div>
  );
}

function Textarea() {
  return (
    <div className="relative shrink-0 w-full" data-name="Textarea">
      <div className="content-stretch flex items-start justify-center overflow-auto pb-[81px] pt-[8px] relative rounded-[inherit] size-full">
        <Container12 />
      </div>
      <div aria-hidden className="absolute border-[#d1c4bb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Textarea />
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 size-[9.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
        <g id="Container">
          <path d={svgPaths.pce77c00} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#6b5948] content-stretch flex gap-[8px] items-center justify-center px-[32px] py-[12px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Send Message</p>
      </div>
      <Container13 />
    </div>
  );
}

function Form() {
  return (
    <div className="relative shrink-0 w-full" data-name="Form">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative size-full">
        <Container7 />
        <Container9 />
        <Container11 />
        <Button3 />
      </div>
    </div>
  );
}

function LeftContactForm() {
  return (
    <div className="bg-white col-[1/span_7] justify-self-stretch relative rounded-[16px] row-1 self-start shrink-0" data-name="Left: Contact Form">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-start pb-[112px] pt-[49px] px-[49px] relative size-full">
          <Heading1 />
          <div className="absolute bg-[rgba(115,90,54,0.05)] blur-[32px] right-[-95px] rounded-[9999px] size-[256px] top-[-95px]" data-name="Overlay+Blur" />
          <Form />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(209,196,187,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_24px_-8px_rgba(109,91,74,0.08)]" />
    </div>
  );
}

function Heading2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[32px] w-full">
          <p className="leading-[40px]">Boutique Information</p>
        </div>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="h-[24px] relative shrink-0 w-[16px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 24">
        <g id="Margin">
          <path d={svgPaths.p23890c00} fill="var(--fill-0, #735A36)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Flagship Boutique</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px] mb-0">{`124 Perfumer's Row`}</p>
        <p className="leading-[24px]">Paris, France 75008</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[151.71px]" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[15.99px] items-start relative shrink-0 w-full" data-name="Container">
      <Margin />
      <Container16 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Margin">
          <path d={svgPaths.p1088ddc0} fill="var(--fill-0, #735A36)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Email Inquiries</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">concierge@lumosaura.com</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[207.09px]" data-name="Container">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[15.99px] items-start relative shrink-0 w-full" data-name="Container">
      <Margin1 />
      <Container20 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="h-[22px] relative shrink-0 w-[18px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 22">
        <g id="Margin">
          <path d={svgPaths.p287f4f00} fill="var(--fill-0, #735A36)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Telephone</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">+33 1 45 67 89 00</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[138px]" data-name="Container">
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[15.99px] items-start relative shrink-0 w-full" data-name="Container">
      <Margin2 />
      <Container24 />
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative size-full">
        <Container15 />
        <Container19 />
        <Container23 />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#fbf2ed] relative rounded-[16px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[rgba(209,196,187,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[33px] relative size-full">
        <Heading2 />
        <Container14 />
      </div>
    </div>
  );
}

function MapOfParisLocation() {
  return (
    <div className="absolute inset-px mix-blend-multiply opacity-80" data-name="Map of Paris location">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[181.72%] left-0 max-w-none top-[-40.86%] w-full" src={imgMapOfParisLocation} />
      </div>
    </div>
  );
}

function OverlayBorderOverlayBlur() {
  return (
    <div className="absolute backdrop-blur-[2px] bg-[rgba(255,248,245,0.9)] bottom-[17px] content-stretch flex flex-col items-start left-[17px] px-[17px] py-[9px] rounded-[8px]" data-name="Overlay+Border+OverlayBlur">
      <div aria-hidden className="absolute border border-[rgba(209,196,187,0.2)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">GET DIRECTIONS</p>
      </div>
    </div>
  );
}

function MapPlaceholder() {
  return (
    <div className="bg-[#f5ece7] h-[250px] min-h-[250px] relative rounded-[16px] shrink-0 w-full" data-name="Map Placeholder">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <MapOfParisLocation />
        <div className="absolute bg-[rgba(107,89,72,0.05)] inset-px" data-name="Overlay" />
        <OverlayBorderOverlayBlur />
      </div>
      <div aria-hidden className="absolute border border-[rgba(209,196,187,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function RightBusinessInfoMap() {
  return (
    <div className="col-[8/span_5] content-stretch flex flex-col gap-[32px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Right: Business Info & Map">
      <BackgroundBorder />
      <MapPlaceholder />
    </div>
  );
}

function SectionSplitLayoutContactFormInfo() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_628px] relative shrink-0 w-full" data-name="Section - Split Layout: Contact Form & Info">
      <LeftContactForm />
      <RightBusinessInfoMap />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[40px] text-center whitespace-nowrap">
        <p className="leading-[48px]">Frequently Asked Questions</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1e1b18] text-[32px] whitespace-nowrap">
        <p className="leading-[40px]">Do you offer international shipping?</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Container">
          <path d={svgPaths.p2bb32400} fill="var(--fill-0, #D1C4BB)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between py-[8px] relative size-full">
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function FaqItem() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17px] relative shrink-0 w-full" data-name="FAQ Item 1">
      <div aria-hidden className="absolute border-[rgba(209,196,187,0.3)] border-b border-solid inset-0 pointer-events-none" />
      <Button4 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1e1b18] text-[32px] whitespace-nowrap">
        <p className="leading-[40px]">How are your fragrances formulated?</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Container">
          <path d={svgPaths.p2bb32400} fill="var(--fill-0, #D1C4BB)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between py-[8px] relative size-full">
        <Container30 />
        <Container31 />
      </div>
    </div>
  );
}

function FaqItem1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17px] relative shrink-0 w-full" data-name="FAQ Item 2">
      <div aria-hidden className="absolute border-[rgba(209,196,187,0.3)] border-b border-solid inset-0 pointer-events-none" />
      <Button5 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1e1b18] text-[32px] whitespace-nowrap">
        <p className="leading-[40px]">Can I purchase a sample set?</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Container">
          <path d={svgPaths.p2bb32400} fill="var(--fill-0, #D1C4BB)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between py-[8px] relative size-full">
        <Container32 />
        <Container33 />
      </div>
    </div>
  );
}

function FaqItem2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[17px] relative shrink-0 w-full" data-name="FAQ Item 3">
      <div aria-hidden className="absolute border-[rgba(209,196,187,0.3)] border-b border-solid inset-0 pointer-events-none" />
      <Button6 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <FaqItem />
      <FaqItem1 />
      <FaqItem2 />
    </div>
  );
}

function FaqSection() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start max-w-[768px] pt-[56px] relative shrink-0 w-[768px]" data-name="FAQ Section">
      <Heading3 />
      <Container27 />
    </div>
  );
}

function Main() {
  return (
    <div className="max-w-[1440px] relative shrink-0 w-full" data-name="Main">
      <div className="flex flex-col items-center max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[64px] items-center max-w-[inherit] pb-[126px] pt-[120px] px-[80px] relative size-full">
          <Header />
          <SectionSplitLayoutContactFormInfo />
          <FaqSection />
        </div>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[40px] w-full">
        <p className="leading-[48px]">Lumos Aura</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[320px] relative shrink-0 w-[320px]" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px] mb-0">Illuminating the senses through high-end</p>
        <p className="leading-[24px]">olfactory art and cosmic mysticism.</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="col-[1/span_4] content-stretch flex flex-col gap-[24px] items-start justify-self-stretch pb-[24px] relative row-1 self-start shrink-0" data-name="Container">
      <Link3 />
      <Container36 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">EXPLORE</p>
      </div>
    </div>
  );
}

function Heading4Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Heading 4:margin">
      <Heading4 />
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Brand Story</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Newsletter</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-full items-start min-w-[150px] relative shrink-0 w-[150px]" data-name="Container">
      <Heading4Margin />
      <Link4 />
      <Link5 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[16px]">SUPPORT</p>
      </div>
    </div>
  );
}

function Heading4Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Heading 4:margin">
      <Heading5 />
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Shipping Policy</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function Link8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Contact</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-full items-start min-w-[150px] relative shrink-0 w-[150px]" data-name="Container">
      <Heading4Margin1 />
      <Link6 />
      <Link7 />
      <Link8 />
    </div>
  );
}

function Container37() {
  return (
    <div className="col-[5/span_8] content-stretch flex gap-[32px] h-[144px] items-start justify-end justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Container38 />
      <Container39 />
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] whitespace-nowrap">
          <p className="leading-[16px]">© 2024 Lumos Aura. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

function LinkSocialPlaceholders() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link - Social placeholders">
      <div className="relative shrink-0 size-[16.667px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
          <path d={svgPaths.p178f9780} fill="var(--fill-0, #4E453E)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[16.667px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <LinkSocialPlaceholders />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex items-center justify-between pt-[33px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden className="absolute border-[rgba(209,196,187,0.2)] border-solid border-t inset-0 pointer-events-none" />
      <Container40 />
      <Container41 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="col-[1/span_12] content-stretch flex flex-col items-start justify-self-stretch pt-[48px] relative row-2 self-start shrink-0" data-name="Margin">
      <HorizontalBorder />
    </div>
  );
}

function Container34() {
  return (
    <div className="max-w-[1440px] relative shrink-0 w-full" data-name="Container">
      <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[__144px_101px] max-w-[inherit] px-[80px] relative size-full">
        <Container35 />
        <Container37 />
        <Margin3 />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#f5ece7] content-stretch flex flex-col items-start py-[120px] relative shrink-0 w-full" data-name="Footer">
      <Container34 />
    </div>
  );
}

export default function ContactUsLumosAura() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 248, 245) 0%, rgb(255, 248, 245) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Contact Us - Lumos Aura">
      <TopNavBar />
      <Main />
      <Footer />
    </div>
  );
}