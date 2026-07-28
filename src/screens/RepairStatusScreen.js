import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { apiGet } from "../api/apiClient";
import { submitRepairFeedback } from "../api/submitRepairFeedback";
import { updateChosenProvider } from "../api/updateChosenProvider";
import { updateRepairStatus } from "../api/updateRepairStatus";
import AppHeader from "../components/AppHeader/AppHeader";
import AnimatedBeeSvg from "../components/AnimatedBeeSvg";
import AuthFooterTray from "../components/AuthFooterTray/AuthFooterTray";
import PolygonAsset from "../components/PolygonAsset";
import RepairEstimateSection from "../components/RepairEstimateSection/RepairEstimateSection";
import UrgencyBadge from "../components/UrgencyBadge/UrgencyBadge";
import {
  RecommendationImageOverlay,
} from "../components/shapes/RecommendationShape";
import CompletedRepairCheck from "../../assets/icons/Completed_Repair_Check.svg";
import COLORS from "../constants/colors";
import styles from "./RepairStatusScreenStyle";

const getProviderName = (provider) =>
  provider?.businessName ||
  provider?.name ||
  provider?.title ||
  provider?.companyName ||
  "Service Provider";

const getFirstValue = (...values) =>
  values.find((value) => value !== undefined && value !== null && value !== "") ||
  "N/A";

