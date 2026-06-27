import { useState } from "react";
import imgMap from "../../imports/ContactUsLumosAura/d23f576f5fdb799e18abbb974d927f937b7c42d0.png";
import { useNav } from "../context";
import { Footer } from "../components/Footer";
import { MapPin, Mail, Phone, Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Do you offer international shipping?",
    a: "Yes, we ship to over 50 countries worldwide via our premium courier partners. Delivery typically takes 5–10 business days. Customs duties may apply depending on your location.",
  },
  {
    q: "How are your fragrances formulated?",
    a: "Each Lumos Aura fragrance is developed in collaboration with master perfumers using a blend of natural essential oils and responsibly sourced aromatic compounds. Our formulas are always phthalate-free and cruelty-free.",
  },
  {
    q: "Can I purchase a sample set?",
    a: "We offer a Discovery Set featuring 5 of our signature scents in 2ml vials. It's the perfect introduction to the Lumos Aura universe. Available in our shop.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns on unopened, unused merchandise within 14 days of delivery. Please contact our concierge to initiate a return. Personalised items are non-returnable.",
  },
  {
    q: "How do I care for my candles?",
    a: "For the perfect first burn, allow the wax to melt across the entire surface. Trim your wick to 5mm before each use. Never burn for more than 4 hours at a time.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(209,196,187,0.5)" }}>
      <button
        className="w-full flex items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: open ? 600 : 400,
            fontSize: 16,
            color: "#3d3530",
            lineHeight: "24px",
          }}
        >
          {question}
        </span>
        <div className="shrink-0 ml-4">
          {open ? <Minus size={16} color="#6b5948" /> : <Plus size={16} color="#6b5948" />}
        </div>
      </button>
      {open && (
        <p
          className="pb-5"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 15,
            color: "#675a4e",
            lineHeight: "26px",
          }}
        >
          {answer}
        </p>
      )}
    </div>
  );
}

function InputField({
  label,
  placeholder,
  value,
  onChange,
  multiline,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const shared = {
    style: {
      borderBottom: "1px solid #d1c4bb",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      fontSize: 15,
      color: "#3d3530",
      backgroundColor: "transparent",
    } as React.CSSProperties,
    placeholder,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    className: "outline-none w-full pb-2 resize-none transition-colors",
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      (e.target.style.borderBottomColor = "#6b5948"),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      (e.target.style.borderBottomColor = "#d1c4bb"),
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: "0.96px",
          color: "#7f756d",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={4} />
      ) : (
        <input {...shared} type="text" />
      )}
    </div>
  );
}

export function ContactUsPage() {
  const { navigate } = useNav();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "#fff8f5" }}>
      {/* Hero header */}
      <div className="pt-40 pb-16 flex flex-col items-center text-center px-8">
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: 56,
            color: "#3d3530",
            letterSpacing: "-0.5px",
            lineHeight: "64px",
            marginBottom: 16,
          }}
        >
          Connect with the Aura
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 17,
            color: "#675a4e",
            lineHeight: "28px",
            maxWidth: 540,
          }}
        >
          We invite you to reach out for personalised fragrance consultations, inquiries about our bespoke collections, or any assistance you may require on your olfactory journey.
        </p>
      </div>

      {/* Two-column contact area */}
      <div className="max-w-[1100px] mx-auto w-full px-10 pb-20">
        <div className="grid grid-cols-[1fr_360px] gap-8">
          {/* Send a message */}
          <div
            className="rounded-2xl p-8"
            style={{ backgroundColor: "white", border: "1px solid #efe6e2", boxShadow: "0 4px 20px rgba(109,91,74,0.06)" }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: 32,
                color: "#3d3530",
                lineHeight: "40px",
                marginBottom: 28,
              }}
            >
              Send a Message
            </h2>
            {sent ? (
              <div className="flex flex-col items-center py-12 gap-4 text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#6b5948" }}
                >
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                    <path d="M1.5 7L6.5 12L16.5 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 24, color: "#3d3530" }}>
                  Message Sent
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#675a4e" }}>
                  Our concierge will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-7">
                <InputField
                  label="Name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                />
                <InputField
                  label="Email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                />
                <InputField
                  label="Message"
                  placeholder="How can we help you on your olfactory journey?"
                  value={form.message}
                  onChange={(v) => setForm({ ...form, message: v })}
                  multiline
                />
                <button
                  onClick={handleSend}
                  className="self-start rounded-full px-6 py-3 hover:opacity-90 transition-opacity flex items-center gap-2"
                  style={{
                    backgroundColor: "#6b5948",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: "0.7px",
                    color: "white",
                  }}
                >
                  Send Message →
                </button>
              </div>
            )}
          </div>

          {/* Boutique Information */}
          <div className="flex flex-col gap-6">
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "white", border: "1px solid #efe6e2", boxShadow: "0 4px 20px rgba(109,91,74,0.06)" }}
            >
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontSize: 24,
                  color: "#3d3530",
                  lineHeight: "32px",
                  marginBottom: 20,
                }}
              >
                Boutique Information
              </h2>
              <div className="flex flex-col gap-5">
                {/* Address */}
                <div className="flex gap-3">
                  <MapPin size={16} color="#735a36" className="shrink-0 mt-0.5" />
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: "#3d3530" }}>
                      Flagship Boutique
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13, color: "#675a4e", lineHeight: "20px" }}>
                      124 Perfumer's Row<br />Paris, France 75008
                    </p>
                  </div>
                </div>
                {/* Email */}
                <div className="flex gap-3">
                  <Mail size={16} color="#735a36" className="shrink-0 mt-0.5" />
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: "#3d3530" }}>
                      Email Inquiries
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13, color: "#675a4e" }}>
                      concierge@lumosaura.com
                    </p>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex gap-3">
                  <Phone size={16} color="#735a36" className="shrink-0 mt-0.5" />
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: "#3d3530" }}>
                      Telephone
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13, color: "#675a4e" }}>
                      +33 1 45 67 88 00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden relative" style={{ height: 200 }}>
              <img
                src={imgMap}
                alt="Map of Paris boutique location"
                className="w-full h-full object-cover"
              />
              <button
                className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: "#6b5948",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: "1px",
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                Get Directions
              </button>
            </div>

            {/* Hours */}
            <div
              className="rounded-2xl p-5"
              style={{ backgroundColor: "#f5ece7" }}
            >
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "1px", color: "#7f756d", textTransform: "uppercase", marginBottom: 12 }}>
                Opening Hours
              </p>
              {[
                { days: "Mon – Fri", hours: "10:00 – 19:00" },
                { days: "Saturday", hours: "10:00 – 18:00" },
                { days: "Sunday", hours: "Closed" },
              ].map(({ days, hours }) => (
                <div key={days} className="flex justify-between py-1.5" style={{ borderBottom: "1px solid rgba(209,196,187,0.4)" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13, color: "#4e453e" }}>{days}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13, color: "#3d3530" }}>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2
            className="text-center mb-10"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontSize: 40,
              color: "#3d3530",
              lineHeight: "48px",
            }}
          >
            Frequently Asked Questions
          </h2>
          <div className="max-w-[760px] mx-auto">
            <div style={{ borderTop: "1px solid rgba(209,196,187,0.5)" }}>
              {faqs.map((faq) => (
                <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
