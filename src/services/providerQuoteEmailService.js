import { Alert, Linking, Platform } from "react-native";

import {
  FIXBEE_QUOTE_CC_EMAIL,
  FIXBEE_REQUESTER_NAME,
  PREFERRED_QUOTE_MAIL_CLIENT,
} from "../constants/config";
import {
  buildFullServiceAddress,
  buildHtmlQuoteEmailBody,
  buildPlainQuoteEmailBody,
  normalizeQuoteIssueTitle,
} from "../utils/quoteTextFormatter";

const clean = (value) => String(value || "").trim();
const encode = (value) => encodeURIComponent(clean(value));

const uniqueEmails = (providers = []) => {
  const seen = new Set();

  return providers
    .map((provider) => clean(provider.email).toLowerCase())
    .filter((email) => {
      if (!email || !email.includes("@") || seen.has(email)) return false;
      seen.add(email);
      return true;
    });
};

const getPublicImageUrl = ({ uploadedImageUrl, imageUri }) => {
  const publicUrl = clean(uploadedImageUrl);
  if (publicUrl.startsWith("http://") || publicUrl.startsWith("https://")) return publicUrl;

  const uri = clean(imageUri);
  if (uri.startsWith("http://") || uri.startsWith("https://")) return uri;

  return "";
};

export const buildProviderQuoteEmailDraft = ({
  providers = [],
  issue = "Repair issue",
  detectedObject,
  urgency,
  estimatedCostRange,
  estimatedRepairTime,
  address,
  unit,
  city,
  date,
  time,
  notes,
  imageUri,
  uploadedImageUrl,
  requesterName = FIXBEE_REQUESTER_NAME,
}) => {
  const providerEmails = uniqueEmails(providers);
  console.log("[FixBee][QuoteEmail] building provider quote email", {
    providerCount: providers.length,
    providerEmailCount: providerEmails.length,
    hasUploadedImageUrl: Boolean(clean(uploadedImageUrl)),
  });
  const [to = "", ...bccList] = providerEmails;
  const issueTitle = normalizeQuoteIssueTitle(issue);
  const fullAddress = buildFullServiceAddress({ address, unit, city });
  const imageUrl = getPublicImageUrl({ uploadedImageUrl, imageUri });

  const plainBody = buildPlainQuoteEmailBody({
    issueTitle,
    detectedObject: clean(detectedObject),
    urgency: clean(urgency),
    estimatedCostRange: clean(estimatedCostRange),
    estimatedRepairTime: clean(estimatedRepairTime),
    fullAddress,
    date,
    time,
    notes: clean(notes),
    imageUrl,
    requesterName,
  });

  const htmlBody = buildHtmlQuoteEmailBody({
    issueTitle,
    detectedObject: clean(detectedObject),
    urgency: clean(urgency),
    estimatedCostRange: clean(estimatedCostRange),
    estimatedRepairTime: clean(estimatedRepairTime),
    fullAddress,
    date,
    time,
    notes: clean(notes),
    imageUrl,
    requesterName,
  });

  return {
    to,
    cc: FIXBEE_QUOTE_CC_EMAIL,
    bcc: bccList.join(","),
    bccList,
    subject: issueTitle.slice(0, 78),
    body: plainBody,
    htmlBody,
    imageUrl,
    requesterName,
    providerEmails,
    providersMissingEmail: providers
      .filter((provider) => !clean(provider.email))
      .map((provider) => provider.businessName),
    attachmentLabel: imageUrl
      ? "Vercel Blob image link will be included in the email body."
      : "No public image link was available for this draft.",
  };
};

const buildMailtoUrl = (draft) => {
  const query = [
    draft.cc ? `cc=${encode(draft.cc)}` : "",
    draft.bcc ? `bcc=${encode(draft.bcc)}` : "",
    `subject=${encode(draft.subject)}`,
    `body=${encode(draft.body)}`,
  ].filter(Boolean).join("&");

  return `mailto:${encode(draft.to)}?${query}`;
};

const buildGmailUrl = (draft) => {
  const query = [
    `to=${encode(draft.to)}`,
    draft.cc ? `cc=${encode(draft.cc)}` : "",
    draft.bcc ? `bcc=${encode(draft.bcc)}` : "",
    `subject=${encode(draft.subject)}`,
    `body=${encode(draft.body)}`,
  ].filter(Boolean).join("&");

  return `googlegmail://co?${query}`;
};

const buildOutlookUrl = (draft) => {
  const query = [
    `to=${encode(draft.to)}`,
    draft.cc ? `cc=${encode(draft.cc)}` : "",
    draft.bcc ? `bcc=${encode(draft.bcc)}` : "",
    `subject=${encode(draft.subject)}`,
    `body=${encode(draft.body)}`,
  ].filter(Boolean).join("&");

  return `ms-outlook://compose?${query}`;
};

const getPreferredUrl = (draft, preferredClient) => {
  if (preferredClient === "outlook") return buildOutlookUrl(draft);
  if (preferredClient === "mailto") return buildMailtoUrl(draft);
  return buildGmailUrl(draft);
};

const openWithDeepLink = async (draft, preferredClient) => {
  const preferredUrl = getPreferredUrl(draft, preferredClient);
  const mailtoUrl = buildMailtoUrl(draft);

  const canOpenPreferred = await Linking.canOpenURL(preferredUrl);
  if (canOpenPreferred) {
    await Linking.openURL(preferredUrl);
    return true;
  }

  const canOpenMailto = await Linking.canOpenURL(mailtoUrl);
  if (canOpenMailto || Platform.OS === "android") {
    await Linking.openURL(mailtoUrl);
    return true;
  }

  return false;
};

export const openProviderQuoteEmailDraft = async (
  draft,
  preferredClient = PREFERRED_QUOTE_MAIL_CLIENT
) => {
  if (!draft?.to) {
    Alert.alert(
      "Provider email missing",
      "None of the selected providers has an email address in the local provider cache. Try selecting a provider that has an email address in the directory."
    );
    return false;
  }

  try {
    console.log("[FixBee][QuoteEmail] preferred mail client", { preferredClient });
    const opened = await openWithDeepLink(draft, preferredClient);
    if (opened) return true;

    Alert.alert("Email app not available", "No supported email app was found on this device.");
    return false;
  } catch (error) {
    Alert.alert("Could not open email", error.message || "The email draft could not be opened.");
    return false;
  }
};
