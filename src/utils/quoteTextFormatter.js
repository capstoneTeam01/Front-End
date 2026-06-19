import { buildPreferredScheduleText } from "./scheduleFormatter";

const clean = (value) => String(value || "").trim();
export const sentenceCase = (value, fallback = "Repair issue") => {
  const text = clean(value) || fallback;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const normalizeQuoteIssueTitle = (issue) => sentenceCase(issue, "Repair issue");

export const escapeHtml = (value) =>
  clean(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const buildFullServiceAddress = ({ address, unit, city }) => {
  const parts = [
    clean(address),
    clean(unit) ? `Unit: ${clean(unit)}` : "",
    clean(city) ? `City: ${clean(city)}` : "",
  ].filter(Boolean);

  return parts.length ? parts.join(", ") : "Not provided";
};

// Gmail deep links and Android mail intents usually open a plain-text compose screen.
// Keep this body as simple plain text so Gmail does not need HTML to preserve it.
export const buildPlainQuoteEmailBody = ({
  issueTitle,
  detectedObject,
  urgency,
  estimatedCostRange,
  estimatedRepairTime,
  fullAddress,
  date,
  time,
  notes,
  imageUrl,
  requesterName,
}) => {
  const schedule = buildPreferredScheduleText({ date, time });

  // Keep urgency/cost/time available for app screens, but do not include them in
  // provider emails. The email is meant to stay concise and request-focused.
  console.log("[FixBee][QuoteEmail] omitted internal estimate fields from email body", {
    hasUrgency: Boolean(clean(urgency)),
    hasEstimatedCostRange: Boolean(clean(estimatedCostRange)),
    hasEstimatedRepairTime: Boolean(clean(estimatedRepairTime)),
  });

  const issueLines = [
    `Issue: ${issueTitle}`,
    detectedObject ? `Detected object: ${sentenceCase(detectedObject, detectedObject)}` : "",
  ].filter(Boolean);

  const serviceRequestLines = [
    "Service request:",
    `Location: ${fullAddress}`,
    `Preferred date: ${schedule.preferredDate}`,
    `Preferred time: ${schedule.preferredTime}`,
  ];

  const issuePhotoLines = [
    "Issue photo:",
    imageUrl
      ? imageUrl
      : "Image link was not available. The user uploaded a photo during the app session.",
  ];

  return [
    "Hello Team,",
    "",
    "I am writing to request a service from you related to the following issue:",
    "",
    ...issueLines,
    "",
    ...serviceRequestLines,
    "",
    `Additional notes: ${clean(notes) || "None"}`,
    "",
    ...issuePhotoLines,
    "",
    "Could you please get in touch as soon as possible. Thank you.",
    "",
    "Warm Regards,",
    clean(requesterName) || "FixBee User",
  ].join("\n");
};

export const buildHtmlQuoteEmailBody = ({
  issueTitle,
  detectedObject,
  urgency,
  estimatedCostRange,
  estimatedRepairTime,
  fullAddress,
  date,
  time,
  notes,
  imageUrl,
  requesterName,
}) => {
  const schedule = buildPreferredScheduleText({ date, time });
  console.log("[FixBee][QuoteEmail] omitted internal estimate fields from html email body", {
    hasUrgency: Boolean(clean(urgency)),
    hasEstimatedCostRange: Boolean(clean(estimatedCostRange)),
    hasEstimatedRepairTime: Boolean(clean(estimatedRepairTime)),
  });

  return `
<p>Hello Team,</p>
<p>I am writing to request a service from you related to the following issue:</p>

<p><strong>Issue:</strong> ${escapeHtml(issueTitle)}<br/>
${detectedObject ? `<strong>Detected object:</strong> ${escapeHtml(sentenceCase(detectedObject, detectedObject))}` : ""}</p>

<p><strong>Service request:</strong><br/>
<strong>Location:</strong> ${escapeHtml(fullAddress)}<br/>
<strong>Preferred date:</strong> ${escapeHtml(schedule.preferredDate)}<br/>
<strong>Preferred time:</strong> ${escapeHtml(schedule.preferredTime)}</p>

${notes ? `<p><strong>Additional notes:</strong> ${escapeHtml(notes)}</p>` : ""}

<p><strong>Issue photo:</strong><br/>${imageUrl ? `<a href="${escapeHtml(imageUrl)}">${escapeHtml(imageUrl)}</a>` : "Image link was not available. The user uploaded a photo during the app session."}</p>

<br/>
<p>Could you please get in touch as soon as possible. Thank you.</p>

<p>Warm Regards,<br/>${escapeHtml(clean(requesterName) || "FixBee User")}</p>
  `.trim();
};
