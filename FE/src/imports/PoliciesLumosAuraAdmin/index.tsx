import svgPaths from "./svg-8x5s1pzqcf";
import imgAdminUserAvatar from "./01644e0f08d99a4b8b094ca1905499a9f9151bda.png";

function Item() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Item">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Content</p>
      </div>
    </div>
  );
}

function ItemMargin() {
  return (
    <div className="h-[9px] relative shrink-0 w-[12.317px]" data-name="Item:margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.3167 9">
        <g id="Item:margin">
          <path d={svgPaths.p4e76d80} fill="var(--fill-0, #4E453E)" id="Item â chevron_right" />
        </g>
      </svg>
    </div>
  );
}

function ItemMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[8px] relative shrink-0" data-name="Item:margin">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Policies</p>
      </div>
    </div>
  );
}

function OrderedList() {
  return (
    <div className="content-stretch flex items-center relative self-stretch shrink-0" data-name="Ordered List">
      <Item />
      <ItemMargin />
      <ItemMargin1 />
    </div>
  );
}

function Nav() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Nav">
      <OrderedList />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[32px] whitespace-nowrap">
        <p className="leading-[40px]">Edit Shipping Policy</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[287.69px]" data-name="Container">
      <Nav />
      <Heading1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[8.75px] relative shrink-0 w-[12.833px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8333 8.75">
        <g id="Container">
          <path d={svgPaths.p1b1e2a00} fill="var(--fill-0, #6B5948)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[7.99px] items-center px-[17px] py-[9px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden className="absolute border border-[#7f756d] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container2 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] text-center tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Preview</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 size-[9.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 9.33333">
        <g id="Container">
          <path d={svgPaths.p27c8b700} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#6b5948] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[7.99px] items-center pb-[9px] pt-[8.5px] px-[16px] relative rounded-[8px] shrink-0" data-name="Button">
      <Container3 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Publish Changes</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function PageHeader() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Page Header">
      <Container />
      <Container1 />
    </div>
  );
}

function PageHeaderMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0 w-full" data-name="Page Header:margin">
      <PageHeader />
    </div>
  );
}

function Image() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="image">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="image">
          <path d="M6.3 8.4L10.5 12.6L14.7 8.4" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.575" />
        </g>
      </svg>
    </div>
  );
}

function ImageClip() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_-0.33px_0_0] items-start justify-center overflow-clip pl-[100px] pr-[8px] py-[3.5px]" data-name="image clip">
      <Image />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Normal text</p>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pl-[12px] pr-[40px] py-[4px] relative shrink-0" data-name="Options">
      <ImageClip />
      <Container4 />
    </div>
  );
}

