import { NextResponse } from "next/server";

type InquiryType = "performance" | "teaching" | "repair" | "instrument-program";

type ContactPayload = {
  inquiryType: InquiryType;
  programInquiryType?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  fields: Record<string, string | string[]>;
};

const inquiryTypes = new Set<InquiryType>([
  "performance",
  "teaching",
  "repair",
  "instrument-program",
]);

const inquiryLabels: Record<InquiryType, string> = {
  performance: "Wedding/Event Inquiry",
  teaching: "Education Inquiry",
  repair: "General Contact",
  "instrument-program": "Instrument Support",
};

const fieldLabels: Record<string, string> = {
  inquiryType: "Inquiry type",
  programInquiryType: "Program inquiry type",
  name: "Name",
  email: "Email",
  phone: "Phone",
  eventType: "Event type",
  eventDate: "Event date",
  eventLocation: "Event location / venue",
  startTime: "Start time",
  guestCount: "Approximate guest count",
  packageOrService: "Interested package or service",
  musicNeeds: "Music needs",
  songRequests: "Song requests or style preferences",
  message: "Message / additional details",
  studentName: "Student name",
  studentAge: "Student age",
  instrument: "Instrument",
  playingLevel: "Current playing level / years studied",
  lessonFormat: "Preferred lesson format",
  lessonGoals: "Lesson goals",
  availability: "Preferred schedule or availability",
  instrumentOrBowType: "Instrument or bow type",
  serviceNeeded: "Service needed",
  currentlyPlayable: "Is it currently playable?",
  timeline: "Timeline / deadline",
  issueDescription: "Description of issue",
  preferredContactMethod: "Preferred contact method",
  cityState: "City/state",
  parentGuardianName: "Parent/guardian name",
  studentGrade: "Student grade",
  studentSchool: "Student school",
  instrumentNeeded: "Instrument needed",
  currentInstrumentSize: "Current instrument size, if known",
  privateLessons: "Does the student take private lessons?",
  teacherName: "Teacher name",
  loanNeed: "Need / circumstance",
  loanDetails: "Loan details",
  donorName: "Donor name",
  donationItem: "Instrument type",
  donationInstrumentSize: "Instrument size",
  instrumentCondition: "Instrument condition",
  includesBowCase: "Includes bow/case",
  brandMaker: "Brand/maker/label",
  instrumentLocation: "Instrument location",
  instrumentDetails: "Instrument details",
  supportType: "Preferred support type",
  amountRange: "Optional amount range",
  supportMessage: "Support message",
  contributionAcknowledgment: "Tax-deductibility acknowledgment",
};

const programInquiryLabels: Record<string, string> = {
  loan: "Request an instrument loan",
  "instrument-donation": "Donate an instrument",
  money: "Support the instrument fund financially",
  other: "General question about the program",
};

const skippedEmailFields = new Set(["captchaAnswer", "website"]);

function normalizeText(value: unknown) {
  return String(value ?? "").trim();
}

function formDataToFields(formData: FormData) {
  const fields: Record<string, string | string[]> = {};

  for (const key of new Set(Array.from(formData.keys()))) {
    if (skippedEmailFields.has(key)) {
      continue;
    }

    const values = formData
      .getAll(key)
      .map((value) => normalizeText(value))
      .filter(Boolean);

    if (values.length === 1) {
      fields[key] = values[0];
    }

    if (values.length > 1) {
      fields[key] = values;
    }
  }

  return fields;
}

function fieldValue(fields: Record<string, string | string[]>, key: string) {
  const value = fields[key];

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  return normalizeText(value);
}

function formatDateForEmail(value: string) {
  const trimmedValue = value.trim();
  const match = trimmedValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return trimmedValue;
  }

  const [, year, month, day] = match;
  return `${month}/${day}/${year}`;
}

function requireFields(
  fields: Record<string, string | string[]>,
  requiredFields: string[],
) {
  const missing = requiredFields.filter((field) => !fieldValue(fields, field));

  if (missing.length) {
    return `Please complete: ${missing
      .map((field) => fieldLabels[field] || field)
      .join(", ")}.`;
  }

  return "";
}

