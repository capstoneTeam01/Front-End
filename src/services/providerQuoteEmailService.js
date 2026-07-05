import { sendProviderQuoteRequest } from "../api/providerQuoteRequestApi";
import { FIXBEE_REQUESTER_NAME } from "../constants/config";
import {
  buildFullServiceAddress,
  buildHtmlQuoteEmailBody,
  buildPlainQuoteEmailBody,
  normalizeQuoteIssueTitle,
} from "../utils/quoteTextFormatter";

const clean = (value) => String(value || "").trim();

const buildQuoteRequestReference = () => {
  const date = new Date();
  const timestamp = date
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 12);
  return `FB-${timestamp}`;
};

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
  if (publicUrl.startsWith("http://") || publicUrl.startsWith("https://"))
    return publicUrl;

  const uri = clean(imageUri);
  if (uri.startsWith("http://") || uri.startsWith("https://")) return uri;

  return "";
};

const normalizeQuoteImage = (image = {}, index = 0) => {
  const url = clean(image.url || image.uploadedImageUrl);
  const thumbnailUri = clean(
    image.thumbnailUri || image.uri || image.localUri || url,
  );

  return {
    url,
    thumbnailUri,
    label: clean(image.label) || `Issue Photo ${index + 1}`,
  };
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
  requesterEmail,
  images = [],
  preferImages = false,
}) => {
  const providerEmails = uniqueEmails(providers);
  console.log("[FixBee][QuoteEmail] building provider quote preview", {
    providerCount: providers.length,
    providerEmailCount: providerEmails.length,
    hasUploadedImageUrl: Boolean(clean(uploadedImageUrl)),
    imageCount: images.length || (uploadedImageUrl || imageUri ? 1 : 0),
  });

  const [to = "", ...bccList] = providerEmails;
  const issueTitle = normalizeQuoteIssueTitle(issue);
  const requestReference = buildQuoteRequestReference();
  const fullAddress = buildFullServiceAddress({ address, unit, city });
  const originalImageUrl = getPublicImageUrl({ uploadedImageUrl, imageUri });
  const suppliedImages = Array.isArray(images)
    ? images.map(normalizeQuoteImage).filter(Boolean)
    : [];
  const shouldUseSuppliedImages = preferImages || suppliedImages.length > 0;
  const fallbackImages = [
    originalImageUrl || imageUri
      ? normalizeQuoteImage(
          {
            url: originalImageUrl,
            thumbnailUri: imageUri || originalImageUrl,
            label: "Issue Photo",
          },
          0,
        )
      : null,
  ].filter(Boolean);
  const normalizedImages = (
    shouldUseSuppliedImages ? suppliedImages : fallbackImages
  ).filter((image) => image && (image.url || image.thumbnailUri));
  const imageUrl = shouldUseSuppliedImages
    ? clean(normalizedImages.find((image) => image.url)?.url)
    : originalImageUrl;

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
    requesterEmail,
    requestReference,
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
    images: normalizedImages,
    requesterName,
    requesterEmail,
    requestReference,
  });

  return {
    to,
    cc: clean(requesterEmail) || "Logged-in user email will be added by backend",
    requesterEmail: clean(requesterEmail),
    bcc: bccList.join(","),
    bccList,
    subject: `Service Request: ${issueTitle} (${requestReference})`.slice(0, 110),
    body: plainBody,
    htmlBody,
    imageUrl,
    images: normalizedImages,
    requesterName,
    requestReference,
    providerEmails,
    providersMissingEmail: providers
      .filter((provider) => !clean(provider.email))
      .map((provider) => provider.businessName),
  };
};

const mapProviderForRequest = (provider = {}) => ({
  id: clean(provider.id),
  mongoId: clean(provider.mongoId),
  businessName: clean(provider.businessName) || "Service Provider",
  email: clean(provider.email).toLowerCase(),
  phoneDisplay: clean(provider.phoneDisplay),
  city: clean(provider.city),
  address: clean(provider.address),
});

export const buildProviderQuoteRequestPayload = ({
  draft,
  providers = [],
  issue,
  detectedObject,
  category,
  address,
  unit,
  city,
  date,
  time,
  notes,
  editedBody,
}) => {
  const body = clean(editedBody) || draft?.body;
  const images = Array.isArray(draft?.images) ? draft.images : [];
  const htmlBody = buildHtmlQuoteEmailBody({
    issueTitle: normalizeQuoteIssueTitle(issue),
    detectedObject: clean(detectedObject),
    fullAddress: buildFullServiceAddress({ address, unit, city }),
    date,
    time,
    notes: clean(notes),
    imageUrl: draft?.imageUrl,
    images,
    requesterName: draft?.requesterName,
    requesterEmail: draft?.requesterEmail,
    requestReference: draft?.requestReference,
    editedBody: body,
  });

  return {
    scanType: "service-provider-quote-request",
    status: "ready-to-send",
    issue: {
      title: normalizeQuoteIssueTitle(issue),
      detectedObject: clean(detectedObject),
      category: clean(category),
    },
    serviceRequest: {
      address: clean(address),
      unit: clean(unit),
      city: clean(city),
      preferredDate: clean(date),
      preferredTime: clean(time),
      notes: clean(notes),
    },
    providers: providers.map(mapProviderForRequest),
    images,
    requester: {
      email: clean(draft?.requesterEmail),
      name: clean(draft?.requesterName),
    },
    email: {
      to: draft?.to,
      cc: draft?.cc,
      bcc: draft?.bcc,
      subject: draft?.subject,
      body,
      htmlBody,
      imageUrl: draft?.imageUrl,
      providerEmails: draft?.providerEmails || [],
      requestReference: draft?.requestReference,
    },
    preview: {
      subject: draft?.subject,
      body,
      to: draft?.to,
      cc: draft?.cc,
      bcc: draft?.bcc,
    },
  };
};

export const sendProviderQuoteRequestFromPreview = async (payload) => {
  console.log("[FixBee][QuoteRequest] sending official backend quote request", {
    providerCount: payload?.providers?.length || 0,
    imageCount: payload?.images?.length || 0,
    hasAddress: Boolean(payload?.serviceRequest?.address),
  });

  const result = await sendProviderQuoteRequest(payload);

  console.log("[FixBee][QuoteEmail] official backend quote request sent", {
    quoteRequestId: result?.quoteRequestId || result?.recentScanId,
    to: result?.email?.to || result?.to,
    cc: result?.email?.cc || result?.cc,
    bccCount: result?.email?.bccCount ?? result?.bccCount,
  });

  return result;
};