const RepairStatusScreen = ({ navigation, route }) => {
  const photoId =
    route?.params?.photoId ||
    route?.params?.relatedId ||
    route?.params?.notification?.relatedId;

  const [loading, setLoading] = useState(true);
  const [scan, setScan] = useState(null);
  const [selectedProviderIndex, setSelectedProviderIndex] = useState(null);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackSuccessVisible, setFeedbackSuccessVisible] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedbackNote, setFeedbackNote] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [completing, setCompleting] = useState(false);

  const loadRepair = async () => {
    if (!photoId) {
      setLoading(false);
      Alert.alert("Repair unavailable", "Repair scan ID is missing.", [
        { text: "Go Back", onPress: () => navigation.goBack() },
      ]);
      return;
    }

    try {
      setLoading(true);
      const response = await apiGet(`/api/photos/${photoId}`);
      setScan(response?.scan || null);
    } catch (error) {
      Alert.alert(
        "Unable to load repair",
        error?.message || "Could not load repair details.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRepair();
  }, [photoId]);

  const providers = Array.isArray(scan?.selectedProviders)
    ? scan.selectedProviders
    : [];
  const analysis = scan?.analysis || {};
  const chosenProvider = scan?.chosenProvider || null;
  const isCompleted = scan?.repairStatus === "completed";
  const isExpertRepair =
    scan?.repairFlow === "expert" || scan?.providerRequested === true;
  const recommendedActions = Array.isArray(analysis?.recommendedActions)
    ? analysis.recommendedActions
    : [];
  const issuesToFix = Array.isArray(analysis?.issuesToFix)
    ? analysis.issuesToFix
    : [];
  const actions = Array.isArray(analysis?.userActions)
    ? analysis.userActions
        .filter((action) => action?.actionType !== "MARK_RESOLVED")
        .map((action) =>
          typeof action === "string"
            ? action
            : action?.description || action?.label || action?.title,
        )
        .filter(Boolean)
    : [];

  const handleConfirmProvider = async () => {
    if (selectedProviderIndex === null) {
      Alert.alert("Select provider", "Please select the provider you chose.");
      return;
    }

    const selectedProvider = providers[selectedProviderIndex];

    try {
      await updateChosenProvider(photoId, selectedProvider);
      setScan((currentScan) => ({
        ...currentScan,
        chosenProvider: selectedProvider,
        providerReplyStatus: "replied",
      }));
      setConfirmationVisible(true);
    } catch (error) {
      Alert.alert(
        "Unable to save provider",
        error?.message || "Could not update the chosen provider.",
      );
    }
  };

  const handleMarkComplete = async () => {
    try {
      setCompleting(true);
      await updateRepairStatus(photoId, "completed");
      setScan((currentScan) => ({
        ...currentScan,
        repairStatus: "completed",
        repairCompletedAt: new Date().toISOString(),
      }));
      setFeedbackVisible(true);
    } catch (error) {
      Alert.alert(
        "Unable to complete repair",
        error?.message || "Could not mark this repair as completed.",
      );
    } finally {
      setCompleting(false);
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      setSubmittingFeedback(true);
      await submitRepairFeedback(photoId, rating, feedbackNote);
      setFeedbackVisible(false);
      setScan((currentScan) => ({
        ...currentScan,
        repairStatus: "completed",
        feedbackSubmitted: true,
        repairFeedback: {
          rating,
          note: feedbackNote,
          submittedAt: new Date().toISOString(),
        },
      }));
      setFeedbackSuccessVisible(true);
    } catch (error) {
      Alert.alert(
        "Unable to submit feedback",
        error?.message || "Please try again.",
      );
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const renderListSection = (title, items) => {
    if (!items.length) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.detailList}>
          {items.map((item, index) => (
            <View
              key={`${title}-${index}`}
              style={[
                styles.detailRow,
                index === items.length - 1 && styles.detailRowLast,
              ]}
            >
              <Text style={styles.detailText}>
                {typeof item === "string"
                  ? item
                  : item?.title || item?.instruction || "Repair action"}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.safe}>
        <AppHeader title="Repair Status" onBack={() => navigation.goBack()} />
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading repair status...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          {scan?.imageUrl ? (
            <Image
              source={{ uri: scan.imageUrl }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.heroPlaceholder}>
              <Ionicons
                name="camera-outline"
                size={42}
                color={COLORS.mediumGrey}
              />
            </View>
          )}
          <RecommendationImageOverlay style={styles.heroOverlay} />
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>
              {analysis.detectedIssue || scan?.detectedObject || "Repair Issue"}
            </Text>
            <Text style={styles.heroDescription}>
              {analysis.description ||
                analysis.summary ||
                analysis.urgencyDescription ||
                analysis.confidenceReason ||
                "Review the detected issue and its recommended repair steps."}
            </Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.riskBadgePosition}>
            {isCompleted ? (
              <PolygonAsset
                variant="polygon9"
                width={80}
                height={89}
                fill={COLORS.primary}
              >
                <CompletedRepairCheck width={30} height={30} />
              </PolygonAsset>
            ) : (
              <UrgencyBadge urgency={analysis?.urgency} size={80} />
            )}
          </View>

          {renderListSection("Recommended Actions", recommendedActions)}
          {renderListSection("Issues to Fix", issuesToFix)}
          {renderListSection("Actions", actions)}

          <View style={styles.estimateSection}>
            <RepairEstimateSection
              urgency={analysis?.urgency}
              estimatedCostRange={getFirstValue(
                analysis?.estimatedCostRange,
                analysis?.costEstimate,
                analysis?.estimatedCost,
                analysis?.costRange,
              )}
              estimatedRepairTime={getFirstValue(
                analysis?.estimatedRepairTime,
                analysis?.repairTimeEstimate,
                analysis?.estimatedTime,
                analysis?.repairTime,
              )}
            />
          </View>

          {isExpertRepair && chosenProvider ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Selected Provider</Text>
              <View style={styles.chosenProviderCard}>
                <View style={styles.providerInitial}>
                  <Text style={styles.providerInitialText}>
                    {getProviderName(chosenProvider).charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.providerName}>
                  {getProviderName(chosenProvider)}
                </Text>
              </View>

              {!scan?.feedbackSubmitted && isCompleted ? (
                <TouchableOpacity
                  onPress={() => setFeedbackVisible(true)}
                  style={styles.feedbackLink}
                >
                  <Text style={styles.feedbackLinkText}>
                    Leave Repair Feedback
                  </Text>
                </TouchableOpacity>
              ) : scan?.feedbackSubmitted ? (
                <Text style={styles.feedbackSubmittedText}>
                  Feedback Submitted • {scan.repairFeedback?.rating || 5}/5
                </Text>
              ) : null}
            </View>
          ) : isExpertRepair ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Working With</Text>
              <Text style={styles.sectionHint}>
                Select the provider you chose for this repair.
              </Text>

              {providers.length === 0 ? (
                <Text style={styles.emptyText}>
                  No providers were saved for this repair.
                </Text>
              ) : (
                providers.map((provider, index) => {
                  const selected = selectedProviderIndex === index;

                  return (
                    <TouchableOpacity
                      key={`${getProviderName(provider)}-${index}`}
                      style={[
                        styles.providerCard,
                        selected && styles.providerCardSelected,
                      ]}
                      onPress={() => setSelectedProviderIndex(index)}
                    >
                      <View style={styles.checkbox}>
                        {selected ? (
                          <Ionicons
                            name="checkmark"
                            size={18}
                            color={COLORS.secondary}
                          />
                        ) : null}
                      </View>
                      <View style={styles.providerContent}>
                        <Text style={styles.providerName}>
                          {getProviderName(provider)}
                        </Text>
                        <Text style={styles.providerMeta}>
                          {provider?.email ||
                            provider?.phone ||
                            "Contact unavailable"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
          ) : isCompleted ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Repair Method</Text>
              <View style={styles.chosenProviderCard}>
                <View style={styles.providerInitial}>
                  <Ionicons
                    name="construct-outline"
                    size={20}
                    color={COLORS.secondary}
                  />
                </View>
                <Text style={styles.providerName}>Completed With DIY</Text>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>

      <AppHeader
        title={isCompleted ? "Completed Repair" : "Issue Detected"}
        onBack={() => navigation.goBack()}
        style={styles.headerContainer}
      />

      {isExpertRepair && !isCompleted ? (
        <View style={styles.bottomActionContainer}>
          <AuthFooterTray
            fill={COLORS.warmCream}
            style={styles.bottomActionContent}
          >
            {!chosenProvider ? (
              <TouchableOpacity
                disabled={selectedProviderIndex === null}
                style={[
                  styles.primaryButton,
                  selectedProviderIndex === null &&
                    styles.primaryButtonDisabled,
                ]}
                onPress={handleConfirmProvider}
              >
                <Text style={styles.primaryButtonText}>Confirm Provider</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled={completing}
                style={styles.primaryButton}
                onPress={handleMarkComplete}
              >
                {completing ? (
                  <ActivityIndicator
                    size="small"
                    color={COLORS.secondary}
                  />
                ) : (
                  <Text style={styles.primaryButtonText}>
                    Mark Complete
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </AuthFooterTray>
        </View>
      ) : null}

      <Modal
        transparent
        visible={confirmationVisible}
        animationType="slide"
        onRequestClose={() => setConfirmationVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationModal}>
            <AnimatedBeeSvg
              source={require("../assets/bee-animations/all-done.svganim")}
              width={132}
              height={154}
              style={styles.modalMascot}
            />
            <Text style={styles.confirmationTitle}>All Set</Text>
            <Text style={styles.confirmationMessage}>
              {getProviderName(scan?.chosenProvider)} has been selected for this
              repair.
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setConfirmationVisible(false)}
            >
              <Text style={styles.primaryButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={feedbackVisible}
        animationType="slide"
        onRequestClose={() => setFeedbackVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.feedbackModal}>
            <AnimatedBeeSvg
              source={require("../assets/bee-animations/all-done.svganim")}
              width={112}
              height={130}
              style={styles.modalMascot}
            />
            <Text style={styles.modalTitle}>How was the repair?</Text>
            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((value) => (
                <TouchableOpacity key={value} onPress={() => setRating(value)}>
                  <Ionicons
                    name={value <= rating ? "star" : "star-outline"}
                    size={30}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              value={feedbackNote}
              onChangeText={setFeedbackNote}
              placeholder="Add a note (optional)"
              style={styles.feedbackInput}
              multiline
            />
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSubmitFeedback}
              disabled={submittingFeedback}
            >
              {submittingFeedback ? (
                <ActivityIndicator
                  size="small"
                  color={COLORS.secondary}
                />
              ) : (
                <Text style={styles.primaryButtonText}>
                  Submit Feedback
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        visible={feedbackSuccessVisible}
        animationType="slide"
        onRequestClose={() => setFeedbackSuccessVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationModal}>
            <AnimatedBeeSvg
              source={require("../assets/bee-animations/all-done.svganim")}
              width={132}
              height={154}
              style={styles.modalMascot}
            />
            <Text style={styles.confirmationTitle}>Feedback Submitted</Text>
            <Text style={styles.confirmationMessage}>
              Thank you for your feedback. We appreciate your time and support.
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                setFeedbackSuccessVisible(false);
                navigation.navigate("MyRepairs");
              }}
            >
              <Text style={styles.primaryButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RepairStatusScreen;
