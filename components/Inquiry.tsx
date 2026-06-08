"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";

type InquiryType = "performance" | "teaching" | "repair";

type InquiryOption = {
  id: InquiryType;
  title: string;
  description: string;
};

const captchaChallenges: Record<InquiryType, { question: string; answer: string }> = {
  performance: { question: "What is 4 + 3?", answer: "7" },
  teaching: { question: "What is 6 + 2?", answer: "8" },
  repair: { question: "What is 5 + 4?", answer: "9" },
};

const inquiryOptions: InquiryOption[] = [
  {
    id: "performance",
    title: "Performance Inquiry",
    description:
      "Weddings, proposals, memorials, private events, public performances, and ensemble music.",
  },
  {
    id: "teaching",
    title: "Teaching Inquiry",
    description:
      "Private violin lessons, student goals, lesson format, scheduling, and studio questions.",
  },
  {
    id: "repair",
    title: "Bow Repair & Instrument Care Inquiry",
    description:
      "Bow rehairs, bow repair, instrument setup, maintenance, and playability questions.",
  },
];

const musicNeeds = [
  "Ceremony",
  "Cocktail hour",
  "Dinner",
  "Reception",
  "Background music",
  "Funeral / memorial",
  "Restaurant / public performance",
  "Other",
];

const lessonFormats = ["In-person", "Online", "Unsure"];

const repairInstrumentTypes = [
  "Violin",
  "Viola",
  "Cello",
  "Bass",
  "Period instrument",
  "Other",
];

const repairServices = [
  "Bow rehair",
  "Bow repair",
  "Instrument setup",
  "Instrument maintenance",
  "Unsure",
];

const hourOptions = Array.from({ length: 12 }, (_, index) => String(index + 1));
const minuteOptions = Array.from({ length: 12 }, (_, index) =>
  String(index * 5).padStart(2, "0"),
);
const periodOptions = ["AM", "PM"];

function normalizeInquiryType(type: string | null): InquiryType | null {
  if (type === "teaching" || type === "repair" || type === "performance") {
    return type;
  }

  return null;
}

function toTwentyFourHourTime(
  hour: string,
  minute: string,
  period: string,
) {
  if (!hour || !minute || !period) {
    return "";
  }

  let numericHour = Number(hour);

  if (period === "AM" && numericHour === 12) {
    numericHour = 0;
  }

  if (period === "PM" && numericHour !== 12) {
    numericHour += 12;
  }

  return `${String(numericHour).padStart(2, "0")}:${minute}`;
}

function TextField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-gold/80">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="min-h-14 w-full border border-ivory/10 bg-espresso/40 px-4 text-ivory outline-none transition placeholder:text-ivory-muted/35 focus:border-gold/70 focus:bg-espresso/65"
      />
    </label>
  );
}

function DateField({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-gold/80">
        {label}
      </span>
      <input
        name={name}
        type="date"
        className="min-h-14 w-full cursor-pointer border border-ivory/10 bg-espresso/40 px-4 text-ivory outline-none transition placeholder:text-ivory-muted/35 focus:border-gold/70 focus:bg-espresso/65"
      />
      <span className="mt-2 block text-xs leading-5 text-ivory-muted/75">
        Choose from the calendar, or type the date directly.
      </span>
    </label>
  );
}

