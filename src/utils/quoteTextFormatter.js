import { buildPreferredScheduleText } from "./scheduleFormatter";

const clean = (value) => String(value || "").trim();
const capitalizeFirstLetter = (value) => {
  const text = clean(value);
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
};

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

const splitServiceAddress = (fullAddress) => {
  const text = clean(fullAddress);
  if (!text || text === "Not provided") {
    return {
      location: "Not provided",
      city: "",
    };
  }

  const cityMatch = text.match(/(?:^|,\s*)City:\s*([^,]+)/i);
  const city = cityMatch ? clean(cityMatch[1]) : "";
  const location = clean(text.replace(/,\s*City:\s*[^,]+/i, ""));

  return {
    location: location || text,
    city,
  };
};

const getValueAfterLabel = (line, label) => {
  const pattern = new RegExp(`^${label}\\s*:\\s*`, "i");
  return clean(line).replace(pattern, "").trim();
};

const isDefaultBodyLine = (line) => {
  const text = clean(line).toLowerCase();
  return (
    !text ||
    text === "hello team," ||
    text === "fixbee is sending this service request on behalf of one of our users." ||
    text === "the user is requesting help with the following home repair issue:" ||
    text === "service request:" ||
    text === "warm regards," ||
    text === "fixbee team"
  );
};

const parseEditedQuoteBody = (editedBody = "") => {
  const parsed = {
    introLines: [],
    issueTitle: "",
    detectedObject: "",
    issueLines: [],
    location: "",
    preferredDate: "",
    preferredTime: "",
    serviceLines: [],
    city: "",
    additionalNotes: [],
    photoLines: [],
    closingLines: [],
    requesterEmail: "",
    requesterName: "",
  };
  let section = "intro";

  String(editedBody || "")
    .split(/\r?\n/)
    .forEach((rawLine) => {
      const line = clean(rawLine);
      if (!line) return;

      if (/^issue\s*:/i.test(line)) {
        parsed.issueTitle = getValueAfterLabel(line, "Issue");
        section = "issue";
        return;
      }

      if (/^detected object\s*:/i.test(line)) {
        parsed.detectedObject = getValueAfterLabel(line, "Detected object");
        section = "issue";
        return;
      }

      if (/^service request\s*:?\s*$/i.test(line)) {
        section = "service";
        return;
      }

      if (/^location\s*:/i.test(line)) {
        const value = getValueAfterLabel(line, "Location");
        const split = splitServiceAddress(value);
        parsed.location = split.location;
        parsed.city = parsed.city || split.city;
        section = "service";
        return;
      }

      if (/^city\s*:/i.test(line)) {
        parsed.city = getValueAfterLabel(line, "City");
        section = "service";
        return;
      }

      if (/^preferred date\s*:/i.test(line)) {
        parsed.preferredDate = getValueAfterLabel(line, "Preferred date");
        section = "service";
        return;
      }

      if (/^preferred time\s*:/i.test(line)) {
        parsed.preferredTime = getValueAfterLabel(line, "Preferred time");
        section = "service";
        return;
      }

      if (/^additional notes\s*:/i.test(line)) {
        const value = getValueAfterLabel(line, "Additional notes");
        if (value) parsed.additionalNotes.push(value);
        section = "additionalNotes";
        return;
      }

      if (/^issue photo\s*:/i.test(line)) {
        const value = getValueAfterLabel(line, "Issue photo");
        if (value) parsed.photoLines.push(value);
        section = "photo";
        return;
      }

      if (/^could you please/i.test(line)) {
        parsed.closingLines.push(line);
        section = "closing";
        return;
      }

      if (/^user email\s*:/i.test(line)) {
        parsed.requesterEmail = getValueAfterLabel(line, "User email");
        section = "footer";
        return;
      }

      if (/^request submitted by\s*:/i.test(line)) {
        parsed.requesterName = getValueAfterLabel(line, "Request submitted by");
        section = "footer";
        return;
      }

      if (isDefaultBodyLine(line)) return;

      if (section === "issue") parsed.issueLines.push(line);
      else if (section === "service") parsed.serviceLines.push(line);
      else if (section === "additionalNotes") parsed.additionalNotes.push(line);
      else if (section === "photo") parsed.photoLines.push(line);
      else if (section === "closing") parsed.closingLines.push(line);
      else if (section === "intro") parsed.introLines.push(line);
    });

  return parsed;
};

