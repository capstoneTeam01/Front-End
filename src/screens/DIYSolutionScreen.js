import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { getProviderRouteParamsFromIssue } from "../utils/issueProviderRouteMapper";

import HazardIcon from "../../assets/icons/Hazard_Icon.svg";
import RepairIcon from "../../assets/icons/Repair_Icon.svg";
import AppHeader from "../components/AppHeader/AppHeader";
import AuthFooterTray from "../components/AuthFooterTray/AuthFooterTray";
import PolygonAsset from "../components/PolygonAsset";
import COLORS from "../constants/colors";
import styles from "./DIYSolutionScreenStyle";
import { getDiyInstructions } from "../api/getDiyInstructions";
import { updateRepairStatus } from "../api/updateRepairStatus";

const MAX_PENDING_CHECKS = 30;
const PENDING_CHECK_DELAY = 500;
const STEP_MARKER_BACK_SIZE = {
  width: 48,
  height: 54,
};
const STEP_MARKER_FRONT_SIZE = {
  width: 40,
  height: 45,
};

const getPhotoId = (analysisResult) => {
  return (
    analysisResult?.photoId ||
    analysisResult?.scan?.photoId ||
    analysisResult?.analysis?.photoId ||
    null
  );
};


const wait = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

const StepMarker = ({
  index,
  active,
  completed,
}) => {
  if (active) {
    return (
      <View style={styles.stepMarkerLayer}>
        <PolygonAsset
          variant="polygon6"
          width={STEP_MARKER_BACK_SIZE.width}
          height={STEP_MARKER_BACK_SIZE.height}
          fill={COLORS.lightHoney}
          style={styles.stepMarkerBack}
        />

        <PolygonAsset
          variant="polygon5"
          width={STEP_MARKER_FRONT_SIZE.width}
          height={STEP_MARKER_FRONT_SIZE.height}
          fill={COLORS.primary}
          style={styles.stepMarkerFront}
        >
          <Text
            style={[
              styles.stepNumber,
              styles.stepNumberActive,
            ]}
          >
            {index + 1}
          </Text>
        </PolygonAsset>
      </View>
    );
  }

  return (
    <PolygonAsset
      variant="polygon5"
      width={STEP_MARKER_FRONT_SIZE.width}
      height={STEP_MARKER_FRONT_SIZE.height}
      fill={
        completed
          ? COLORS.primary
          : COLORS.lightHoney
      }
      style={styles.stepMarker}
    >
      {completed ? (
        <Ionicons
          name="checkmark"
          size={
            styles.stepCheckIcon.fontSize
          }
          color={
            styles.stepCheckIcon.color
          }
        />
      ) : (
        <Text style={styles.stepNumber}>
          {index + 1}
        </Text>
      )}
    </PolygonAsset>
  );
};

