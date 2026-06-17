import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },

  header: {
    height: 56,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FDFDFD",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0A0A0A",
  },

  headerSpace: {
    width: 24,
  },

  scroll: {
    width: 354,
    alignSelf: "center",
    paddingBottom: 120,
  },

  title: {
    fontSize: 22,
    fontWeight: "400",
    color: "#0A0A0A",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: "#4A5565",
    marginBottom: 32,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0A0A0A",
    marginBottom: 16,
  },

  toolCard: {
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 18,
    backgroundColor: "#FDFDFD",
    marginBottom: 36,
    overflow: "hidden",
  },

  toolRow: {
    height: 54,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E9E7E7",
  },

  hexIcon: {
    width: 30,
    height: 30,
    backgroundColor: "#8C8C8C",
    marginRight: 14,
    borderRadius: 8,
  },

  toolText: {
    fontSize: 14,
    color: "#0A0A0A",
  },

  stepsBox: {
    marginBottom: 24,
  },

  stepRow: {
    flexDirection: "row",
    minHeight: 74,
  },

  stepLeft: {
    width: 42,
    alignItems: "center",
  },

  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#D1D5DC",
    alignItems: "center",
    justifyContent: "center",
  },

  stepCircleActive: {
    backgroundColor: "#5F5F5F",
  },

  stepCircleDone: {
    backgroundColor: "#A1A1A1",
  },

  stepNumber: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FDFDFD",
  },

  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#E2E2E2",
    marginTop: 4,
  },

  stepLineDone: {
    backgroundColor: "#A1A1A1",
  },

  stepContent: {
    flex: 1,
    paddingLeft: 4,
  },

  stepTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0A0A0A",
    marginBottom: 7,
  },

  stepDesc: {
    fontSize: 13,
    lineHeight: 17,
    color: "#4A5565",
  },

  inactiveText: {
    color: "#A1A1A1",
  },

  inactiveDesc: {
    color: "#B8BDC5",
  },

  warningBox: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  warningIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#E9E7E7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },

  warningText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 21,
    color: "#0A0A0A",
  },

  helpBox: {
    minHeight: 108,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 20,
  },

  helpTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0A0A0A",
    marginBottom: 12,
  },

  helpText: {
    fontSize: 13,
    color: "#4A5565",
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 30,
    backgroundColor: "#FDFDFD",
    flexDirection: "row",
    gap: 16,
  },

  secondaryButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#E9E7E7",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryText: {
    fontSize: 14,
    color: "#A1A1A1",
  },

  diyButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  diyButtonDisabled: {
    backgroundColor: "#D1D5DC",
  },

  diyButtonActive: {
    backgroundColor: "#8C8C8C",
  },

  diyButtonText: {
    fontSize: 14,
    color: "#FDFDFD",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  completeModal: {
    backgroundColor: "#FDFDFD",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: "center",
  },

  modalHandle: {
    width: 34,
    height: 4,
    borderRadius: 10,
    backgroundColor: "#D1D5DC",
    marginBottom: 16,
  },

  modalIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#A1A1A1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0A0A0A",
    marginBottom: 8,
  },
  backIcon: {
    fontSize: 24,
    color: "#0A0A0A",
  },
  stepCheckIcon: {
    fontSize: 16,
    color: "#FDFDFD",
    },
    warningIconStyle: {
        fontSize: 22,
        color: "#0A0A0A",
    },

    modalCheckIcon: {
        fontSize: 26,
        color: "#FDFDFD",
    },

  modalText: {
    fontSize: 13,
    color: "#4A5565",
    textAlign: "center",
    marginBottom: 24,
  },

  modalButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },

  modalDarkButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#8C8C8C",
    alignItems: "center",
    justifyContent: "center",
  },

  modalLightButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#E2E2E2",
    alignItems: "center",
    justifyContent: "center",
  },

  modalDarkText: {
    color: "#FDFDFD",
    fontSize: 13,
  },

  modalLightText: {
    color: "#0A0A0A",
    fontSize: 13,
  },
  loadingBox: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
},

loadingText: {
  marginTop: 12,
  fontSize: 14,
  color: "#0A0A0A",
},
});

export default styles;