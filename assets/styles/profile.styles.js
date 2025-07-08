import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 20,
    minHeight: 50,
  },
  dropdownContainer: {
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: COLORS.white,
  },
  dropdownText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  loading: {
    marginTop: 50,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  taskCardContainer: {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 12,
  },
  taskCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderLeftWidth: 4,
  },
  taskCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textDark,
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 80,
    alignItems: "center",
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.white,
  },
  taskDetailsContainer: {
    marginBottom: 12,
  },
  taskDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  taskDetailLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: "500",
    flex: 1,
  },
  taskDetailValue: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
  taskCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  viewDetailsText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
  },
  viewDetailsArrow: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "600",
  },
});