const DIYSolutionScreen = ({
  navigation,
  route,
}) => {
  const { analysisResult } =
    route?.params || {};

  const photoId =
    getPhotoId(analysisResult);

  const [currentStep, setCurrentStep] =
    useState(0);

  const [modalVisible, setModalVisible] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [
    loadingMessage,
    setLoadingMessage,
  ] = useState(
    "Loading DIY Instructions..."
  );

  const [diyData, setDiyData] =
    useState(null);

  const loadDiyInstructions =
    useCallback(async () => {
      if (!photoId) {
        setLoading(false);

        Alert.alert(
          "DIY instructions unavailable",
          "The scan ID is missing. Please return to the recommendation screen and try again.",
          [
            {
              text: "Go Back",
              onPress: () =>
                navigation?.goBack(),
            },
          ]
        );

        return;
      }

      setLoading(true);

      setLoadingMessage(
        "Loading DIY Instructions..."
      );
      try {
for (
  let attempt = 1;
  attempt <= MAX_PENDING_CHECKS;
  attempt += 1
) {
  const response = await getDiyInstructions(photoId);

  const generationStatus =
    response?.diyGenerationStatus ||
    (response?.diyInstructions ? "completed" : "pending");

  if (
    generationStatus === "completed" &&
    response?.diyInstructions
  ) {
    setDiyData(response.diyInstructions);
    setCurrentStep(0);
    setLoading(false);
    return;
  }

  if (generationStatus === "skipped") {
    setLoading(false);

    Alert.alert(
      "DIY instructions unavailable",
      response?.message ||
        "DIY instructions were not generated for this scan.",
      [
        {
          text: "Go Back",
          onPress: () => navigation?.goBack(),
        },
      ]
    );

    return;
  }

  if (generationStatus === "failed") {
    throw new Error(
      response?.message ||
        "DIY instruction generation failed."
    );
  }

  setLoadingMessage("Preparing DIY Instructions...");

  await wait(PENDING_CHECK_DELAY);
}

        throw new Error(
          "DIY instructions are taking longer than expected. Please try again shortly."
        );
      } catch (error) {
        console.log(
          "DIY Error:",
          error
        );

        setLoading(false);

        Alert.alert(
          "DIY instructions unavailable",
          error?.message ||
            "DIY instructions could not be loaded.",
          [
            {
              text: "Go Back",
              style: "cancel",
              onPress: () =>
                navigation?.goBack(),
            },
            {
              text: "Try Again",
              onPress:
                loadDiyInstructions,
            },
          ]
        );
      }
    }, [
      photoId,
      navigation,
    ]);

  useEffect(() => {
    loadDiyInstructions();
  }, [loadDiyInstructions]);

  const toolsNeeded =
    Array.isArray(
      diyData?.toolsNeeded
    )
      ? diyData.toolsNeeded
      : [];

  const repairSteps =
    Array.isArray(
      diyData?.repairSteps
    )
      ? diyData.repairSteps
      : [];

  const safetyWarnings =
    Array.isArray(
      diyData?.safetyWarnings
    )
      ? diyData.safetyWarnings
      : [];

  const allDone =
    repairSteps.length > 0 &&
    currentStep >=
      repairSteps.length;

  const handleStepPress = (index) => {
    if (index === currentStep) {
      setCurrentStep(
        currentStep + 1
      );
    }
  };
  const handleDiyDone = async () => {
  try {
    await updateRepairStatus(photoId, "completed");
    setModalVisible(true);
  } catch (error) {
    console.log("Repair status update error:", error);

    Alert.alert(
      "Unable to update repair",
      error?.message ||
        "Repair was completed, but the status could not be updated."
    );

    setModalVisible(true);
  }
};

  if (loading) {
    return (
      <View style={styles.safe}>
        <AppHeader
          title="DIY Solution"
          onBack={() =>
            navigation?.goBack()
          }
        />

        <View
          style={
            styles.loadingBox
          }
        >
          <ActivityIndicator
            size="large"
          />

          <Text
            style={
              styles.loadingText
            }
          >
            {loadingMessage}
          </Text>
        </View>
      </View>
    );
  }

  if (!diyData) {
    return null;
  }

  return (
    <View style={styles.safe}>
      <AppHeader
        title="DIY Solution"
        onBack={() =>
          navigation?.goBack()
        }
      />

      <ScrollView
        contentContainerStyle={
          styles.scroll
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <Text
          style={styles.title}
        >
          {diyData.title ||
            "Fix Instructions"}
        </Text>

        <Text
          style={
            styles.subtitle
          }
        >
          {diyData.summary ||
            "Follow these steps carefully and stop if the condition becomes worse."}
        </Text>

        <Text
          style={
            styles.sectionTitle
          }
        >
          Tools You May Need
        </Text>

        <View
          style={
            styles.toolCard
          }
        >
          {toolsNeeded.map(
            (item, index) => (
              <TouchableOpacity
                key={`${item}-${index}`}
                style={
                  styles.toolRow
                }
              >
                <View
                  style={
                    styles.toolIcon
                  }
                >
                  <PolygonAsset
                    variant="polygon9"
                    width={42}
                    height={47}
                    fill={COLORS.lightHoney}
                  >
                    <RepairIcon
                      width={20}
                      height={20}
                      color={COLORS.secondary}
                    />
                  </PolygonAsset>
                </View>

                <Text
                  style={
                    styles.toolText
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <Text
          style={
            styles.sectionTitle
          }
        >
          Repair Steps
        </Text>

        <View
          style={
            styles.stepsBox
          }
        >
          {repairSteps.map(
            (item, index) => {
              const completed =
                index <
                currentStep;

              const active =
                index ===
                currentStep;

              return (
                <TouchableOpacity
                  key={`step-${index}`}
                  style={
                    styles.stepRow
                  }
                  activeOpacity={
                    0.8
                  }
                  onPress={() =>
                    handleStepPress(
                      index
                    )
                  }
                  disabled={
                    !active
                  }
                >
                  <View
                    style={
                      styles.stepLeft
                    }
                  >
                    <StepMarker
                      index={index}
                      active={active}
                      completed={completed}
                    />

                    {index !==
                      repairSteps.length -
                        1 && (
                      <View
                        style={[
                          styles.stepLine,
                          completed &&
                            styles.stepLineDone,
                        ]}
                      />
                    )}
                  </View>

                  <View
                    style={
                      styles.stepContent
                    }
                  >
                    <Text
                      style={[
                        styles.stepTitle,
                        !active &&
                          !completed &&
                          styles.inactiveText,
                      ]}
                    >
                      {item.title}
                    </Text>

                    <Text
                      style={[
                        styles.stepDesc,
                        !active &&
                          !completed &&
                          styles.inactiveDesc,
                      ]}
                    >
                      {
                        item.instruction
                      }
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          )}
        </View>

        <View
          style={
            styles.warningBox
          }
        >
          <View
            style={
              styles.warningIcon
            }
          >
            <PolygonAsset
              variant="polygon9"
              width={64}
              height={71}
              fill={COLORS.primary}
            >
              <HazardIcon
                width={28}
                height={28}
              />
            </PolygonAsset>
          </View>

          <Text
            style={
              styles.warningText
            }
          >
            {safetyWarnings.join(
              "\n\n"
            )}
          </Text>
        </View>

        <View
          style={
            styles.helpBox
          }
        >
          <Text
            style={
              styles.helpTitle
            }
          >
            Feeling Stuck?
          </Text>

          <Text
            style={
              styles.helpText
            }
          >
            {diyData
              .professionalAdvice ||
              "Get help from nearby professionals anytime."}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AuthFooterTray fill={COLORS.warmCream}>
          <View style={styles.footerRow}>
            <TouchableOpacity
              style={[styles.footerBtn, styles.findExpertsBtn]}
              onPress={() => {
                const providerRouteParams =
                  getProviderRouteParamsFromIssue({
                    analysisResult,
                  });

                providerRouteParams.photoId = photoId;
                providerRouteParams.uploadedImageUri =
                  analysisResult?.uploadedImageUri;
                providerRouteParams.uploadedImageUrl =
                  analysisResult?.uploadedImageUrl ||
                  analysisResult?.analysis?.uploadedImageUrl;

                navigation.navigate("ProviderList", providerRouteParams);
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.footerBtnText}>Find Experts</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!allDone}
              onPress={handleDiyDone}
              style={[
                styles.footerBtn,
                allDone ? styles.diyDoneBtnActive : styles.diyDoneBtnDisabled,
              ]}
              activeOpacity={0.85}
            >
              <Text style={styles.footerBtnText}>DIY Done</Text>
            </TouchableOpacity>
          </View>
        </AuthFooterTray>
      </View>

      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
      >
        <View
          style={
            styles.modalOverlay
          }
        >
          <View
            style={
              styles.completeModal
            }
          >
            <View
              style={
                styles.modalHandle
              }
            />

            <View
              style={
                styles.modalIcon
              }
            >
              <PolygonAsset
                variant="polygon9"
                width={78}
                height={87}
                fill={COLORS.lightHoney}
              >
                <Ionicons
                  name="checkmark-sharp"
                  size={
                    styles
                      .modalCheckIcon
                      .fontSize
                  }
                  color={
                    styles
                      .modalCheckIcon
                      .color
                  }
                />
              </PolygonAsset>
            </View>

            <Text
              style={
                styles.modalTitle
              }
            >
              Great Job!
            </Text>

            <Text
              style={
                styles.modalText
              }
            >
              The repair has been marked as completed.
            </Text>

            <View
              style={
                styles.modalButtons
              }
            >
              <TouchableOpacity
                style={
                  styles.modalDarkButton
                }
                onPress={() => {
                  setModalVisible(
                    false
                  );

                  navigation?.navigate(
                    "MyRepairs"
                  );
                }}
              >
                <Text
                  style={
                    styles.modalDarkText
                  }
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.85}
                >
                  Recent Scans
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.modalLightButton
                }
                onPress={() => {
                  setModalVisible(
                    false
                  );

                  navigation?.navigate(
                    "Home"
                  );
                }}
              >
                <Text
                  style={
                    styles.modalLightText
                  }
                  numberOfLines={1}
                >
                  Home
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DIYSolutionScreen;
