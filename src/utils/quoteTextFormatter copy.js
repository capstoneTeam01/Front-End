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
  requesterEmail,
}) => {
  const schedule = buildPreferredScheduleText({ date, time });

  // Keep urgency/cost/time available for app screens, but do not include them in
  // provider emails. The email is meant to stay concise and request-focused.
  console.log("[FixBee][QuoteEmail] omitted internal estimate fields from email body", {
    hasUrgency: Boolean(clean(urgency)),
    hasEstimatedCostRange: Boolean(clean(estimatedCostRange)),
    hasEstimatedRepairTime: Boolean(clean(estimatedRepairTime)),
  });

  return [
    "Hello Team,",
    "",
    "FixBee is sending this service request on behalf of one of our users.",
    "",
    "The user is requesting help with the following home repair issue:",
    "",
    `Issue: ${issueTitle}`,
    detectedObject ? `Detected object: ${sentenceCase(detectedObject, detectedObject)}` : "",
    "",
    "Service request:",
    `Location: ${fullAddress}`,
    `Preferred date: ${schedule.preferredDate}`,
    `Preferred time: ${schedule.preferredTime}`,
    "",
    `Additional notes: ${clean(notes) || "None"}`,
    "",
    imageUrl
      ? "Issue photo: Image thumbnail will be included in the email."
      : "Issue photo: Image thumbnail was not available for this preview.",
    "",
    "Could you please reply to the user as soon as possible with your availability or next steps?",
    "",
    `User email: ${clean(requesterEmail) || "Included in CC by FixBee"}`,
    "",
    "Warm Regards,",
    "FixBee Team",
    "",
    `Request submitted by: ${clean(requesterName) || "FixBee User"}`,
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
  images = [],
  requesterName,
  requesterEmail,
}) => {
  const schedule = buildPreferredScheduleText({ date, time });
  console.log("[FixBee][QuoteEmail] omitted internal estimate fields from html email body", {
    hasUrgency: Boolean(clean(urgency)),
    hasEstimatedCostRange: Boolean(clean(estimatedCostRange)),
    hasEstimatedRepairTime: Boolean(clean(estimatedRepairTime)),
  });

  const photoItems = (Array.isArray(images) ? images : [])
    .map((image) => ({
      url: clean(image.url || image.uploadedImageUrl || image.thumbnailUri || image.uri),
      label: clean(image.label) || "Issue Photo",
    }))
    .filter((image) => image.url.startsWith("http://") || image.url.startsWith("https://"));

  if (!photoItems.length && clean(imageUrl)) {
    photoItems.push({ url: clean(imageUrl), label: "Issue Photo" });
  }

  const photoHtml = photoItems.length
    ? photoItems
        .map(
          (image) => `
            <td style="padding-right:12px;padding-bottom:8px;text-align:center;vertical-align:top;">
              <img src="${escapeHtml(image.url)}" alt="${escapeHtml(image.label)}" style="width:96px;height:96px;object-fit:cover;border-radius:12px;border:1px solid #303030;display:block;" />
              <div style="font-size:12px;color:#aaa;margin-top:8px;">${escapeHtml(image.label)}</div>
            </td>
          `,
        )
        .join("")
    : `<td style="font-size:14px;color:#fff;">Image thumbnail will be included in the email.</td>`;

  return `
  <div style="margin:0;padding:22px;background:#202010;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
    <div style="max-width:620px;margin:0 auto;background:#25230f;border:1px solid #4d4516;border-radius:18px;padding:26px;">
      <div style="font-size:15px;font-weight:700;color:#f2d8bf;margin-bottom:12px;">FixBee Service Request</div>
      <h1 style="font-size:28px;line-height:1.2;margin:0 0 24px 0;color:#ffffff;">${escapeHtml(issueTitle)}</h1>

      <p style="font-size:17px;line-height:1.55;margin:0 0 24px 0;color:#ffffff;">Hello Team,</p>
      <p style="font-size:17px;line-height:1.55;margin:0 0 24px 0;color:#ffffff;">
        FixBee is sending this service request on behalf of a user who needs help with a home repair issue.
        Please review the details below and reply to the user with your availability or next steps.
      </p>

      <div style="background:#121212;border:1px solid #3a3a3a;border-radius:16px;padding:18px;margin-bottom:18px;">
        <div style="font-size:18px;font-weight:800;color:#f2d8bf;margin-bottom:12px;">Issue Summary</div>
        <div style="font-size:16px;line-height:1.55;color:#ffffff;"><strong>Issue:</strong> ${escapeHtml(issueTitle)}</div>
        ${
          detectedObject
            ? `<div style="font-size:16px;line-height:1.55;color:#ffffff;"><strong>Detected object:</strong> ${escapeHtml(sentenceCase(detectedObject, detectedObject))}</div>`
            : ""
        }
      </div>

      <div style="background:#121212;border:1px solid #3a3a3a;border-radius:16px;padding:18px;margin-bottom:18px;">
        <div style="font-size:18px;font-weight:800;color:#f2d8bf;margin-bottom:12px;">Service Request</div>
        <div style="font-size:16px;line-height:1.55;color:#ffffff;"><strong>Location:</strong> ${escapeHtml(fullAddress)}</div>
        <div style="font-size:16px;line-height:1.55;color:#ffffff;"><strong>Preferred date:</strong> ${escapeHtml(schedule.preferredDate)}</div>
        <div style="font-size:16px;line-height:1.55;color:#ffffff;"><strong>Preferred time:</strong> ${escapeHtml(schedule.preferredTime)}</div>
      </div>

      <div style="background:#121212;border:1px solid #3a3a3a;border-radius:16px;padding:18px;margin-bottom:18px;">
        <div style="font-size:18px;font-weight:800;color:#f2d8bf;margin-bottom:12px;">Additional Notes</div>
        <div style="font-size:16px;line-height:1.55;color:#ffffff;">${escapeHtml(clean(notes) || "None")}</div>
      </div>

      <div style="background:#121212;border:1px solid #3a3a3a;border-radius:16px;padding:18px;margin-bottom:24px;">
        <div style="font-size:18px;font-weight:800;color:#f2d8bf;margin-bottom:14px;">Issue Photo</div>
        <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
          <tr>${photoHtml}</tr>
        </table>
      </div>

      <p style="font-size:17px;line-height:1.55;margin:0 0 24px 0;color:#ffffff;">
        Could you please get in touch as soon as possible? Thank you.
      </p>

      <p style="font-size:16px;line-height:1.55;margin:0 0 24px 0;color:#ffffff;">
        <strong>User email:</strong> ${escapeHtml(clean(requesterEmail) || "Included in CC by FixBee")}
      </p>

      <p style="font-size:17px;line-height:1.55;margin:0;color:#ffffff;">
        Warm Regards,<br/>
        FixBee Team
      </p>

      <p style="font-size:15px;line-height:1.55;margin:28px 0 0 0;color:#ffffff;">
        Request submitted by: ${escapeHtml(clean(requesterName) || "FixBee User")}
      </p>
    </div>
  </div>
  `.trim();
};
