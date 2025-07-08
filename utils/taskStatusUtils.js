import COLORS from "../constants/colors";

export const getStatusText = (status) => {
  switch (status) {
    case "notStarted":
      return "Not Started";
    case "inProgress":
      return "In Progress";
    case "paused":
      return "Paused";
    case "completed":
      return "Completed";
    case "overdue":
      return "Overdue";
    default:
      return "Unknown";
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case "inProgress":
      return COLORS.statusBlue;
    case "paused":
      return COLORS.statusOrange;
    case "completed":
      return COLORS.statusGreen;
    case "overdue":
      return COLORS.statusRed;
    default:
      return COLORS.statusGrey;
  }
};

export const getStatusBgColor = (status) => {
  switch (status) {
    case "inProgress":
      return "#e3f2fd";
    case "paused":
      return "#fff3e0";
    case "completed":
      return "#e8f5e9";
    case "overdue":
      return "#ffebee";
    default:
      return "#eeeeee";
  }
};