function TimeSelectField({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [period, setPeriod] = useState("");
  const value = toTwentyFourHourTime(hour, minute, period);
  const selectClass =
    "min-h-14 w-full cursor-pointer border border-ivory/10 bg-espresso/40 px-4 text-ivory outline-none transition focus:border-gold/70 focus:bg-espresso/65";

  return (
    <fieldset>
      <legend className="mb-3 block text-xs uppercase tracking-[0.24em] text-gold/80">
        {label}
      </legend>
      <input type="hidden" name={name} value={value} />
      <div className="grid grid-cols-[1fr_auto_1fr_1fr] items-center gap-2">
        <select
          aria-label={`${label} hour`}
          value={hour}
          onChange={(event) => setHour(event.target.value)}
          className={selectClass}
        >
          <option value="">--</option>
          {hourOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="text-lg text-ivory-muted">:</span>
        <select
          aria-label={`${label} minute`}
          value={minute}
          onChange={(event) => setMinute(event.target.value)}
          className={selectClass}
        >
          <option value="">--</option>
          {minuteOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          aria-label={`${label} AM or PM`}
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          className={selectClass}
        >
          <option value="">--</option>
          {periodOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <span className="mt-2 block text-xs leading-5 text-ivory-muted/75">
        Select hour, minute, and AM/PM.
      </span>
    </fieldset>
  );
}

function SelectField({
  label,
  name,
  options,
  placeholder = "Select one",
}: {
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-gold/80">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="min-h-14 w-full border border-ivory/10 bg-espresso/40 px-4 text-ivory outline-none transition focus:border-gold/70 focus:bg-espresso/65"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  name,
  placeholder,
  rows = 5,
}: {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-gold/80">
        {label}
      </span>
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-none border border-ivory/10 bg-espresso/40 px-4 py-4 text-ivory outline-none transition placeholder:text-ivory-muted/35 focus:border-gold/70 focus:bg-espresso/65"
      />
    </label>
  );
}

function CheckboxGroup({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <fieldset>
      <legend className="mb-3 block text-xs uppercase tracking-[0.24em] text-gold/80">
        {label}
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex min-h-12 cursor-pointer items-center gap-3 border border-ivory/10 bg-espresso/35 px-4 py-3 text-sm text-ivory-muted transition hover:border-gold/50 hover:text-ivory"
          >
            <input
              type="checkbox"
              name={name}
              value={option}
              className="h-4 w-4 accent-gold"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function InquiryForm({
  selectedType,
  submittedType,
  captchaError,
  onSubmit,
  onClose,
}: {
  selectedType: InquiryType;
  submittedType: InquiryType | null;
  captchaError: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  const title = useMemo(
    () => inquiryOptions.find((option) => option.id === selectedType)?.title,
    [selectedType],
  );

  return (
    <form
      method="post"
      data-inquiry-type={selectedType}
      onSubmit={onSubmit}
      className="elegant-surface relative overflow-hidden border border-ivory/10 p-5 backdrop-blur sm:p-8"
    >
      <div className="absolute inset-x-0 top-0 h-px candleline opacity-70" />
      <input type="hidden" name="inquiryType" value={selectedType} />

      <div className="mb-7">
        <p className="text-xs uppercase tracking-[0.28em] text-bronze-soft">
          {title}
        </p>
        <p className="mt-3 text-sm leading-7 text-ivory-muted">
          To keep scheduling, repair details, and event information organized,
          all inquiries begin through the form. Phone consultations are
          available when helpful after initial details are received.
        </p>
      </div>

      {selectedType === "performance" ? <PerformanceInquiryFields /> : null}
      {selectedType === "teaching" ? <TeachingInquiryFields /> : null}
      {selectedType === "repair" ? <RepairInquiryFields /> : null}

      <div className="mt-7 border border-gold/20 bg-espresso/35 p-4">
        <label className="block">
          <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-gold/80">
            Captcha Verification
          </span>
          <span className="mb-3 block text-sm leading-7 text-ivory-muted">
            Please answer this quick check before sending:{" "}
            <span className="text-ivory">
              {captchaChallenges[selectedType].question}
            </span>
          </span>
          <input
            name="captchaAnswer"
            inputMode="numeric"
            required
            className="min-h-12 w-full border border-ivory/10 bg-espresso/45 px-4 text-ivory outline-none transition placeholder:text-ivory-muted/35 focus:border-gold/70 sm:max-w-xs"
          />
        </label>
        {captchaError ? (
          <p className="mt-3 text-sm leading-6 text-gold">{captchaError}</p>
        ) : null}
      </div>

      {submittedType === selectedType ? (
        <p className="mt-6 border border-gold/20 bg-ivory/[0.045] px-4 py-3 text-sm leading-6 text-ivory-muted">
          This inquiry form is ready for future delivery setup. Email/backend
          sending has not been connected yet.
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center bg-ivory px-7 text-sm font-medium uppercase tracking-[0.22em] text-espresso transition duration-300 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-espresso sm:w-auto"
        >
          Send Inquiry
        </button>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-12 w-full items-center justify-center border border-ivory/15 bg-espresso/30 px-7 text-sm font-medium uppercase tracking-[0.22em] text-ivory-muted transition duration-300 hover:border-gold/50 hover:text-ivory focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-espresso sm:w-auto"
        >
          Close Form
        </button>
      </div>
    </form>
  );
}

function PerformanceInquiryFields() {
  return (
    <div className="space-y-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" placeholder="Your name" required />
        <TextField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <TextField label="Phone" name="phone" type="tel" />
        <SelectField
          label="Event type"
          name="eventType"
          options={[
            "Wedding",
            "Proposal",
            "Funeral / memorial",
            "Party",
            "Corporate event",
            "Restaurant / public performance",
            "Other",
          ]}
        />
        <DateField label="Event date" name="eventDate" />
        <TextField
          label="Event location / venue"
          name="eventLocation"
          placeholder="City, venue, or private location"
        />
        <TimeSelectField label="Start time" name="startTime" />
        <TextField
          label="Approximate guest count"
          name="guestCount"
          type="number"
        />
        <TextField
          label="Interested package or service"
          name="packageOrService"
          placeholder="Solo violin, duo, trio, quartet, custom package..."
        />
      </div>
      <CheckboxGroup label="Music needs" name="musicNeeds" options={musicNeeds} />
      <TextAreaField
        label="Song requests or style preferences"
        name="songRequests"
        placeholder="Specific songs, artists, classical selections, movie music, mood, or style."
      />
      <TextAreaField
        label="Message / additional details"
        name="message"
        placeholder="Share anything helpful about the event, room, timeline, or atmosphere."
      />
    </div>
  );
}

function TeachingInquiryFields() {
  return (
    <div className="space-y-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" placeholder="Your name" required />
        <TextField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <TextField label="Phone" name="phone" type="tel" />
        <TextField label="Student name" name="studentName" />
        <TextField label="Student age" name="studentAge" type="number" />
        <SelectField
          label="Instrument"
          name="instrument"
          options={["Violin", "Viola", "Other"]}
        />
        <TextField
          label="Current playing level"
          name="playingLevel"
          placeholder="Beginner, intermediate, advanced, returning adult..."
        />
        <SelectField
          label="Preferred lesson format"
          name="lessonFormat"
          options={lessonFormats}
        />
      </div>
      <TextAreaField
        label="Lesson goals"
        name="lessonGoals"
        placeholder="Technique, school orchestra, auditions, confidence, repertoire, returning to playing..."
      />
      <TextAreaField
        label="Preferred schedule or availability"
        name="availability"
        placeholder="Days, times, frequency, or scheduling needs."
      />
      <TextAreaField
        label="Message / additional details"
        name="message"
      />
    </div>
  );
}

function RepairInquiryFields() {
  return (
    <div className="space-y-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" placeholder="Your name" required />
        <TextField
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <TextField label="Phone" name="phone" type="tel" />
        <SelectField
          label="Instrument or bow type"
          name="instrumentOrBowType"
          options={repairInstrumentTypes}
        />
        <SelectField
          label="Service needed"
          name="serviceNeeded"
          options={repairServices}
        />
        <SelectField
          label="Is it currently playable?"
          name="currentlyPlayable"
          options={["Yes", "No", "Unsure"]}
        />
        <TextField
          label="Timeline / deadline"
          name="timeline"
          placeholder="Flexible, before a recital, urgent, etc."
        />
      </div>
      <TextAreaField
        label="Description of issue"
        name="issueDescription"
        placeholder="Describe what happened, what feels different, or what you are hoping to improve."
      />
      <p className="border border-gold/20 bg-espresso/35 px-4 py-3 text-sm leading-6 text-ivory-muted">
        Photos may be requested by email after your inquiry is received.
      </p>
      <TextAreaField
        label="Message / additional details"
        name="message"
      />
    </div>
  );
}

export function Inquiry() {
  const [selectedType, setSelectedType] =
    useState<InquiryType | null>(null);
  const [submittedType, setSubmittedType] = useState<InquiryType | null>(null);
  const [captchaError, setCaptchaError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSelectedType(normalizeInquiryType(params.get("type")));
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedType) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const captchaAnswer = String(formData.get("captchaAnswer") || "")
      .trim()
      .toLowerCase();

    if (captchaAnswer !== captchaChallenges[selectedType].answer) {
      setCaptchaError("Please check the captcha answer and try again.");
      setSubmittedType(null);
      return;
    }

    setCaptchaError("");
    setSubmittedType(selectedType);
  };

  return (
    <section
      id="inquiry"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#fbf7ef,#fffdf7_46%,#f2e8d8)] px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-16"
    >
      <span id="lessons" className="absolute -top-24" aria-hidden="true" />
      <div className="absolute left-[8%] top-16 h-60 w-60 rounded-full bg-ivory/[0.045] blur-3xl" />
      <div className="absolute bottom-12 right-[10%] h-80 w-80 rounded-full bg-gold/[0.055] blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <Reveal delay={0.08} className="space-y-3">
          {inquiryOptions.map((option) => {
            const isSelected = selectedType === option.id;

            return (
              <div
                key={option.id}
                className={`elegant-surface overflow-hidden border transition duration-300 ${
                  isSelected
                    ? "border-gold/65 shadow-[0_32px_92px_rgba(132,104,60,0.18)]"
                    : "border-ivory/10 hover:border-gold/40"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isSelected}
                  aria-controls={`${option.id}-inquiry-panel`}
                  onClick={() => {
                    setSelectedType(isSelected ? null : option.id);
                    setSubmittedType(null);
                    setCaptchaError("");
                  }}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition hover:bg-ivory/[0.04] sm:px-7"
                >
                  <span>
                    <span className="text-[0.64rem] uppercase tracking-[0.26em] text-bronze-soft">
                      {isSelected ? "Close form" : "Open form"}
                    </span>
                    <span className="mt-3 block font-display text-3xl leading-none text-ivory">
                      {option.title}
                    </span>
                    <span className="mt-3 block max-w-3xl text-sm leading-7 text-ivory-muted">
                      {option.description}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`grid h-10 w-10 shrink-0 place-items-center border border-gold/30 text-lg text-gold transition duration-300 ${
                      isSelected ? "rotate-45 bg-gold/10" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  id={`${option.id}-inquiry-panel`}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                    isSelected
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-ivory/10 p-4 sm:p-6">
                      {isSelected ? (
                        <InquiryForm
                          selectedType={option.id}
                          submittedType={submittedType}
                          captchaError={captchaError}
                          onSubmit={handleSubmit}
                          onClose={() => {
                            setSelectedType(null);
                            setSubmittedType(null);
                            setCaptchaError("");
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
