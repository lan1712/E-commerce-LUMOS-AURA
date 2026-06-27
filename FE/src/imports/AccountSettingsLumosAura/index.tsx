import svgPaths from "./svg-ng2w0ya1mb";
import imgImageBackgroundBorderShadow from "./28190d0da851a53a2fd706f430d889047a75ae8c.png";

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
    <div className="backdrop-blur-[12px] bg-[rgba(255,248,245,0.4)] content-stretch flex flex-col items-start pb-px relative shrink-0 w-[1280px] z-[4]" data-name="TopNavBar">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.2)] border-b border-solid inset-0 pointer-events-none" />
      <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 left-0 shadow-[0px_40px_40px_-15px_rgba(109,91,74,0.04)] top-0 w-[1280px]" data-name="TopNavBar:shadow" />
      <Container />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[32px] w-full">
        <p className="leading-[40px] mb-0">My</p>
        <p className="leading-[40px]">Account</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Link">
      <div className="bg-[#6b5948] relative rounded-[9999px] shrink-0 size-[4px]" data-name="Background" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Profile</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[12px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
            <p className="leading-[20px]">Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[12px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
            <p className="leading-[20px]">Wishlist</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[12px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
            <p className="leading-[20px]">Addresses</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[12px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
            <p className="leading-[20px]">Settings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Link8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[12px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#7f756d] text-[14px] tracking-[0.7px] whitespace-nowrap">
            <p className="leading-[20px]">Log Out</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-name="Link:margin">
      <Link8 />
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex flex-col gap-[11.5px] items-start relative shrink-0 w-full" data-name="Nav">
      <Link3 />
      <Link4 />
      <Link5 />
      <Link6 />
      <Link7 />
      <LinkMargin />
    </div>
  );
}

function AsideSidebarNavigation() {
  return (
    <div className="col-[1/span_2] content-stretch flex flex-col gap-[32px] items-start justify-self-stretch pb-[542px] relative row-1 self-start shrink-0" data-name="Aside - Sidebar Navigation">
      <Heading />
      <Nav />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">REWARD BALANCE</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container" opacity="0.5">
          <path d={svgPaths.p10730e80} fill="var(--fill-0, #735A36)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Heading1 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[64px] tracking-[-1.28px] w-full">
        <p className="leading-[72px]">2,450</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container10 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#735a36] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Redeem Points</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Container">
          <path d={svgPaths.p304eaa0} fill="var(--fill-0, #735A36)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full" data-name="Margin">
      <Container11 />
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between relative size-full">
        <Container7 />
        <Margin />
      </div>
    </div>
  );
}

function RewardsCardGoldBorderEquivalent() {
  return (
    <div className="bg-[#fbf2ed] col-[1/span_5] justify-self-stretch relative rounded-[12px] row-1 self-start shrink-0" data-name="Rewards Card (Gold Border equivalent)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[33px] relative size-full">
          <div className="absolute bg-[rgba(255,221,176,0.2)] blur-[32px] bottom-[-79px] right-[-79px] rounded-[9999px] size-[256px]" data-name="Overlay+Blur" />
          <Container6 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(115,90,54,0.3)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_40px_40px_-15px_rgba(109,91,74,0.02)]" />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">LATEST ORDER</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#7f756d] text-[12px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">#LA-8842</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pr-[0.01px] relative size-full">
          <Heading2 />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1e1b18] text-[24px] w-full">
        <p className="leading-[36px]">Midnight Sandalwood</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] w-full">
        <p className="leading-[24px]">50ml Extrait de Parfum</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[68.45px] relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px] mb-0">In Transit - Expected Delivery</p>
        <p className="leading-[16px]">Tomorrow</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pt-[12px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-[#6d5b4a] h-[8px] relative rounded-[9999px] shrink-0 w-[7.95px]" data-name="Background" />
      <Container20 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="Container">
      <Heading3 />
      <Container18 />
      <Container19 />
    </div>
  );
}

function Container21() {
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

function Button3() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-center p-px relative rounded-[9999px] shrink-0 w-[39.78px]" data-name="Button">
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container21 />
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center relative size-full">
        <div className="pointer-events-none relative rounded-[8px] shrink-0 size-[96px]" data-name="Image+Background+Border+Shadow">
          <div aria-hidden className="absolute bg-size-[94px_94px,auto_auto] bg-top-left inset-0 rounded-[8px]" style={{ backgroundImage: `url("${imgImageBackgroundBorderShadow}"), linear-gradient(90deg, rgb(233, 225, 220) 0%, rgb(233, 225, 220) 100%)` }} />
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_2px_4px_1px_rgba(0,0,0,0.05)]" />
          <div aria-hidden className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 rounded-[8px]" />
        </div>
        <Container17 />
        <Button3 />
      </div>
    </div>
  );
}