function OptionsMargin() {
  return (
    <div className="relative shrink-0" data-name="Options:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[8px] relative size-full">
        <Options />
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="h-[24px] relative shrink-0 w-[9px]" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[4px] relative size-full">
        <div className="bg-[#d1c4bb] h-[24px] relative shrink-0 w-px" data-name="Vertical Divider" />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[11.667px] relative shrink-0 w-[8.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.66667 11.6667">
        <g id="Container">
          <path d={svgPaths.p12ef4f00} fill="var(--fill-0, #1E1B18)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[6px] relative size-full">
        <Container5 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[11.667px] relative shrink-0 w-[10.833px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.8333 11.6667">
        <g id="Container">
          <path d={svgPaths.p27604ec0} fill="var(--fill-0, #1E1B18)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[6px] relative size-full">
        <Container6 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[15px] relative shrink-0 w-[11.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 15">
        <g id="Container">
          <path d={svgPaths.p50e11c0} fill="var(--fill-0, #1E1B18)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[6px] relative size-full">
        <Container7 />
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[9px]" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[4px] relative size-full">
        <div className="bg-[#d1c4bb] h-[24px] relative shrink-0 w-px" data-name="Vertical Divider" />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[8.333px] relative shrink-0 w-[16.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 8.33333">
        <g id="Container">
          <path d={svgPaths.p3a06da80} fill="var(--fill-0, #1E1B18)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[6px] relative size-full">
        <Container8 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Container">
          <path d={svgPaths.p27b37980} fill="var(--fill-0, #1E1B18)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[6px] relative size-full">
        <Container9 />
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[9px]" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[4px] relative size-full">
        <div className="bg-[#d1c4bb] h-[24px] relative shrink-0 w-px" data-name="Vertical Divider" />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[13.333px] relative shrink-0 w-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 13.3333">
        <g id="Container">
          <path d={svgPaths.p4822980} fill="var(--fill-0, #1E1B18)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[6px] relative size-full">
        <Container10 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[16.667px] relative shrink-0 w-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 16.6667">
        <g id="Container">
          <path d={svgPaths.p19b38080} fill="var(--fill-0, #1E1B18)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[6px] relative size-full">
        <Container11 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[10px] relative shrink-0 w-[14.167px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.1667 10">
        <g id="Container">
          <path d={svgPaths.p18ffaf80} fill="var(--fill-0, #1E1B18)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center p-[6px] relative size-full">
        <Container12 />
      </div>
    </div>
  );
}

function EditorToolbar() {
  return (
    <div className="bg-[#fbf2ed] relative shrink-0 w-full" data-name="Editor Toolbar">
      <div aria-hidden className="absolute border-[#d1c4bb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center pb-[9px] pt-[8px] px-[8px] relative size-full">
          <OptionsMargin />
          <Margin />
          <Button2 />
          <Button3 />
          <Button4 />
          <Margin1 />
          <Button5 />
          <Button6 />
          <Margin2 />
          <Button7 />
          <Button8 />
          <Button9 />
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[16px] w-full">
        <p className="leading-[24px]">Domestic Shipping (US)</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] w-full">
        <p className="leading-[26px] mb-0">At Lumos Aura, we treat every order with the same care and precision as our</p>
        <p className="leading-[26px] mb-0">craft. Standard shipping (3-5 business days) is complimentary on all orders</p>
        <p className="leading-[26px] mb-0">over $150. For expedited needs, we offer 2-Day Air ($25) and Next Day</p>
        <p className="leading-[26px]">Delivery ($40).</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] w-full">
        <p className="leading-[26px] mb-0">Please note that due to the delicate nature of our glass vessels and ambient</p>
        <p className="leading-[26px] mb-0">liquid formulas, all shipments are temperature-controlled and require a</p>
        <p className="leading-[26px]">signature upon delivery to ensure safe arrival.</p>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[16px] w-full">
        <p className="leading-[24px]">International Shipping</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] w-full">
        <p className="leading-[26px] mb-0">We currently ship to select international destinations. Shipping rates and</p>
        <p className="leading-[26px] mb-0">delivery times vary by region and are calculated at checkout. Duties and taxes</p>
        <p className="leading-[26px]">are the responsibility of the recipient.</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Item">
      <div className="-translate-y-1/2 absolute flex flex-col justify-center left-0 top-[12px]">
        <p className="leading-[24px]">{` `}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col justify-center left-0 top-[12px]">
        <p className="leading-[24px]">Canada: 5-7 business days</p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Item">
      <div className="-translate-y-1/2 absolute flex flex-col justify-center left-0 top-[12px]">
        <p className="leading-[24px]">{` `}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col justify-center left-0 top-[12px]">
        <p className="leading-[24px]">{`UK & EU: 7-10 business days`}</p>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Item">
      <div className="-translate-y-1/2 absolute flex flex-col justify-center left-0 top-[12px]">
        <p className="leading-[24px]">{` `}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col justify-center left-0 top-[12px]">
        <p className="leading-[24px]">Asia Pacific: 10-14 business days</p>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="relative shrink-0 w-full" data-name="List">
      <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[8px] items-start leading-[0] not-italic pl-[20px] relative size-full text-[#4e453e] text-[16px] whitespace-nowrap">
        <Item1 />
        <Item2 />
        <Item3 />
      </div>
    </div>
  );
}

function EditorContentArea() {
  return (
    <div className="bg-[#fff8f5] relative shrink-0 w-full" data-name="Editor Content Area">
      <div className="overflow-auto rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start pb-[251px] pt-[24px] px-[24px] relative size-full">
          <Heading2 />
          <Container13 />
          <Container14 />
          <Heading3 />
          <Container15 />
          <List />
        </div>
      </div>
    </div>
  );
}

function RichTextEditorPanel() {
  return (
    <div className="bg-[#fff8f5] relative rounded-[12px] shrink-0 w-full" data-name="Rich Text Editor Panel">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <EditorToolbar />
        <EditorContentArea />
      </div>
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function LeftColumnEditorSettings() {
  return (
    <div className="col-[1/span_8] content-stretch flex flex-col items-start justify-center justify-self-stretch relative row-1 self-start shrink-0" data-name="Left Column: Editor & Settings">
      <RichTextEditorPanel />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[11.667px] relative shrink-0 w-[11.725px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.725 11.6667">
        <g id="Container">
          <path d={svgPaths.p1a3bd300} fill="var(--fill-0, #6B5948)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-center relative size-full">
        <Container16 />
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] tracking-[0.7px] whitespace-nowrap">
          <p className="leading-[20px]">Page Settings</p>
        </div>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] w-full">
        <p className="leading-[24px]">Page Title</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-auto relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] w-full">
          <p className="leading-[20px]">Shipping Policy</p>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f5ece7] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center px-[13px] py-[9px] relative size-full">
          <Container19 />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Input />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] w-full">
        <p className="leading-[24px]">URL Slug</p>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#fbf2ed] content-stretch flex flex-col items-start left-0 pl-[9px] pr-[8px] py-[9px] rounded-bl-[6px] rounded-tl-[6px] top-1/2" data-name="Background+Border">
      <div aria-hidden className="absolute border-[#d1c4bb] border-b border-l border-solid border-t inset-0 pointer-events-none rounded-bl-[6px] rounded-tl-[6px]" />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#7f756d] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">/policies/</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-auto relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] w-full">
          <p className="leading-[20px]">shipping</p>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#f5ece7] left-[77.78px] right-[-46.45px] rounded-br-[6px] rounded-tr-[6px] top-1/2" data-name="Input">
      <div className="content-stretch flex flex-col items-start overflow-clip px-[13px] py-[9px] relative rounded-[inherit] size-full">
        <Container22 />
      </div>
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-br-[6px] rounded-tr-[6px]" />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder />
      <Input1 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Container21 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[16px] w-full">
        <p className="leading-[24px]">Status</p>
      </div>
    </div>
  );
}

function Image1() {
  return (
    <div className="relative shrink-0 size-[21px]" data-name="image">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="image">
          <path d="M6.3 8.4L10.5 12.6L14.7 8.4" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.575" />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] w-full">
          <p className="leading-[20px]">Published</p>
        </div>
      </div>
    </div>
  );
}

function Options1() {
  return (
    <div className="bg-[#f5ece7] relative rounded-[6px] shrink-0 w-full" data-name="Options">
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[13px] py-[9px] relative size-full">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip pl-[237.33px] pr-[9px] py-[8.5px] relative rounded-[inherit] size-full">
            <Image1 />
          </div>
          <Container24 />
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Options1 />
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
        <Container18 />
        <Container20 />
        <Container23 />
      </div>
    </div>
  );
}

function PageSettings() {
  return (
    <div className="bg-[#fff8f5] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Page Settings">
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[21px] relative size-full">
        <Heading4 />
        <Container17 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 size-[10.5px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 10.5">
        <g id="Container">
          <path d={svgPaths.p1c1607c0} fill="var(--fill-0, #6B5948)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading5() {
  return (
    <div className="relative shrink-0" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-center relative size-full">
        <Container25 />
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#6b5948] text-[14px] tracking-[0.7px] whitespace-nowrap">
          <p className="leading-[20px]">Version History</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder() {
  return (
    <div className="bg-[#fbf2ed] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden className="absolute border-[#d1c4bb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[17px] pt-[16px] px-[16px] relative size-full">
          <Heading5 />
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[7.99px] items-center relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1b18] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Current Draft</p>
      </div>
      <div className="bg-[#6b5948] relative rounded-[9999px] shrink-0 size-[8px]" data-name="Background" />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#7f756d] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">Just now</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] w-full">
        <p className="leading-[16px]">Edited by Admin User</p>
      </div>
    </div>
  );
}

function ItemCurrentVersion() {
  return (
    <div className="bg-[rgba(107,89,72,0.05)] relative shrink-0 w-full" data-name="Item - Current Version">
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[16px] relative size-full">
        <Container27 />
        <Container29 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="[word-break:break-word] bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-[0] not-italic pr-[0.01px] relative size-full whitespace-nowrap">
        <div className="flex flex-col justify-center relative shrink-0 text-[#4e453e] text-[14px]">
          <p className="leading-[20px]">Published Version (v2.4)</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 text-[#7f756d] text-[12px]">
          <p className="leading-[16px]">Oct 12, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] w-full">
          <p className="leading-[16px]">Updated international shipping rates</p>
        </div>
      </div>
    </div>
  );
}

function ItemPreviousVersions() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item - Previous Versions">
      <div aria-hidden className="absolute border-[#d1c4bb] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-[16px] pt-[17px] px-[16px] relative size-full">
        <Paragraph />
        <Container30 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="[word-break:break-word] bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-[0] not-italic pr-[0.01px] relative size-full whitespace-nowrap">
        <div className="flex flex-col justify-center relative shrink-0 text-[#4e453e] text-[14px]">
          <p className="leading-[20px]">Version 2.3</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 text-[#7f756d] text-[12px]">
          <p className="leading-[16px]">Sep 05, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] w-full">
          <p className="leading-[16px]">Added expedited shipping options</p>
        </div>
      </div>
    </div>
  );
}

function Item4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden className="absolute border-[#d1c4bb] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-[16px] pt-[17px] px-[16px] relative size-full">
        <Paragraph1 />
        <Container31 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="[word-break:break-word] bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-[0] not-italic relative size-full whitespace-nowrap">
        <div className="flex flex-col justify-center relative shrink-0 text-[#4e453e] text-[14px]">
          <p className="leading-[20px]">Version 2.0</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 text-[#7f756d] text-[12px]">
          <p className="leading-[16px]">Jan 15, 2023</p>
        </div>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] w-full">
          <p className="leading-[16px]">Major formatting overhaul</p>
        </div>
      </div>
    </div>
  );
}

function Item5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Item">
      <div aria-hidden className="absolute border-[#d1c4bb] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-[16px] pt-[17px] px-[16px] relative size-full">
        <Paragraph2 />
        <Container32 />
      </div>
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="List">
      <ItemCurrentVersion />
      <ItemPreviousVersions />
      <Item4 />
      <Item5 />
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-auto pb-[140px] relative rounded-[inherit] size-full">
        <List1 />
      </div>
    </div>
  );
}

