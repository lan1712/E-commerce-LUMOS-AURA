import { useState } from "react";
import { useNav } from "../context";
import { Footer } from "../components/Footer";

const sections = [
  { id: "return", label: "Return Policy" },
  { id: "shipping", label: "Shipping Information" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms of Service" },
];

function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mb-14 scroll-mt-28"
    >
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 400,
          fontSize: 36,
          color: "#3d3530",
          lineHeight: "44px",
          marginBottom: 20,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        fontSize: 15,
        color: "#4e453e",
        lineHeight: "26px",
        marginBottom: 16,
      }}
    >
      {children}
    </p>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: "0.96px",
        color: "#3d3530",
        textTransform: "uppercase",
        marginBottom: 8,
        marginTop: 20,
      }}
    >
      {children}
    </p>
  );
}

function ShippingCard({ title, sub1, sub2 }: { title: string; sub1: string; sub2: string }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: "#fff8f5", border: "1px solid #efe6e2" }}
    >
      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: "#3d3530", marginBottom: 6 }}>{title}</p>
      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13, color: "#675a4e" }}>{sub1}</p>
      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13, color: "#675a4e" }}>{sub2}</p>
    </div>
  );
}

export function BrandPoliciesPage() {
  const { navigate } = useNav();
  const [activeSection, setActiveSection] = useState("return");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "#fff8f5" }}>
      <div className="max-w-[1280px] mx-auto w-full px-10 pt-32 pb-20 flex gap-16">
        {/* Sidebar */}
        <aside className="w-48 shrink-0">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "1.2px",
              color: "#7f756d",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Policies
          </p>
          <nav className="flex flex-col gap-1 sticky top-28">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left px-2 py-2 rounded transition-colors"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: activeSection === id ? 600 : 400,
                  fontSize: 14,
                  color: activeSection === id ? "#6b5948" : "#4e453e",
                  backgroundColor: activeSection === id ? "#efe6e2" : "transparent",
                  borderLeft: activeSection === id ? "2px solid #6b5948" : "2px solid transparent",
                }}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 max-w-[780px]">
          {/* Intro */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: "#675a4e",
              lineHeight: "26px",
              marginBottom: 48,
            }}
          >
            Transparency and care in every interaction. Review our policies to understand your rights, our processes, and how we protect your experience with Lumos Aura.
          </p>

          {/* Return Policy */}
          <PolicySection id="return" title="Return Policy">
            <BodyText>
              We want you to be entirely satisfied with your Lumos Aura purchase. Due to the delicate and personal nature of our olfactory art pieces, we accept returns on unopened, unused merchandise in its original condition and packaging within 14 days of delivery.
            </BodyText>
            <SubHeading>Non-returnable items</SubHeading>
            <ul
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 15,
                color: "#4e453e",
                lineHeight: "28px",
                paddingLeft: 20,
                marginBottom: 16,
              }}
            >
              <li>Opened or used fragrances</li>
              <li>Personalised or custom-engraved items</li>
              <li>Gift cards and digital products</li>
            </ul>
            <BodyText>
              To initiate a return, please contact our concierge at concierge@lumosaura.com. Please note that return shipping costs are the responsibility of the customer unless the item arrived damaged or incorrect.
            </BodyText>
          </PolicySection>

          {/* Shipping Information */}
          <PolicySection id="shipping" title="Shipping Information">
            <BodyText>
              All orders are carefully prepared and dispatched from our atelier. We offer complimentary standard shipping on all domestic orders above $100.
            </BodyText>
            <div className="grid grid-cols-2 gap-4 my-6">
              <ShippingCard
                title="Standard Shipping"
                sub1="3–5 business days"
                sub2="Complimentary on orders $100+"
              />
              <ShippingCard
                title="Expedited Shipping"
                sub1="1–2 business days"
                sub2="$24.00 flat rate on all orders"
              />
            </div>
            <BodyText>
              International orders are shipped via our premium courier partners. Delivery times vary by destination (typically 5–10 business days). Please note that customs duties and import taxes are the responsibility of the recipient.
            </BodyText>
          </PolicySection>

          {/* Privacy Policy */}
          <PolicySection id="privacy" title="Privacy Policy">
            <BodyText>
              Your privacy is of utmost importance to us. This policy outlines how we collect, use, and protect your personal information when you interact with our website, products, and services.
            </BodyText>
            <SubHeading>Information We Collect</SubHeading>
            <BodyText>
              We collect information such as your name, email address, shipping and payment details to fulfil your orders and enhance your experience. We do not sell your personal information to third parties.
            </BodyText>
            <SubHeading>Data Security</SubHeading>
            <BodyText>
              Our website utilises secure, encrypted protocols to ensure your data remains protected during transmission. All payment information is processed by PCI-compliant third-party providers.
            </BodyText>
            <SubHeading>Cookies</SubHeading>
            <BodyText>
              We use essential and analytical cookies to improve your browsing experience and understand how visitors engage with our content. You may manage cookie preferences at any time through your browser settings.
            </BodyText>
          </PolicySection>

          {/* Terms of Service */}
          <PolicySection id="terms" title="Terms of Service">
            <BodyText>
              By accessing or using the Lumos Aura Website, you agree to be bound by these Terms of Service. These terms govern your use of our site and services.
            </BodyText>
            <BodyText>
              All content, including images, text, and product descriptions on this website are the exclusive property of Lumos Aura and are protected by applicable intellectual property laws. Unauthorised reproduction or distribution of any materials is strictly prohibited.
            </BodyText>
            <BodyText>
              We reserve the right to modify prices, discontinue products, or update these terms at any time without prior notice.
            </BodyText>
          </PolicySection>

          <div
            className="rounded-2xl p-6 flex items-center justify-between"
            style={{ backgroundColor: "#f5ece7" }}
          >
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 22, color: "#3d3530" }}>
                Still have questions?
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#675a4e", marginTop: 4 }}>
                Our concierge team is here to help.
              </p>
            </div>
            <button
              onClick={() => navigate("contact")}
              className="rounded-full px-6 py-3 hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: "#6b5948",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.7px",
                color: "white",
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