function LatestOrderCard() {
  return (
    <div className="backdrop-blur-[2px] bg-[rgba(245,236,231,0.5)] col-[6/span_7] justify-self-stretch relative rounded-[12px] row-1 self-start shrink-0" data-name="Latest Order Card">
      <div aria-hidden className="absolute border border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start pb-[45px] pt-[33px] px-[33px] relative size-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_-0.02px_0_0] rounded-[12px] shadow-[0px_40px_40px_-15px_rgba(109,91,74,0.04)]" data-name="Latest Order Card:shadow" />
        <Container14 />
        <Container16 />
      </div>
    </div>
  );
}

function SectionDashboardBentoGrid() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_230px] relative shrink-0 w-full" data-name="Section - Dashboard Bento Grid">
      <RewardsCardGoldBorderEquivalent />
      <LatestOrderCard />
    </div>
  );
}

function Separator() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Separator">
      <div aria-hidden className="absolute border-[rgba(209,196,187,0.3)] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function SeparatorMargin() {
  return (
    <div className="content-stretch flex flex-col h-[65px] items-start py-[32px] relative shrink-0 w-full" data-name="Separator:margin">
      <Separator />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[28px] w-full">
        <p className="leading-[42px]">Personal Information</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">First Name</p>
      </div>
    </div>
  );
}

function LabelMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Label:margin">
      <Label />
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-auto relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[16px] w-full">
          <p className="leading-[24px]">Eleanor</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="relative shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-[9px] pt-[8px] relative rounded-[inherit] size-full">
        <Container22 />
      </div>
      <div aria-hidden className="absolute border-[#d1c4bb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FirstName() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="First Name">
      <LabelMargin />
      <Input />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">Last Name</p>
      </div>
    </div>
  );
}

function LabelMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Label:margin">
      <Label1 />
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-auto relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[16px] w-full">
          <p className="leading-[24px]">Vance</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-[9px] pt-[8px] relative rounded-[inherit] size-full">
        <Container23 />
      </div>
      <div aria-hidden className="absolute border-[#d1c4bb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function LastName() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Last Name">
      <LabelMargin1 />
      <Input1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">Email Address</p>
      </div>
    </div>
  );
}

function LabelMargin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Label:margin">
      <Label2 />
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-auto relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[16px] w-full">
          <p className="leading-[24px]">eleanor.vance@example.com</p>
        </div>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-[9px] pt-[8px] relative rounded-[inherit] size-full">
        <Container24 />
      </div>
      <div aria-hidden className="absolute border-[#d1c4bb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function EmailAddress() {
  return (
    <div className="col-[1/span_2] content-stretch flex flex-col items-start justify-self-stretch relative row-2 self-start shrink-0" data-name="Email Address">
      <LabelMargin2 />
      <Input2 />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">Phone Number</p>
      </div>
    </div>
  );
}

