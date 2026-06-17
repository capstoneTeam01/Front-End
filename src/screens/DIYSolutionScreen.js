import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styles from "./DIYSolutionScreenStyle";
/* Update: we are importing getDiyInstructions API here to fetch the DIY instructions based on the analysis result and
urgency level passed from the ScanScreen. This will allow us to display relevant instructions and tools for 
different types of issues and urgency levels, rather than relying on hardcoded data. We can use the analysisResult and 
urgency parameters to determine which instructions to fetch and display to the user.
*/
import { getDiyInstructions } from "../api/getDiyInstructions";


// I have hardcoded this information to test with, but ideally this should come from the ScanScreen analysis result. 
// The steps and tools may vary based on the specific issue detected in the scan.
// Todo: clean up the hardcoded data and ensure the DIYSolutionScreen receives the necessary information from the ScanScreen 
// to display relevant instructions and tools based on the detected issue and its urgency level.
const tools = ["FAllback -Adjustable Wrench", "Bucket", "Plumber's Tape", "Flashlight"];

const steps = [
  {
    title: "FAllback - Shut Off Water Supply",
    desc: "Turn off the nearby water valve before starting the repair.",
  },
  {
    title: "FAllback - Control Water Leakage",
    desc: "Place a bucket under the leaking area to catch excess water.",
  },
  {
    title: "FAllback - Dry the Pipe Area",
    desc: "Dry the affected pipe area using a cloth or towel.",
  },
  {
    title: "FAllback - Apply Plumber’s Tape",
    desc: "Wrap plumber’s tape tightly around the leaking section.",
  },
  {
    title: "FAllback - Monitor the Leak",
    desc: "Check the pipe for additional leakage over the next few minutes.",
  },
];

/*
This screen provides step-by-step DIY instructions for users to temporarily control a detected leak.
It includes a list of tools that may be needed, detailed repair steps with progress tracking, and safety warnings. 
Users can mark each step as completed, and once all steps are done, they can confirm the repair is complete. 
There is also an option to find nearby professionals if users need additional help.
*/
const DIYSolutionScreen = ({ navigation, route}) => {
  console.log("DIYSolutionScreen received route params:", route?.params);

   const { analysisResult, urgency } = route?.params || {};
   console.log("DIYSolutionScreen extracted analysisResult:", analysisResult, "and urgency:", urgency);
   const [currentStep, setCurrentStep] = useState(0);
   const [modalVisible, setModalVisible] = useState(false);
   const [loading, setLoading] = useState(true);
   const [diyData, setDiyData] = useState(null);



useEffect(() => {
  loadDiyInstructions();
}, []);

const loadDiyInstructions = async () => {
  console.log("Loading DIY instructions with analysisResult:", analysisResult, "and urgency:", urgency);
  try {
    const response = await getDiyInstructions(
      analysisResult?.analysis || analysisResult,
      urgency
    );

    console.log("\n #####################################################DIY Response:", response);

    setDiyData(response.diyInstructions);
  } catch (error) {
    console.log("DIY Error:", error);
  } finally {
    setLoading(false);
  }
};
   
  const repairSteps = diyData?.repairSteps || steps;

const allDone = currentStep >= repairSteps.length;

  const handleStepPress = (index) => {
    if (index === currentStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  if (loading) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          Generating DIY Instructions...
        </Text>
      </View>
    </SafeAreaView>
  );
}

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Ionicons
            name="chevron-back"
            size={styles.backIcon.fontSize}
            color={styles.backIcon.color}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>DIY Solution</Text>

        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          {diyData?.title || "Fix Instructions"}
        </Text>

        <Text style={styles.subtitle}>
          {diyData?.summary ||
          "Follow the steps below to temporarily control the issue."}
          </Text>

        <Text style={styles.sectionTitle}>Tools You May Need</Text>

        <View style={styles.toolCard}>
         {(diyData?.toolsNeeded || tools).map((item) => (
            <TouchableOpacity key={item} style={styles.toolRow}>
              <View style={styles.hexIcon} />
              <Text style={styles.toolText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Repair Steps</Text>

        <View style={styles.stepsBox}>
          {repairSteps.map((item, index) => {
            const completed = index < currentStep;
            const active = index === currentStep;

            return (
              <TouchableOpacity
                key={item.title}
                style={styles.stepRow}
                activeOpacity={0.8}
                onPress={() => handleStepPress(index)}
                disabled={!active}
              >
                <View style={styles.stepLeft}>
                  <View
                    style={[
                      styles.stepCircle,
                      active && styles.stepCircleActive,
                      completed && styles.stepCircleDone,
                    ]}
                  >
                    {completed ? (
                      <Ionicons
                        name="checkmark"
                        size={styles.stepCheckIcon.fontSize}
                        color={styles.stepCheckIcon.color}
                      />
                    ) : (
                      <Text style={styles.stepNumber}>{index + 1}</Text>
                    )}
                  </View>

                  {index !== repairSteps.length - 1 && (
                    <View
                      style={[
                        styles.stepLine,
                        completed && styles.stepLineDone,
                      ]}
                    />
                  )}
                </View>

                <View style={styles.stepContent}>
                  <Text
                    style={[
                      styles.stepTitle,
                      !active && !completed && styles.inactiveText,
                    ]}
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={[
                      styles.stepDesc,
                      !active && !completed && styles.inactiveDesc,
                    ]}
                  >
                    {item.instruction || item.desc}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.warningBox}>
          <View style={styles.warningIcon}>
            <Ionicons
              name="warning-outline"
              size={styles.warningIconStyle.fontSize}
              color={styles.warningIconStyle.color}
            />
          </View>

          <Text style={styles.warningText}>
           {diyData?.safetyWarnings?.join("\n") || 
           "Stop immediately if leakage increases or water reaches nearby electrical outlets."}
          </Text>
        </View>

        <View style={styles.helpBox}>
          <Text style={styles.helpTitle}>Feeling Stuck?</Text>
          <Text style={styles.helpText}>
             {diyData?.professionalAdvice ||
            "Get help from nearby professionals anytime."}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryText}>Find Experts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!allDone}
          onPress={() => setModalVisible(true)}
          style={[
            styles.diyButton,
            allDone ? styles.diyButtonActive : styles.diyButtonDisabled,
          ]}
        >
          <Text style={styles.diyButtonText}>DIY Done</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.completeModal}>
            <View style={styles.modalHandle} />

            <View style={styles.modalIcon}>
              <Ionicons
                name="checkmark"
                size={styles.modalCheckIcon.fontSize}
                color={styles.modalCheckIcon.color}
              />
            </View>

            <Text style={styles.modalTitle}>Repair Completed</Text>

            <Text style={styles.modalText}>
              Continue monitoring the issue over the next few hours.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalDarkButton}
                onPress={() => {
                  setModalVisible(false);
                  navigation?.navigate("MyRepairs");
                  }}>
                <Text style={styles.modalDarkText}>Recent Scans</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalLightButton}
                onPress={() => {
                  setModalVisible(false);
                  navigation?.navigate("Home");
                }}
              >
                <Text style={styles.modalLightText}>Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DIYSolutionScreen;