import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import AppHeader from "../components/AppHeader/AppHeader";
import AuthFooterTray from "../components/AuthFooterTray/AuthFooterTray";
import ProviderPlainButton from "../components/ProviderPlainButton";
import { uploadPhoto } from "../api/uploadPhoto";
import { loadProvidersByIds } from "../localDb/businessDirectoryProviderLocalDb";
import {
  buildProviderQuoteEmailDraft,
  buildProviderQuoteRequestPayload,
  sendProviderQuoteRequestFromPreview,
} from "../services/providerQuoteEmailService";
import COLORS from "../constants/colors";
import { RADIUS, SIDE_PADDING, SPACING, TYPE } from "../constants/layout";

const clean = (value) => String(value || "").trim();
const isPublicImageUrl = (value) => /^https?:\/\//i.test(clean(value));

const getIssueTitle = (routeParams = {}) =>
  clean(routeParams.fromIssue) ||
  clean(routeParams.issueTitle) ||
  "Repair issue";

const normalizePreviewImage = (image = {}, index = 0) => {
  const url = clean(image.url || image.uploadedImageUrl);
  const thumbnailUri = clean(
    image.thumbnailUri || image.uri || image.localUri || image.imageUri || url,
  );

  if (!url && !thumbnailUri) return null;

  return {
    url,
    thumbnailUri,
    label: clean(image.label) || `Issue Photo ${index + 1}`,
  };
};

const getInitialQuoteImages = (routeParams = {}) => {
  const draftImages = Array.isArray(routeParams?.quotePreviewDraft?.images)
    ? routeParams.quotePreviewDraft.images
    : [];

  const fromDraft = draftImages.map(normalizePreviewImage).filter(Boolean);
  if (fromDraft.length) return fromDraft;

  const firstImage = normalizePreviewImage(
    {
      url: routeParams?.uploadedImageUrl,
      thumbnailUri: routeParams?.uploadedImageUri || routeParams?.imageUri,
      label: "Issue Photo 1",
    },
    0,
  );

  return firstImage ? [firstImage] : [];
};

