"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";

const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vivekanand-choudhari-817829118/",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Dribbble",
    url: "https://dribbble.com/VivekanandChoudhari",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.81zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zm7.56-7.872c.282.386 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.29zm10.868 3.702c-.216.3-1.9 2.49-5.724 4.058.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
      </svg>
    ),
  },
  {
    name: "Behance",
    url: "https://www.behance.net/vivekanand6f29C",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/vivekanandchoudhari",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const contactEmail = "vivekanand.design@gmail.com";
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // fallback
    }
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subjectMap: Record<string, string> = {
      job: "Job Opportunity",
      contract: "Contract / Freelance",
      collaboration: "Collaboration",
      speaking: "Speaking / Advisory",
      other: "Just Saying Hi",
    };
    const subjectLabel = subjectMap[formState.subject] ?? formState.subject;
    const body = [
      `Name: ${formState.name}`,
      formState.mobile ? `Mobile: ${formState.mobile}` : "",
      ``,
      formState.message,
    ]
      .filter(Boolean)
      .join("%0A");
    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(
      `[Portfolio] ${subjectLabel}`
    )}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="pt-24">
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">
              Get in Touch
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Let&apos;s build
              <br />
              something{" "}
              <span className="text-gradient">great.</span>
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Whether you&apos;re working on a product that needs design leadership,
              looking for a design engineer, or just want to chat about design
              and tech — I&apos;d love to hear from you.
            </p>

            {/* Email */}
            <div className="mb-8">
              <p className="text-muted text-sm mb-2">Email</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-base sm:text-xl font-bold text-accent hover:text-accent/80 transition-colors break-all"
                >
                  {contactEmail}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-surface border border-border text-xs font-semibold text-muted hover:text-foreground hover:border-accent/30 transition-colors w-fit"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  {copied ? "Copied" : "Copy email"}
                </button>
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="text-muted text-sm mb-4">Find me on</p>
              <div className="flex gap-4">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/20 transition-all"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>



            {/* Resume Download */}
            <div className="mt-8">
              <p className="text-muted text-sm mb-3">Resume</p>
              <a
                href="/VIVEKANAND_CHOUDHARI_2026_New.pdf"
                download="Vivekanand_Choudhari_Resume.pdf"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-surface border border-border text-sm font-semibold text-foreground hover:border-accent/40 hover:text-accent transition-all duration-200 group"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
                <span className="text-xs text-muted font-normal">PDF</span>
              </a>
            </div>


          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-muted mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-4 py-3 min-h-11 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-muted mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full px-4 py-3 min-h-11 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-muted mb-2"
                  >
                    Mobile Number <span className="text-muted/50">(optional)</span>
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    value={formState.mobile}
                    onChange={(e) =>
                      setFormState({ ...formState, mobile: e.target.value })
                    }
                    className="w-full px-4 py-3 min-h-11 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-muted mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    required
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState({ ...formState, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 min-h-11 rounded-xl bg-surface border border-border text-foreground focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="">Select a topic</option>
                    <option value="job">Job Opportunity</option>
                    <option value="contract">Contract / Freelance</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="speaking">Speaking / Advisory</option>
                    <option value="other">Just Saying Hi</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-muted mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="w-full px-4 py-3 min-h-11 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-all hover:shadow-lg hover:shadow-accent/20"
                >
                  Open Email Client
                </button>

              </form>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
