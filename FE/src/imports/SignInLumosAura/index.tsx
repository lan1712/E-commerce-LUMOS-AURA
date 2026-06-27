import svgPaths from "./svg-j58piuxnv5";
import imgMoonlitCandle from "./0dd62d75ac29f77054f3676f0440e8af1ee90b14.png";

function MoonlitCandle() {
  return (
    <div className="flex-[1_0_0] min-h-px mix-blend-multiply opacity-90 relative w-full" data-name="Moonlit Candle">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-18.57%] max-w-none top-0 w-[137.14%]" src={imgMoonlitCandle} />
      </div>
    </div>
  );
}

function LeftPanelAtmosphericImageHiddenOnMobile() {
  return (
    <div className="bg-[#fbf2ed] content-stretch flex flex-col h-full items-start justify-center relative shrink-0 w-[746.66px]" data-name="Left Panel: Atmospheric Image (Hidden on Mobile)">
      <MoonlitCandle />
      <div className="absolute bg-gradient-to-t from-[rgba(218,194,174,0.4)] inset-0 mix-blend-overlay to-[rgba(218,194,174,0)] via-1/2 via-[rgba(218,194,174,0)]" data-name="Subtle gradient overlay for depth" />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 size-[12.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4999 12.4999">
        <g id="Container">
          <path d={svgPaths.p1d59cc00} fill="var(--fill-0, #6B5948)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Return to Shop</p>
      </div>
    </div>
  );
}

function TopNavigationReturnToShopContextualNoGlobalNavLink() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[80px] top-[32px]" data-name="Top Navigation: Return to Shop (Contextual, no global nav) → Link">
      <Container />
      <Container1 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-0 top-0" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[64px] text-center tracking-[-1.28px] whitespace-nowrap">
        <p className="leading-[72px]">Sign In</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[216.21px] opacity-40 top-[29px]" data-name="Button">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7f756d] text-[32px] text-center whitespace-nowrap">
        <p className="leading-[40px]">Create</p>
      </div>
    </div>
  );
}

function ToggleHeader() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Toggle Header">
      <Button />
      <Button1 />
    </div>
  );
}

function ToggleHeaderMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[48px] relative shrink-0 w-full" data-name="Toggle Header:margin">
      <ToggleHeader />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">Email Address</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[18px] w-full">
          <p className="leading-[normal]">your@email.com</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="relative shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[13px] pt-[12px] px-[13px] relative size-full">
          <Container2 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function EmailField() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Email Field">
      <Label />
      <Input />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">Password</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[18px] w-full">
          <p className="leading-[normal]">••••••••</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[13px] pt-[12px] px-[13px] relative size-full">
          <Container3 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function PasswordField() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Password Field">
      <Label1 />
      <Input1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Remember me</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="bg-white relative rounded-[2px] shrink-0 size-[16px]" data-name="Input">
        <div aria-hidden className="absolute border border-[#7f756d] border-solid inset-0 pointer-events-none rounded-[2px]" />
      </div>
      <Label2 />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[12px] tracking-[0.96px] whitespace-nowrap">
        <p className="leading-[16px]">Forgot password?</p>
      </div>
    </div>
  );
}

function ActionLinkForgotPassword() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-0 right-0 top-[-8px]" data-name="Action Link (Forgot Password)">
      <Container4 />
      <Link />
    </div>
  );
}

function ActionLinkForgotPasswordMargin() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Action Link (Forgot Password):margin">
      <ActionLinkForgotPassword />
    </div>
  );
}

function PrimaryActionButton() {
  return (
    <div className="bg-[#6b5948] content-stretch flex flex-col items-center justify-center py-[16px] relative rounded-[9999px] shrink-0 w-full" data-name="Primary Action Button">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Sign In</p>
      </div>
    </div>
  );
}

function PrimaryActionButtonMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Primary Action Button:margin">
      <PrimaryActionButton />
    </div>
  );
}

