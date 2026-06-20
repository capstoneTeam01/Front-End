import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import UrgencyBadge from "../components/UrgencyBadge/UrgencyBadge";


const getEstimateValue = (...values) => {
  const match = values
    .map((value) => String(value || "").trim())
    .find((value) => value && value.toLowerCase() !== "null" && value.toLowerCase() !== "undefined" && value.toUpperCase() !== "N/A");

  return match || "N/A";
};

const getActionText = (action) => {
    if (typeof action === "string") {
        return action;
    }

    return (
        action.label ||
        action.title ||
        action.type ||
        action.action ||
        "Immediate action recommended"
    );
};

const EmergencyIssueScreen = ({
    analysisResult,
    imageUri,
    onFindExpertsPress,
}) => {
    const result = analysisResult?.analysis || analysisResult || {};
    const immediateActions = result.recommendedActions || [];
    const estimatedCostText = getEstimateValue(
        result.estimatedCostRange,
        result.costEstimate,
        result.estimatedCost,
        result.costRange
    );
    const estimatedTimeText = getEstimateValue(
        result.estimatedRepairTime,
        result.repairTimeEstimate,
        result.estimatedTime,
        result.repairTime
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.screenTitle}>Issue Detected</Text>

            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <View style={styles.imagePlaceholder}>
                    <Text style={styles.placeholderText}>Image Preview</Text>
                </View>
            )}

            <View style={styles.warningCard}>
                <View style={styles.urgencyBadgeContainer}>
                    <UrgencyBadge urgency={result.urgency} />
                </View>

                <Text style={styles.title}>Emergency Issue Detected</Text>

                <Text style={styles.description}>
                    {result.urgencyDescription ||
                        "This issue may require immediate professional attention."}
                </Text>
            </View>

            <Text style={styles.sectionTitle}>Detected Risk</Text>

            <View style={styles.riskCard}>
                <Text style={styles.riskText}>
                    {result.detectedIssue || "Possible emergency repair issue"}
                </Text>

                <Text style={styles.riskText}>
                    {result.detectedObject
                        ? `Detected object: ${result.detectedObject}`
                        : "Object details not available"}
                </Text>

                <Text style={styles.riskText}>
                    Urgency level: {result.urgency || "High"}
                </Text>
            </View>

            <Text style={styles.sectionTitle}>Immediate Actions</Text>

            <View style={styles.actionsCard}>
                {immediateActions.length > 0 ? (
                    immediateActions.map((action, index) => (
                        <View key={index} style={styles.actionItem}>
                            <Text style={styles.actionText}>{getActionText(action)}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>
                        Avoid interacting with the issue and contact a professional.
                    </Text>
                )}
            </View>

            <View style={styles.estimateCard}>
                <View style={styles.estimateItem}>
                    <Text style={styles.estimateLabel}>Estimate Cost</Text>
                    <Text style={styles.estimateValue}>
                        {estimatedCostText}
                    </Text>
                </View>

                <View style={styles.estimateItem}>
                    <Text style={styles.estimateLabel}>Estimate Time</Text>
                    <Text style={styles.estimateValue}>
                        {estimatedTimeText}
                    </Text>
                </View>
            </View>

            <Pressable style={styles.primaryButton} onPress={onFindExpertsPress}>
                <Text style={styles.primaryButtonText}>Find Experts</Text>
            </Pressable>
        </ScrollView>
    );
};

export default EmergencyIssueScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
    },

    content: {
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 28,
    },

    screenTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#222222",
        textAlign: "center",
        marginBottom: 16,
    },

    image: {
        width: "100%",
        height: 220,
        borderRadius: 22,
        marginBottom: 16,
        backgroundColor: "#D9D9D9",
    },

    imagePlaceholder: {
        width: "100%",
        height: 220,
        borderRadius: 22,
        marginBottom: 16,
        backgroundColor: "#D9D9D9",
        alignItems: "center",
        justifyContent: "center",
    },

    placeholderText: {
        color: "#555555",
        fontSize: 15,
    },

    warningCard: {
        backgroundColor: "#222222",
        borderRadius: 18,
        padding: 16,
        marginBottom: 20,
    },

    urgencyBadgeContainer: {
        marginBottom: 12,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#FFFFFF",
        marginBottom: 8,
    },

    description: {
        fontSize: 15,
        color: "#E5E5E5",
        lineHeight: 22,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#222222",
        marginBottom: 10,
    },

    riskCard: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E1E1E1",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 20,
    },

    riskText: {
        fontSize: 15,
        color: "#222222",
        fontWeight: "500",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#EFEFEF",
    },

    actionsCard: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E1E1E1",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 20,
    },

    actionItem: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#EFEFEF",
    },

    actionText: {
        fontSize: 15,
        color: "#222222",
        fontWeight: "500",
    },

    emptyText: {
        fontSize: 15,
        color: "#666666",
        padding: 16,
        lineHeight: 22,
    },

    estimateCard: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 22,
    },

    estimateItem: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E1E1E1",
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 10,
        alignItems: "center",
    },

    estimateLabel: {
        fontSize: 13,
        color: "#666666",
        marginBottom: 8,
    },

    estimateValue: {
        fontSize: 15,
        fontWeight: "700",
        color: "#222222",
        textAlign: "center",
    },

    primaryButton: {
        height: 52,
        borderRadius: 14,
        backgroundColor: "#8B8B8B",
        alignItems: "center",
        justifyContent: "center",
    },

    primaryButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});