const renderPlainLines = (lines = []) =>
  lines
    .map((line) => clean(line))
    .filter(Boolean)
    .map(
      (line) =>
        `<div style="font-size:16px;line-height:1.5;color:#0A0A0A;margin-top:8px;">${escapeHtml(capitalizeFirstLetter(line))}</div>`,
    )
    .join("");

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
  requestReference,
}) => {
  const schedule = buildPreferredScheduleText({ date, time });
  const serviceAddress = splitServiceAddress(fullAddress);

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
    detectedObject ? `Detected Object: ${sentenceCase(detectedObject, detectedObject)}` : "",
    "",
    "Service Request:",
    `Location: ${serviceAddress.location}`,
    serviceAddress.city ? `City: ${serviceAddress.city}` : "",
    `Preferred Date: ${schedule.preferredDate}`,
    `Preferred Time: ${schedule.preferredTime}`,
    "",
    `Additional Notes: ${clean(notes) || "None"}`,
    "",
    imageUrl
      ? "Issue Photo: Image thumbnail will be included in the email."
      : "Issue Photo: Image thumbnail was not available for this preview.",
    "",
    "Could you please reply to the user as soon as possible with your availability or next steps?",
    "",
    `User Email: ${clean(requesterEmail) || "Included in CC by FixBee"}`,
    "",
    "Warm Regards,",
    "FixBee Team",
    "",
    `Request Submitted By: ${clean(requesterName) || "FixBee User"}`,
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
  editedBody,
}) => {
  const schedule = buildPreferredScheduleText({ date, time });
  const edited = clean(editedBody) ? parseEditedQuoteBody(editedBody) : null;
  const serviceAddress = splitServiceAddress(fullAddress);
  const finalIssueTitle = edited?.issueTitle || issueTitle;
  const finalDetectedObject = edited?.detectedObject || detectedObject;
  const finalAddress = edited?.location || serviceAddress.location;
  const finalCity = edited?.city || serviceAddress.city;
  const finalPreferredDate = edited?.preferredDate || schedule.preferredDate;
  const finalPreferredTime = edited?.preferredTime || schedule.preferredTime;
  const finalNotesLines = edited
    ? edited.additionalNotes.length
      ? edited.additionalNotes
      : [clean(notes) || "None"]
    : [clean(notes) || "None"];
  const finalClosingLines =
    edited?.closingLines?.length
      ? edited.closingLines
      : ["Could you please get in touch as soon as possible? Thank you."];
  const finalRequesterEmail = edited?.requesterEmail || requesterEmail;
  const finalRequesterName = edited?.requesterName || requesterName;

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
            <td style="padding-right:16px;padding-bottom:8px;text-align:center;vertical-align:top;">
              <a href="${escapeHtml(image.url)}" target="_blank" style="text-decoration:none;">
                <img src="${escapeHtml(image.url)}" alt="${escapeHtml(image.label)}" style="width:128px;height:128px;object-fit:cover;border-radius:12px;border:1px solid #E9E7E7;display:block;" />
              </a>
              <div style="font-size:12px;line-height:16px;font-weight:500;color:#6B7280;margin-top:8px;">${escapeHtml(capitalizeFirstLetter(image.label))}</div>
            </td>
          `,
        )
        .join("")
    : `<td style="font-size:14px;line-height:20px;color:#6B7280;">Image thumbnail will be included in the email.</td>`;

  return `
  <div style="margin:0;padding:24px;background:#F3F4F6;font-family:Rubik,Arial,Helvetica,sans-serif;color:#0A0A0A;">
    <div style="max-width:620px;margin:0 auto;background:#FDFDFD;border:1px solid #E9E7E7;border-radius:20px;padding:24px;">
      <div style="font-size:12px;line-height:16px;font-weight:500;color:#8A5611;margin-bottom:8px;">FixBee Service Request</div>
      <h1 style="font-size:28px;line-height:34px;font-weight:600;margin:0 0 24px 0;color:#0A0A0A;">${escapeHtml(finalIssueTitle)}</h1>

      <p style="font-size:16px;line-height:24px;margin:0 0 16px 0;color:#0A0A0A;">Hello Team,</p>
      <p style="font-size:16px;line-height:24px;margin:0 0 24px 0;color:#0A0A0A;">
        FixBee is sending this service request on behalf of a user who needs help with a home repair issue.
        Please review the details below and reply to the user with your availability or next steps.
      </p>
      ${edited?.introLines?.length ? renderPlainLines(edited.introLines) : ""}

      <div style="background:#FFF9E6;border:1px solid #FDE68A;border-radius:16px;padding:16px;margin-bottom:16px;">
        <div style="font-size:18px;line-height:24px;font-weight:500;color:#0A0A0A;margin-bottom:12px;">Issue Summary</div>
        <div style="font-size:16px;line-height:24px;color:#0A0A0A;"><strong>Issue:</strong> ${escapeHtml(finalIssueTitle)}</div>
        ${
          finalDetectedObject
            ? `<div style="font-size:16px;line-height:24px;color:#0A0A0A;"><strong>Detected Object:</strong> ${escapeHtml(sentenceCase(finalDetectedObject, finalDetectedObject))}</div>`
            : ""
        }
        ${edited?.issueLines?.length ? renderPlainLines(edited.issueLines) : ""}
      </div>

      <div style="background:#FDFDFD;border:1px solid #E9E7E7;border-radius:16px;padding:16px;margin-bottom:16px;">
        <div style="font-size:18px;line-height:24px;font-weight:500;color:#0A0A0A;margin-bottom:12px;">Service Request</div>
        <div style="font-size:16px;line-height:24px;color:#0A0A0A;"><strong>Location:</strong> ${escapeHtml(finalAddress)}</div>
        ${finalCity ? `<div style="font-size:16px;line-height:24px;color:#0A0A0A;"><strong>City:</strong> ${escapeHtml(finalCity)}</div>` : ""}
        <div style="font-size:16px;line-height:24px;color:#0A0A0A;"><strong>Preferred Date:</strong> ${escapeHtml(finalPreferredDate)}</div>
        <div style="font-size:16px;line-height:24px;color:#0A0A0A;"><strong>Preferred Time:</strong> ${escapeHtml(finalPreferredTime)}</div>
        ${edited?.serviceLines?.length ? renderPlainLines(edited.serviceLines) : ""}
      </div>

      <div style="background:#FDFDFD;border:1px solid #E9E7E7;border-radius:16px;padding:16px;margin-bottom:16px;">
        <div style="font-size:18px;line-height:24px;font-weight:500;color:#0A0A0A;margin-bottom:12px;">Additional Notes</div>
        ${renderPlainLines(finalNotesLines)}
      </div>

      <div style="background:#FDFDFD;border:1px solid #E9E7E7;border-radius:16px;padding:16px;margin-bottom:24px;">
        <div style="font-size:18px;line-height:24px;font-weight:500;color:#0A0A0A;margin-bottom:16px;">Issue Photo</div>
        <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
          <tr>${photoHtml}</tr>
        </table>
        ${edited?.photoLines?.length ? renderPlainLines(edited.photoLines) : ""}
      </div>

      ${renderPlainLines(finalClosingLines)}

      <p style="font-size:16px;line-height:24px;margin:0 0 24px 0;color:#0A0A0A;">
        <strong>User Email:</strong> ${escapeHtml(clean(finalRequesterEmail) || "Included in CC by FixBee")}
      </p>

      <p style="font-size:16px;line-height:24px;margin:0;color:#0A0A0A;">
        Warm Regards,<br/>
        FixBee Team
      </p>

      <p style="font-size:14px;line-height:20px;margin:24px 0 0 0;color:#6B7280;">
        Request Submitted By: ${escapeHtml(clean(finalRequesterName) || "FixBee User")}
      </p>
    </div>
  </div>
  `.trim();
};
