"use client";

import { useState } from "react";
import { Dot } from "@/components/ui";

type FormState = {
  fullName: string;
  email: string;
  organisation: string;
  opportunityType: string;
  subject: string;
  message: string;
};

const emptyForm: FormState = {
  fullName: "",
  email: "",
  organisation: "",
  opportunityType: "AI/ML internship",
  subject: "",
  message: "",
};

const labelClass = "label-xs mb-2 block text-mist";
const requiredMark = <span className="ml-1 text-accent">*</span>;

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setStatusMessage(
          result.persisted
            ? "Thank you! Your message has been received and saved."
            : "Thank you! Your message has been received."
        );
        setFormData(emptyForm);
      } else {
        setStatus("error");
        setStatusMessage(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setStatusMessage(
        "Network error. Please try emailing me directly at sanjanareddy2607@gmail.com."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={status === "submitting"}
      className="panel brackets brackets-accent relative p-5 md:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/70 pb-4">
        <span className="label text-accent">Transmission</span>
        <span className="label-xs inline-flex items-center gap-2 text-faint">
          <Dot />
          Channel open
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {status === "success" && (
          <div
            role="status"
            aria-live="polite"
            className="border-l-2 border-accent bg-accent/10 px-4 py-3 text-[13px] text-accent"
          >
            {statusMessage}
          </div>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="border-l-2 border-red-400/70 bg-red-500/10 px-4 py-3 text-[13px] text-red-300"
          >
            {statusMessage}
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full name{requiredMark}
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            required
            autoComplete="name"
            value={formData.fullName}
            onChange={handleChange}
            className="field"
            placeholder="Mummaka Sanjana Reddy"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email{requiredMark}
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="field"
            placeholder="sanjanareddy2607@gmail.com"
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="organisation" className={labelClass}>
            Organisation <span className="text-faint">(optional)</span>
          </label>
          <input
            id="organisation"
            type="text"
            name="organisation"
            autoComplete="organization"
            value={formData.organisation}
            onChange={handleChange}
            className="field"
            placeholder="Company / University / Lab"
          />
        </div>
        <div>
          <label htmlFor="opportunityType" className={labelClass}>
            Opportunity type
          </label>
          <select
            id="opportunityType"
            name="opportunityType"
            value={formData.opportunityType}
            onChange={handleChange}
            className="field"
          >
            <option value="AI/ML internship">AI/ML Internship</option>
            <option value="Software engineering opportunity">Software Engineering Opportunity</option>
            <option value="Research collaboration">Research Collaboration</option>
            <option value="International internship">International Internship</option>
            <option value="Technical collaboration">Technical Collaboration</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className={labelClass}>
          Subject{requiredMark}
        </label>
        <input
          id="subject"
          type="text"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="field"
          placeholder="e.g. AI/ML Engineering Collaboration"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelClass}>
          Message{requiredMark}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          className="field resize-y"
          placeholder="Tell me about the project or opportunity..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-primary mt-6 w-full"
      >
        {status === "submitting" ? (
          <>
            Transmitting
            <span className="h-3 w-3 animate-spin rounded-full border border-void/40 border-t-void" />
          </>
        ) : (
          <>
            Send message
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </>
        )}
      </button>

      <p className="label-xs mt-4 text-faint">
        Fields marked <span className="text-accent">*</span> are required. Messages are stored for
        correspondence only — see the{" "}
        <a href="/privacy-policy" className="text-mist underline decoration-line-hi underline-offset-4 hover:text-accent">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
};

export default ContactForm;