function validatePayload(fields: Record<string, string | string[]>): {
  error?: string;
  payload?: ContactPayload;
} {
  const inquiryType = fieldValue(fields, "inquiryType") as InquiryType;

  if (!inquiryTypes.has(inquiryType)) {
    return { error: "Please choose a valid inquiry type." };
  }

  const baseError = requireFields(fields, ["name", "email"]);
  if (baseError) {
    return { error: baseError };
  }

  if (!fieldValue(fields, "email").includes("@")) {
    return { error: "Please enter a valid email address." };
  }

  if (inquiryType === "instrument-program") {
    const programInquiryType = fieldValue(fields, "programInquiryType");

    if (!programInquiryLabels[programInquiryType]) {
      return { error: "Please choose a program inquiry type." };
    }

    const sharedError = requireFields(fields, [
      "preferredContactMethod",
      "cityState",
    ]);

    if (sharedError) {
      return { error: sharedError };
    }

    if (programInquiryType === "loan") {
      const loanError = requireFields(fields, [
        "parentGuardianName",
        "studentName",
        "studentGrade",
        "studentAge",
        "instrumentNeeded",
        "playingLevel",
        "privateLessons",
        "timeline",
        "loanNeed",
      ]);

      if (loanError) {
        return { error: loanError };
      }
    }

    if (programInquiryType === "instrument-donation") {
      const donationError = requireFields(fields, [
        "donationItem",
        "instrumentCondition",
        "instrumentLocation",
      ]);

      if (donationError) {
        return { error: donationError };
      }
    }

    if (programInquiryType === "money") {
      const supportError = requireFields(fields, [
        "supportType",
        "contributionAcknowledgment",
      ]);

      if (supportError) {
        return { error: supportError };
      }
    }

    if (programInquiryType === "other") {
      const generalError = requireFields(fields, ["message"]);

      if (generalError) {
        return { error: generalError };
      }
    }
  }

  const name = fieldValue(fields, "name");
  const eventDate = formatDateForEmail(fieldValue(fields, "eventDate"));
  const subject = buildSubject(inquiryType, name, eventDate);

  return {
    payload: {
      inquiryType,
      programInquiryType: fieldValue(fields, "programInquiryType"),
      name,
      email: fieldValue(fields, "email"),
      phone: fieldValue(fields, "phone"),
      subject,
      fields,
    },
  };
}

function buildSubject(inquiryType: InquiryType, name: string, eventDate: string) {
  if (inquiryType === "performance") {
    return `[Wedding/Event Inquiry] ${name}${eventDate ? ` - ${eventDate}` : ""}`;
  }

  if (inquiryType === "teaching") {
    return `[Education Inquiry] ${name}`;
  }

  if (inquiryType === "instrument-program") {
    return `[Instrument Support] ${name}`;
  }

  return `[General Contact] ${name}`;
}

function buildEmailText(payload: ContactPayload) {
  const lines = [
    `${inquiryLabels[payload.inquiryType]}`,
    "",
    `Subject: ${payload.subject}`,
    "",
    "Submitted fields",
  ];

  for (const [key, value] of Object.entries(payload.fields)) {
    const label = fieldLabels[key] || key;
    const formattedValue =
      key === "eventDate"
        ? formatDateForEmail(Array.isArray(value) ? value.join(", ") : value)
        : Array.isArray(value)
          ? value.join(", ")
          : value;

    if (formattedValue) {
      lines.push(`${label}: ${formattedValue}`);
    }
  }

  return lines.join("\n");
}

function getSupabaseConfig() {
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!supabaseUrl) {
    throw new Error("Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL.");
  }

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY.");
  }

  return {
    supabaseUrl: supabaseUrl.replace(/\/+$/, ""),
    serviceRoleKey,
    schema: process.env.SUPABASE_SCHEMA || "public",
  };
}

async function saveSubmission(payload: ContactPayload, request: Request) {
  const { supabaseUrl, serviceRoleKey, schema } = getSupabaseConfig();
  const headers: Record<string, string> = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };

  if (schema !== "public") {
    headers["Content-Profile"] = schema;
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      inquiry_type: payload.inquiryType,
      program_inquiry_type: payload.programInquiryType || null,
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      subject: payload.subject,
      payload: payload.fields,
      source_path: request.headers.get("referer") || null,
      user_agent: request.headers.get("user-agent") || null,
    }),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `Supabase backup failed (${response.status} ${response.statusText}): ${
        responseText || "No response body."
      }`,
    );
  }
}

async function sendEmail(payload: ContactPayload) {
  const resendApiKey = process.env.RESEND_API_KEY || "";
  const toEmail = process.env.CONTACT_TO_EMAIL || "";
  const fromEmail = process.env.FORM_FROM_EMAIL || "";

  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY.");
  }

  if (!toEmail) {
    throw new Error("Missing CONTACT_TO_EMAIL.");
  }

  if (!fromEmail) {
    throw new Error("Missing FORM_FROM_EMAIL.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: payload.email ? [payload.email] : undefined,
      subject: payload.subject,
      text: buildEmailText(payload),
    }),
  });

  const responseText = await response.text();
  let responseBody: unknown = null;

  if (responseText.trim()) {
    try {
      responseBody = JSON.parse(responseText);
    } catch {
      responseBody = responseText;
    }
  }

  if (!response.ok) {
    throw new Error(
      `Resend email failed (${response.status} ${response.statusText}): ${
        typeof responseBody === "string"
          ? responseBody
          : JSON.stringify(responseBody)
      }`,
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    if (normalizeText(formData.get("website"))) {
      return NextResponse.json({ success: true });
    }

    const fields = formDataToFields(formData);
    const { error, payload } = validatePayload(fields);

    if (error || !payload) {
      return NextResponse.json(
        { success: false, error: error || "Invalid inquiry." },
        { status: 400 },
      );
    }

    await saveSubmission(payload, request);
    await sendEmail(payload);

    return NextResponse.json({
      success: true,
      message:
        payload.inquiryType === "instrument-program"
          ? "Thank you. Your instrument program inquiry has been sent. I'll review it and follow up directly."
          : "Thank you. Your inquiry has been sent. I'll review it and follow up directly.",
    });
  } catch (error) {
    console.error("Contact form submission failed:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to send this inquiry right now.",
      },
      { status: 500 },
    );
  }
}