const ProviderQuoteRequestScreen = ({ navigation, route }) => {
  const [sending, setSending] = useState(false);
  const [addingImage, setAddingImage] = useState(false);
  const [providers, setProviders] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  const [messageEdited, setMessageEdited] = useState(false);
  const [quoteImages, setQuoteImages] = useState(() =>
    getInitialQuoteImages(route?.params),
  );

  const selectedProviderIds = useMemo(
    () =>
      Array.isArray(route?.params?.selectedProviderIds)
        ? route.params.selectedProviderIds
        : [],
    [route?.params?.selectedProviderIds],
  );

  useEffect(() => {
    let active = true;

    (async () => {
      const rows = await loadProvidersByIds(selectedProviderIds);
      if (active) {
        setProviders(rows);
      }
      console.log("[FixBee][QuoteRequest] preview providers loaded", {
        selectedCount: selectedProviderIds.length,
        loadedCount: rows.length,
      });
    })();

    return () => {
      active = false;
    };
  }, [selectedProviderIds.join(",")]);

  useEffect(() => {
    setQuoteImages((current) => {
      if (current.length) return current;
      return getInitialQuoteImages(route?.params);
    });
  }, [
    route?.params?.uploadedImageUri,
    route?.params?.uploadedImageUrl,
    route?.params?.quotePreviewDraft,
  ]);

  const draft = useMemo(
    () =>
      buildProviderQuoteEmailDraft({
        providers,
        issue: getIssueTitle(route?.params),
        detectedObject: route?.params?.detectedObject,
        urgency: route?.params?.urgency,
        estimatedCostRange: route?.params?.estimatedCostRange,
        estimatedRepairTime: route?.params?.estimatedRepairTime,
        address: route?.params?.address,
        unit: route?.params?.unit,
        city: route?.params?.city,
        date: route?.params?.date,
        time: route?.params?.time,
        notes: route?.params?.notes,
        imageUri: route?.params?.uploadedImageUri,
        uploadedImageUrl: route?.params?.uploadedImageUrl,
        photoId:
          route?.params?.photoId ||
          route?.params?.quotePreviewDraft?.photoId,
        requesterName: route?.params?.quotePreviewDraft?.requesterName,
        requesterEmail:
          route?.params?.quotePreviewDraft?.requesterEmail || route?.params?.requesterEmail,
        images: quoteImages,
        preferImages: true,
      }),
    [route?.params, providers, quoteImages],
  );

  const imagePreviewItems = Array.isArray(draft?.images) ? draft.images : [];

  useEffect(() => {
    if (messageEdited) return;
    setMessageBody(draft?.body || "");
  }, [draft?.body, messageEdited]);

  const handleAddImage = async () => {
    try {
      setAddingImage(true);
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert(
          "Gallery permission needed",
          "Please allow photo library access to add another issue image.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.85,
        allowsEditing: false,
      });

      if (result.canceled || !result.assets?.[0]) return;

      const asset = result.assets[0];
      console.log("[FixBee][QuoteRequest] uploading extra preview image", {
        hasUri: Boolean(asset.uri),
      });
      const uploaded = await uploadPhoto(asset);
      const publicImageUrl = clean(
        uploaded.uploadedImageUrl || uploaded.url,
      );

      if (!isPublicImageUrl(publicImageUrl)) {
        throw new Error(
          "The image uploaded, but a shareable image URL was not returned.",
        );
      }

      setQuoteImages((current) => [
        ...current,
        {
          url: publicImageUrl,
          thumbnailUri: asset.uri,
          label: `Issue Photo ${current.length + 1}`,
        },
      ]);

      console.log("[FixBee][QuoteRequest] extra preview image uploaded", {
        hasUrl: Boolean(uploaded.uploadedImageUrl || uploaded.url),
      });
    } catch (error) {
      console.log(
        "[FixBee][QuoteRequest] add gallery image failed",
        error?.message,
      );
      Alert.alert(
        "Could not add image",
        error?.message || "Please try selecting the image again.",
      );
    } finally {
      setAddingImage(false);
    }
  };

  const handleRemoveImage = (imageIndex) => {
    setQuoteImages((current) =>
      current.filter((_, index) => index !== imageIndex),
    );
    console.log("[FixBee][QuoteRequest] preview image removed", { imageIndex });
  };

  const handleSendRequest = async () => {
    if (!providers.length) {
      Alert.alert(
        "Provider missing",
        "Selected providers could not be loaded from SQLite. Go back and select providers again.",
      );
      return;
    }

    if (!draft?.to) {
      Alert.alert(
        "Provider email missing",
        "None of the selected providers has an email address in the local provider cache.",
      );
      return;
    }

    if (!clean(draft?.photoId)) {
      Alert.alert(
        "Issue report unavailable",
        "The analyzed photo ID is missing, so the PDF report cannot be attached. Please restart from the issue photo.",
      );
      return;
    }

    const emailImages = Array.isArray(draft?.images) ? draft.images : [];
    const hasUnsharedImage = emailImages.some(
      (image) => !isPublicImageUrl(image?.url),
    );

    if (!emailImages.length || hasUnsharedImage) {
      Alert.alert(
        "Image upload incomplete",
        "One or more issue photos are not ready to include in the email. Please remove them and add them again.",
      );
      return;
    }

    setSending(true);

    try {
      const payload = buildProviderQuoteRequestPayload({
        draft,
        providers,
        issue: getIssueTitle(route?.params),
        detectedObject: route?.params?.detectedObject,
        category: route?.params?.category,
        address: route?.params?.address,
        unit: route?.params?.unit,
        city: route?.params?.city,
        date: route?.params?.date,
        time: route?.params?.time,
        notes: route?.params?.notes,
        photoId: route?.params?.photoId,
        editedBody: messageBody,
      });

      const result = await sendProviderQuoteRequestFromPreview(payload);

      navigation.navigate("ProviderConfirmation", {
        ...route.params,
        quoteStatus: "email-sent",
        quoteRequestId: result?.quoteRequestId || result?.recentScanId,
        recentScanId: result?.recentScanId,
        quoteEmailTo: result?.email?.to || result?.to,
        quoteEmailCc: result?.email?.cc || result?.cc,
        quoteEmailBccCount: result?.email?.bccCount ?? result?.bccCount,
        quoteEmailSubject: result?.email?.subject || payload?.email?.subject,
      });
    } catch (error) {
      console.log(
        "[FixBee][QuoteRequest] official send failed",
        error?.message,
      );
      Alert.alert(
        "Quote request failed",
        error.message || "Could not send the quote request.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={styles.safe}>
      <AppHeader title="Preview" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Request Summary</Text>
        <Text style={styles.subtitle}>
          Issue details summarized and ready for provider review.
        </Text>

        <View style={styles.mailCard}>
          <Text style={styles.mailLabel}>To</Text>
          <Text style={styles.mailLink}>
            {draft?.to || "Provider email missing"}
          </Text>

          <Text style={styles.mailLabel}>CC</Text>
          <Text style={styles.mailLink}>
            {draft?.cc || "Logged-in user email will be added by backend"}
          </Text>

          {draft?.bcc ? (
            <>
              <Text style={styles.mailLabel}>BCC</Text>
              <Text style={styles.mailLink}>{draft.bcc}</Text>
            </>
          ) : null}

          <Text style={styles.mailLabel}>Subject</Text>
          <Text style={styles.subject}>
            {draft?.subject || "Service Request"}
          </Text>

          <Text style={styles.mailLabel}>Message</Text>
          <TextInput
            value={messageBody}
            onChangeText={(value) => {
              setMessageEdited(true);
              setMessageBody(value);
            }}
            style={styles.bodyInput}
            multiline
            textAlignVertical="top"
            placeholder="Edit message body"
            placeholderTextColor={COLORS.providerMidGray}
          />
        </View>

        <View style={styles.imagesHeaderRow}>
          <Text style={styles.imagesTitle}>Attachments</Text>
          <Text style={styles.imagesHint}>
            Tap delete icon to remove photos
          </Text>
        </View>

        <View style={styles.imagesRow}>
          <View style={styles.pdfTile}>
            <Text style={styles.pdfTileText}>
              Issue{"\n"}Report{"\n"}PDF
            </Text>

            <View style={styles.pdfTileAccent} />
          </View>

          {imagePreviewItems.map((image, index) => (
            <View
              key={`${image.thumbnailUri || image.url}-${index}`}
              style={styles.imageTile}
            >
              {image.thumbnailUri || image.url ? (
                <Image
                  source={{
                    uri: image.thumbnailUri || image.url,
                  }}
                  style={styles.thumbnail}
                />
              ) : null}

              <Pressable
                onPress={() => handleRemoveImage(index)}
                style={styles.removeImageButton}
                hitSlop={8}
              >
                <Text style={styles.removeImageText}>×</Text>
              </Pressable>

              <Text style={styles.imageLabel}>
                {image.label || `Issue Photo ${index + 1}`}
              </Text>
            </View>
          ))}

          <Pressable
            onPress={handleAddImage}
            style={styles.addImageTile}
            disabled={addingImage}
          >
            {addingImage ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={styles.addImageText}>＋</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>

      <View style={styles.bottomCta}>
        <AuthFooterTray fill={COLORS.warmCream}>
          {sending ? (
            <ActivityIndicator />
          ) : (
            <ProviderPlainButton
              title="Send Quote Request"
              onPress={handleSendRequest}
            />
          )}
        </AuthFooterTray>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: SPACING.section,
    paddingBottom: 130,
  },
  title: {
    color: COLORS.textPrimary,
    ...TYPE.sectionTitle,
  },
  subtitle: {
    color: COLORS.providerMidGray,
    marginTop: SPACING.sm,
    marginBottom: SPACING.card,
    ...TYPE.small,
  },
  mailCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.big,
    padding: SPACING.card,
    borderWidth: 1,
    borderColor: COLORS.providerLightGray,
  },
  mailLabel: {
    color: COLORS.providerMidGray,
    marginTop: SPACING.card,
    marginBottom: 4,
    ...TYPE.small,
  },
  mailLink: {
    color: COLORS.honeyDark,
    marginBottom: 2,
    ...TYPE.body,
  },
  subject: {
    color: COLORS.textPrimary,
    marginBottom: 4,
    ...TYPE.body,
  },
  bodyText: {
    color: COLORS.textPrimary,
    ...TYPE.body,
  },
  bodyInput: {
    minHeight: 250,
    color: COLORS.textPrimary,
    padding: 0,
    margin: 0,
    ...TYPE.body,
  },
  imagesHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: SPACING.card,
    marginBottom: SPACING.sm,
  },
  imagesTitle: {
    color: COLORS.textPrimary,
    ...TYPE.cardTitle,
  },
  imagesHint: {
    color: COLORS.providerMidGray,
    ...TYPE.small,
  },
  imagesRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: SPACING.card,
  },
  imageTile: {
    width: 68,
    alignItems: "center",
    position: "relative",
  },
  thumbnail: {
    width: 62,
    height: 62,
    borderRadius: RADIUS.field,
    backgroundColor: COLORS.providerLightGray,
  },
  removeImageButton: {
    position: "absolute",
    top: -6,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.honeyLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  removeImageText: {
    color: COLORS.providerBrown,
    ...TYPE.body,
  },
  imageLabel: {
    color: COLORS.providerBrown,
    marginTop: SPACING.sm,
    textAlign: "center",
    ...TYPE.small,
  },
  addImageTile: {
    width: 62,
    height: 62,
    borderRadius: RADIUS.field,
    borderWidth: 1,
    borderColor: COLORS.honeyLight,
    backgroundColor: COLORS.honeyCream,
    alignItems: "center",
    justifyContent: "center",
  },
  addImageText: {
    color: COLORS.honey,
    ...TYPE.sectionTitle,
  },
  bottomCta: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  pdfTile: {
    width: 62,
    height: 62,
    borderRadius: RADIUS.field,
    backgroundColor: COLORS.honeyCream,
    paddingHorizontal: 8,
    paddingTop: 7,
    position: "relative",
    overflow: "hidden",
  },

  pdfTileText: {
    color: COLORS.providerBrown,
    ...TYPE.caption,
  },

  pdfTileAccent: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 5,
    backgroundColor: COLORS.riskHigh,
  },
});

export default ProviderQuoteRequestScreen;