function FormArea() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Form Area">
      <EmailField />
      <PasswordField />
      <ActionLinkForgotPasswordMargin />
      <PrimaryActionButtonMargin />
    </div>
  );
}

function FormAreaMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Form Area:margin">
      <FormArea />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#7f756d] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">OR CONTINUE WITH</p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Divider">
      <div className="bg-[rgba(209,196,187,0.5)] flex-[1_0_0] h-px min-w-px relative" data-name="Horizontal Divider" />
      <Container5 />
      <div className="bg-[rgba(209,196,187,0.5)] flex-[1_0_0] h-px min-w-px relative" data-name="Horizontal Divider" />
    </div>
  );
}

function DividerMargin() {
  return (
    <div className="content-stretch flex flex-col items-start py-[40px] relative shrink-0 w-full" data-name="Divider:margin">
      <Divider />
    </div>
  );
}

function UsingAGenericLockIconAsPlaceholderForAppleLogoInMaterialSymbols() {
  return (
    <div className="h-[16.25px] relative shrink-0 w-[12.5px]" data-name="Using a generic lock icon as placeholder for Apple logo in Material Symbols">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4999 16.2499">
        <g id="Using a generic lock icon as placeholder for Apple logo in Material Symbols">
          <path d={svgPaths.pa46b700} fill="var(--fill-0, #6B5948)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
          <p className="leading-[20px]">Continue with Apple</p>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center px-px py-[15px] relative rounded-[9999px] shrink-0 w-full" data-name="Button">
      <div aria-hidden className="absolute border border-[rgba(209,196,187,0.6)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <UsingAGenericLockIconAsPlaceholderForAppleLogoInMaterialSymbols />
      <Container6 />
    </div>
  );
}

function UsingAGenericGlobeIconAsPlaceholderForGoogleLogoInMaterialSymbols() {
  return (
    <div className="relative shrink-0 size-[15.833px]" data-name="Using a generic globe icon as placeholder for Google logo in Material Symbols">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.8333 15.8333">
        <g id="Using a generic globe icon as placeholder for Google logo in Material Symbols">
          <path d={svgPaths.p1d4a3c00} fill="var(--fill-0, #6B5948)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
          <p className="leading-[20px]">Continue with Google</p>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center px-px py-[15px] relative rounded-[9999px] shrink-0 w-full" data-name="Button">
      <div aria-hidden className="absolute border border-[rgba(209,196,187,0.6)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <UsingAGenericGlobeIconAsPlaceholderForGoogleLogoInMaterialSymbols />
      <Container7 />
    </div>
  );
}

function SocialLogin() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Social Login">
      <Button2 />
      <Button3 />
    </div>
  );
}

function FormContainer() {
  return (
    <div className="flex-[1_0_0] max-w-[500px] min-h-px relative w-full" data-name="Form Container">
      <div className="flex flex-col justify-center max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center max-w-[inherit] px-[80px] py-[120px] relative size-full">
          <ToggleHeaderMargin />
          <FormAreaMargin />
          <DividerMargin />
          <SocialLogin />
        </div>
      </div>
    </div>
  );
}

function RightPanelMinimalistForms() {
  return (
    <div className="bg-[#fff8f5] content-stretch flex flex-col h-full items-start justify-center overflow-auto pl-[16.65px] pr-[16.68px] relative shrink-0 w-[533.33px]" data-name="Right Panel: Minimalist Forms">
      <TopNavigationReturnToShopContextualNoGlobalNavLink />
      <FormContainer />
    </div>
  );
}

function SplitScreenLayout() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px relative w-full" data-name="Split Screen Layout">
      <LeftPanelAtmosphericImageHiddenOnMobile />
      <RightPanelMinimalistForms />
    </div>
  );
}

export default function SignInLumosAura() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 248, 245) 0%, rgb(255, 248, 245) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Sign In - Lumos Aura">
      <SplitScreenLayout />
    </div>
  );
}