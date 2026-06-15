"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";

type InquiryType =
  | "performance"
  | "teaching"
  | "repair"
  | "instrument-program";

type ProgramInquiryType = "loan" | "instrument-donation" | "money" | "other";

type InquiryOption = {
  id: InquiryType;
  title: string;
  description: string;
};

const programInquiryLabels: Record<ProgramInquiryType, string> = {
  loan: "Request an instrument loan",
  "instrument-donation": "Donate an instrument",
  money: "Support the instrument fund financially",
  other: "General question about the program",
};

const programInquiryOptions = [
  {
    value: "loan",
    label: programInquiryLabels.loan,
    description: "For K-12 violin, viola, or cello students needing an instrument.",
  },
  {
    value: "instrument-donation",
    label: programInquiryLabels["instrument-donation"],
    description: "Offer a violin, viola, cello, bow, case, or related accessory.",
  },
  {
    value: "money",
    label: programInquiryLabels.money,
    description: "Ask about helping with repairs, setups, strings, and accessories.",
  },
  {
    value: "other",
    label: programInquiryLabels.other,
    description: "Start a conversation if you are not sure which path fits.",
  },
] as Array<{
  value: ProgramInquiryType;
  label: string;
  description: string;
}>;

const captchaChallenges: Record<InquiryType, { question: string; answer: string }> = {
  performance: { question: "What is 4 + 3?", answer: "7" },
  teaching: { question: "What is 6 + 2?", answer: "8" },
  repair: { question: "What is 5 + 4?", answer: "9" },
  "instrument-program": { question: "What is 3 + 5?", answer: "8" },
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
  {
    id: "instrument-program",
    title: "Winspiration Studio Instrument Loan and Support Program",
    description: "",
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

const contactMethods = ["Email", "Phone", "Text"];

const programInstrumentOptions = ["Violin", "Viola", "Cello"];

const studentPrivateLessonOptions = ["Yes", "No", "Planning to start"];

const donationItemOptions = ["Violin", "Viola", "Cello", "Bow", "Case", "Other"];

const instrumentConditionOptions = ["Playable", "Needs repair", "Unsure"];

const bowCaseOptions = ["Yes", "No", "Unsure"];

const supportTypeOptions = [
  "One-time contribution",
  "Recurring contribution",
  "Sponsor a repair/setup",
  "Sponsor strings/accessories",
  "Larger gift or conversation",
];

const amountRangeOptions = [
  "$25-$50",
  "$50-$100",
  "$100-$250",
  "$250+",
  "I'd like to discuss",
];

const hourOptions = Array.from({ length: 12 }, (_, index) => String(index + 1));
const minuteOptions = Array.from({ length: 12 }, (_, index) =>
  String(index * 5).padStart(2, "0"),
);
const periodOptions = ["AM", "PM"];

function normalizeInquiryType(type: string | null): InquiryType | null {
  if (
    type === "teaching" ||
    type === "repair" ||
    type === "performance" ||
    type === "instrument-program"
  ) {
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
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-gold/80">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        required={required}
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
  required = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
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
        required={required}
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

function RequiredCheckbox({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  return (
    <label className="flex gap-3 border border-gold/25 bg-gold/10 px-4 py-4 text-sm leading-7 text-ivory-muted">
      <input
        type="checkbox"
        name={name}
        value="Yes"
        required
        className="mt-1 h-4 w-4 accent-gold"
      />
      <span>{label}</span>
    </label>
  );
}

function InquiryForm({
  selectedType,
  submittedType,
  captchaError,
  submitError,
  successMessage,
  isSubmitting,
  onSubmit,
  onClose,
}: {
  selectedType: InquiryType;
  submittedType: InquiryType | null;
  captchaError: string;
  submitError: string;
  successMessage: string;
  isSubmitting: boolean;
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
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="mb-7">
        <p className="text-xs uppercase tracking-[0.28em] text-bronze-soft">
          {title}
        </p>
        {selectedType !== "instrument-program" ? (
          <p className="mt-3 text-sm leading-7 text-ivory-muted">
            To keep scheduling, repair details, and event information
            organized, all inquiries begin through the form. Phone
            consultations are available when helpful after initial details are
            received.
          </p>
        ) : null}
      </div>

      {selectedType === "performance" ? <PerformanceInquiryFields /> : null}
      {selectedType === "teaching" ? <TeachingInquiryFields /> : null}
      {selectedType === "repair" ? <RepairInquiryFields /> : null}
      {selectedType === "instrument-program" ? (
        <InstrumentProgramInquiryFields />
      ) : null}

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
          {successMessage}
        </p>
      ) : null}

      {submitError ? (
        <p className="mt-6 border border-gold/30 bg-gold/10 px-4 py-3 text-sm leading-6 text-gold">
          {submitError}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 w-full items-center justify-center bg-ivory px-7 text-sm font-medium uppercase tracking-[0.22em] text-espresso transition duration-300 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-espresso disabled:cursor-wait disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting
            ? "Sending..."
            : selectedType === "instrument-program"
            ? "Send Instrument Loan / Support Inquiry"
            : "Send Inquiry"}
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

function InstrumentProgramInquiryFields() {
  const [programType, setProgramType] = useState<ProgramInquiryType | "">("");

  return (
    <div className="space-y-7">
      <p className="text-sm leading-7 text-ivory-muted">
        Use this form to request an instrument loan, offer an instrument
        donation, or ask about supporting the program. I&apos;ll review your
        inquiry and follow up directly. For program purpose and eligibility
        details, see{" "}
        <a
          href="/about#instrument-loans"
          className="border-b border-gold/45 text-ivory transition hover:border-gold hover:text-gold"
        >
          the About page program section
        </a>
        .
      </p>

      <fieldset>
        <legend className="mb-3 block text-xs uppercase tracking-[0.24em] text-gold/80">
          Primary inquiry type
        </legend>
        <div className="grid gap-3 md:grid-cols-2">
          {programInquiryOptions.map((option) => {
            const isSelected = programType === option.value;

            return (
              <label
                key={option.value}
                className={`cursor-pointer border px-4 py-4 transition duration-300 ${
                  isSelected
                    ? "border-gold/70 bg-gold/15 text-ivory shadow-[0_18px_42px_rgba(132,104,60,0.14)]"
                    : "border-ivory/10 bg-espresso/35 text-ivory-muted hover:border-gold/45 hover:text-ivory"
                }`}
              >
                <span className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="programInquiryType"
                    value={option.value}
                    checked={isSelected}
                    onChange={(event) =>
                      setProgramType(event.target.value as ProgramInquiryType)
                    }
                    required
                    className="mt-1 h-4 w-4 accent-gold"
                  />
                  <span>
                    <span className="block text-sm font-medium text-ivory">
                      {option.label}
                    </span>
                    <span className="mt-2 block text-sm leading-6">
                      {option.description}
                    </span>
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {programType ? (
        <>
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
              label="Preferred contact method"
              name="preferredContactMethod"
              options={contactMethods}
              required
            />
            <TextField label="City/state" name="cityState" required />
          </div>

          {programType === "loan" ? (
            <div className="space-y-7 border border-gold/20 bg-espresso/25 p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-gold/80">
                Instrument Loan Request
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Parent/guardian name"
                  name="parentGuardianName"
                  required
                />
                <TextField label="Student name" name="studentName" required />
                <TextField label="Student grade" name="studentGrade" required />
                <TextField
                  label="Student age"
                  name="studentAge"
                  type="number"
                  required
                />
                <TextField label="Student school" name="studentSchool" />
                <SelectField
                  label="Instrument needed"
                  name="instrumentNeeded"
                  options={programInstrumentOptions}
                  required
                />
                <TextField
                  label="Current instrument size, if known"
                  name="currentInstrumentSize"
                  placeholder="1/2 violin, 15 inch viola, 3/4 cello..."
                />
                <TextField
                  label="Current playing level / years studied"
                  name="playingLevel"
                  required
                />
                <SelectField
                  label="Does the student take private lessons?"
                  name="privateLessons"
                  options={studentPrivateLessonOptions}
                  required
                />
                <TextField
                  label="Teacher name, optional"
                  name="teacherName"
                />
                <TextField
                  label="How soon is the instrument needed?"
                  name="timeline"
                  required
                />
              </div>
              <TextAreaField
                label="Briefly describe the need or circumstance"
                name="loanNeed"
                rows={4}
                required
              />
              <TextAreaField
                label="Anything else I should know?"
                name="loanDetails"
                rows={4}
              />
            </div>
          ) : null}

          {programType === "instrument-donation" ? (
            <div className="space-y-7 border border-gold/20 bg-espresso/25 p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-gold/80">
                Instrument Donation
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField label="Donor name" name="donorName" />
                <SelectField
                  label="Instrument type"
                  name="donationItem"
                  options={donationItemOptions}
                  required
                />
                <TextField
                  label="Instrument size, if known"
                  name="donationInstrumentSize"
                />
                <SelectField
                  label="Instrument condition"
                  name="instrumentCondition"
                  options={instrumentConditionOptions}
                  required
                />
                <SelectField
                  label="Does it include a bow/case?"
                  name="includesBowCase"
                  options={bowCaseOptions}
                />
                <TextField
                  label="Brand/maker/label, if known"
                  name="brandMaker"
                />
                <TextField
                  label="City/state where the instrument is located"
                  name="instrumentLocation"
                  required
                />
              </div>
              <p className="border border-gold/20 bg-gold/10 px-4 py-3 text-sm leading-6 text-ivory-muted">
                You may describe the instrument here. I may ask for photos by
                email.
              </p>
              <TextAreaField
                label="Additional details"
                name="instrumentDetails"
                rows={5}
              />
            </div>
          ) : null}

          {programType === "money" ? (
            <div className="space-y-7 border border-gold/20 bg-espresso/25 p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-gold/80">
                Instrument Fund Support
              </p>
              <SelectField
                label="Preferred support type"
                name="supportType"
                options={supportTypeOptions}
                required
              />
              <SelectField
                label="Optional amount range"
                name="amountRange"
                options={amountRangeOptions}
              />
              <TextAreaField label="Message, optional" name="supportMessage" />
              <p className="border border-gold/20 bg-gold/10 px-4 py-3 text-sm leading-6 text-ivory-muted">
                No direct payment link is configured for this program yet, so
                this will be sent as an inquiry.
              </p>
              <RequiredCheckbox
                name="contributionAcknowledgment"
                label="I understand that Winspiration Studio is not currently a registered nonprofit organization and contributions may not be tax-deductible."
              />
            </div>
          ) : null}

          <TextAreaField
            label="Message / additional details"
            name="message"
            rows={5}
            required={programType === "other"}
          />
        </>
      ) : null}
    </div>
  );
}

export function Inquiry() {
  const [selectedType, setSelectedType] =
    useState<InquiryType | null>(null);
  const [submittedType, setSubmittedType] = useState<InquiryType | null>(null);
  const [captchaError, setCaptchaError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSelectedType(normalizeInquiryType(params.get("type")));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedType) {
      return;
    }

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const captchaAnswer = String(formData.get("captchaAnswer") || "")
      .trim()
      .toLowerCase();

    if (captchaAnswer !== captchaChallenges[selectedType].answer) {
      setCaptchaError("Please check the captcha answer and try again.");
      setSubmittedType(null);
      setSuccessMessage("");
      setSubmitError("");
      return;
    }

    setCaptchaError("");
    setSubmitError("");
    setSuccessMessage("");
    setSubmittedType(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
        error?: string;
      } | null;

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.error || "Unable to send this inquiry right now.",
        );
      }

      setSuccessMessage(
        result.message ||
          "Thank you. Your inquiry has been sent. I'll review it and follow up directly.",
      );
      setSubmittedType(selectedType);
      form.reset();
    } catch (error) {
      setSubmittedType(null);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to send this inquiry right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
                    setSubmitError("");
                    setSuccessMessage("");
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
                          submitError={submitError}
                          successMessage={successMessage}
                          isSubmitting={isSubmitting}
                          onSubmit={handleSubmit}
                          onClose={() => {
                            setSelectedType(null);
                            setSubmittedType(null);
                            setCaptchaError("");
                            setSubmitError("");
                            setSuccessMessage("");
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