function LabelMargin3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Label:margin">
      <Label3 />
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-auto relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[16px] w-full">
          <p className="leading-[24px]">+1 (555) 019-2834</p>
        </div>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-[9px] pt-[8px] relative rounded-[inherit] size-full">
        <Container25 />
      </div>
      <div aria-hidden className="absolute border-[#d1c4bb] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function PhoneNumber() {
  return (
    <div className="col-[1/span_2] content-stretch flex flex-col items-start justify-self-stretch relative row-3 self-start shrink-0" data-name="Phone Number">
      <LabelMargin3 />
      <Input3 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#6b5948] content-stretch flex flex-col items-center justify-center px-[32px] py-[12px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Save Changes</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[33px] py-[13px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Discard</p>
      </div>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[15.99px] items-center relative shrink-0 w-full" data-name="Actions">
      <Button4 />
      <Button5 />
    </div>
  );
}

function ActionsMargin() {
  return (
    <div className="col-[1/span_2] content-stretch flex flex-col items-start justify-self-stretch pt-[16px] relative row-4 self-start shrink-0" data-name="Actions:margin">
      <Actions />
    </div>
  );
}

function Form() {
  return (
    <div className="gap-x-[24px] gap-y-[32px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[____65px_65px_65px_62px] relative shrink-0 w-full" data-name="Form">
      <FirstName />
      <LastName />
      <EmailAddress />
      <PhoneNumber />
      <ActionsMargin />
    </div>
  );
}

function SectionPersonalInfoEditor() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[768px] pb-[16px] relative shrink-0 w-[768px]" data-name="Section - Personal Info Editor">
      <Heading4 />
      <Form />
    </div>
  );
}

function ProfileCanvas() {
  return (
    <div className="col-[3/span_10] content-stretch flex flex-col gap-[64px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Profile Canvas">
      <SectionDashboardBentoGrid />
      <SeparatorMargin />
      <SectionPersonalInfoEditor />
    </div>
  );
}

function MainContent() {
  return (
    <div className="max-w-[1440px] relative shrink-0 w-full z-[3]" data-name="Main Content">
      <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_866px] max-w-[inherit] px-[80px] py-[120px] relative size-full">
        <div className="absolute bg-[rgba(253,218,172,0.1)] blur-[50px] left-0 rounded-[9999px] size-[500px] top-[160px]" data-name="Subtle Side Aura" />
        <AsideSidebarNavigation />
        <ProfileCanvas />
      </div>
    </div>
  );
}

function Heading2Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0" data-name="Heading 2:margin">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[40px] whitespace-nowrap">
        <p className="leading-[48px]">Lumos Aura</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">© 2024 Lumos Aura. All rights reserved.</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="col-[1/span_4] content-stretch flex flex-col items-start justify-center justify-self-stretch relative row-1 self-start shrink-0" data-name="Container">
      <Heading2Margin />
      <Container28 />
    </div>
  );
}

function Link9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">Brand Story</p>
      </div>
    </div>
  );
}

function Link10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">Newsletter</p>
      </div>
    </div>
  );
}

function Link11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">Shipping Policy</p>
      </div>
    </div>
  );
}

function Link12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">Privacy Policy</p>
      </div>
    </div>
  );
}

function Link13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">Contact</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="col-[5/span_8] content-stretch flex gap-[64px] h-[88px] items-center justify-end justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <Link9 />
      <Link10 />
      <Link11 />
      <Link12 />
      <Link13 />
    </div>
  );
}

function Container26() {
  return (
    <div className="max-w-[1440px] relative shrink-0 w-full" data-name="Container">
      <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_88px] max-w-[inherit] px-[80px] relative size-full">
        <Container27 />
        <Container29 />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#f5ece7] content-stretch flex flex-col items-start py-[120px] relative shrink-0 w-full z-[2]" data-name="Footer">
      <Container26 />
    </div>
  );
}

export default function AccountSettingsLumosAura() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 248, 245) 0%, rgb(255, 248, 245) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Account Settings - Lumos Aura">
      <TopNavBar />
      <MainContent />
      <Footer />
      <div className="absolute h-[800px] left-0 right-0 top-0 z-[1]" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1280 800' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(75.472 0 0 75.472 640 400)'><stop stop-color='rgba(200,169,126,0.15)' offset='0'/><stop stop-color='rgba(200,169,126,0)' offset='0.7'/></radialGradient></defs></svg>\")" }} data-name="Ambient Background Glow" />
    </div>
  );
}