function VersionHistory() {
  return (
    <div className="bg-[#fff8f5] relative rounded-[12px] shrink-0 w-full" data-name="Version History">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <BackgroundHorizontalBorder />
        <Container26 />
      </div>
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function RightColumnVersionHistoryMeta() {
  return (
    <div className="col-[9/span_4] content-stretch flex flex-col gap-[24px] items-start justify-self-stretch relative row-1 self-start shrink-0" data-name="Right Column: Version History & Meta">
      <PageSettings />
      <VersionHistory />
    </div>
  );
}

function EditorPreviewGrid() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_818px] min-h-[600px] relative shrink-0 w-full" data-name="Editor & Preview Grid">
      <LeftColumnEditorSettings />
      <RightColumnVersionHistoryMeta />
    </div>
  );
}

function MainContentArea() {
  return (
    <div className="bg-[#fff8f5] min-h-[960px] relative shrink-0 w-full" data-name="Main Content Area">
      <div className="content-stretch flex flex-col items-start min-h-[inherit] p-[24px] relative size-full">
        <PageHeaderMargin />
        <EditorPreviewGrid />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[14px] w-full">
        <p className="leading-[normal]">Search across command center...</p>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#f5ece7] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center pb-[10px] pl-[40px] pr-[16px] pt-[9px] relative size-full">
          <Container35 />
        </div>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute bottom-[16.67%] content-stretch flex flex-col items-start left-[12px] top-[16.67%]" data-name="Container">
      <div className="relative shrink-0 size-[18px]" data-name="Icon">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p8a35e00} fill="var(--fill-0, #7F756D)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[384px]" data-name="Container">
      <Input2 />
      <Container36 />
    </div>
  );
}

function Container33() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container34 />
      </div>
    </div>
  );
}

function Container38() {
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

function Button10() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <Container38 />
    </div>
  );
}

function Container39() {
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

function Button11() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[9999px] shrink-0" data-name="Button">
      <Container39 />
    </div>
  );
}

function Container37() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-center relative size-full">
        <Button10 />
        <Button11 />
      </div>
    </div>
  );
}

function HeaderTopNavBarAdmin() {
  return (
    <div className="absolute bg-[#fff8f5] content-stretch flex h-[64px] items-center justify-between left-[256px] pb-px px-[24px] right-0 top-0" data-name="Header - TopNavBar (Admin)">
      <div aria-hidden className="absolute border-[#d1c4bb] border-b border-solid inset-0 pointer-events-none" />
      <Container33 />
      <Container37 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="[word-break:break-word] flex flex-col font-['Playfair_Display:Regular',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#6b5948] text-[32px] tracking-[-0.8px] w-full">
        <p className="leading-[40px] mb-0">Lumos Aura</p>
        <p className="leading-[40px]">Command</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[12px] tracking-[0.96px] w-full">
        <p className="leading-[16px]">System Administrator</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[24px] relative size-full">
        <Heading />
        <Container41 />
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[32px] relative size-full">
        <Container40 />
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[25.5px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.5 13.5">
        <g id="Margin">
          <path d={svgPaths.p6210b80} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Dashboard</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <Margin4 />
          <Container43 />
        </div>
      </div>
    </div>
  );
}

function Margin5() {
  return (
    <div className="h-[15px] relative shrink-0 w-[27px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 15">
        <g id="Margin">
          <path d={svgPaths.p33b8000} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Products</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <Margin5 />
          <Container44 />
        </div>
      </div>
    </div>
  );
}

function Margin6() {
  return (
    <div className="h-[15px] relative shrink-0 w-[26.986px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.9861 15">
        <g id="Margin">
          <path d={svgPaths.p24c59600} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Orders</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <Margin6 />
          <Container45 />
        </div>
      </div>
    </div>
  );
}

function Margin7() {
  return (
    <div className="h-[12px] relative shrink-0 w-[28.5px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.5 12">
        <g id="Margin">
          <path d={svgPaths.p33a5df00} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Users</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <Margin7 />
          <Container46 />
        </div>
      </div>
    </div>
  );
}

function Margin8() {
  return (
    <div className="h-[12px] relative shrink-0 w-[27px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 12">
        <g id="Margin">
          <path d={svgPaths.p54abeac} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Vouchers</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <Margin8 />
          <Container47 />
        </div>
      </div>
    </div>
  );
}

function Margin9() {
  return (
    <div className="h-[15px] relative shrink-0 w-[27px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 15">
        <g id="Margin">
          <path d={svgPaths.p1a0e0100} fill="var(--fill-0, #4E453E)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#4e453e] text-[14px] tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Reviews</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <Margin9 />
          <Container48 />
        </div>
      </div>
    </div>
  );
}

function Margin10() {
  return (
    <div className="h-[15px] relative shrink-0 w-[24px]" data-name="Margin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 15">
        <g id="Margin">
          <path d={svgPaths.p2d877200} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[0.7px] whitespace-nowrap">
        <p className="leading-[20px]">Policies</p>
      </div>
    </div>
  );
}

function Link6() {
  return (
    <div className="bg-[#6b5948] opacity-90 relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <Margin10 />
          <Container49 />
        </div>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Container">
      <div className="overflow-auto rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pb-[340px] pt-[4px] px-[16px] relative size-full">
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

function AdminUserAvatar() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Admin User Avatar">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAdminUserAvatar} />
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#e9e1dc] relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background+Border">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <AdminUserAvatar />
      </div>
      <div aria-hidden className="absolute border border-[#d1c4bb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[0] not-italic relative shrink-0 whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center mb-[-0.5px] relative shrink-0 text-[#1e1b18] text-[14px] tracking-[0.7px]">
        <p className="leading-[20px]">Admin User</p>
      </div>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[#6b5948] text-[12px] tracking-[0.96px]">
        <p className="leading-[16px]">Sign out</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[8px] py-[12px] relative size-full">
          <BackgroundBorder1 />
          <Paragraph3 />
        </div>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[16px] relative size-full">
        <Container51 />
      </div>
    </div>
  );
}

function SideNavBar() {
  return (
    <div className="absolute bg-[#fbf2ed] content-stretch flex flex-col h-[1024px] items-start justify-between left-0 pr-px py-[32px] top-0 w-[256px]" data-name="SideNavBar">
      <div aria-hidden className="absolute border-[#d1c4bb] border-r border-solid inset-0 pointer-events-none" />
      <Margin3 />
      <Container42 />
      <Container50 />
    </div>
  );
}

export default function PoliciesLumosAuraAdmin() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[256px] py-[64px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 248, 245) 0%, rgb(255, 248, 245) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Policies - Lumos Aura Admin">
      <MainContentArea />
      <HeaderTopNavBarAdmin />
      <SideNavBar />
    </div>
  );
}