import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Toast from "react-native-toast-message";
import useTasksStore from "../../store/useTasksStore";
import {
  getStatusBgColor,
  getStatusColor,
  getStatusText,
} from "../../utils/taskStatusUtils";
import { formatTime } from "../../utils/timeUtils";

import styles from "../../assets/styles/profile.styles";
import COLORS from "../../constants/colors";

export default function Dashboard() {
  const tasks = useTasksStore((state) => state.tasks);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterItems, setFilterItems] = useState([
    { label: "All Tasks", value: "all" },
    { label: "Not Started", value: "notStarted" },
    { label: "In Progress", value: "inProgress" },
    { label: "Paused", value: "paused" },
    { label: "Completed", value: "completed" },
    { label: "Overdue", value: "overdue" },
  ]);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getFilteredTasks = () => {
    let filteredTasks = [...tasks];
    if (filter === "notStarted") {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === "notStarted"
      );
    } else if (filter === "inProgress") {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === "inProgress"
      );
    } else if (filter === "paused") {
      filteredTasks = filteredTasks.filter((task) => task.status === "paused");
    } else if (filter === "completed") {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === "completed"
      );
    } else if (filter === "overdue") {
      filteredTasks = filteredTasks.filter((task) => task.status === "overdue");
    }

    filteredTasks.sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.deadline || "23:59"}:00`);
      const timeB = new Date(`1970-01-01T${b.deadline || "23:59"}:00`);
      return timeA - timeB;
    });
    return filteredTasks;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Today's Schedule</Text>
      </View>

      <DropDownPicker
        open={filterOpen}
        value={filter}
        items={filterItems}
        setOpen={setFilterOpen}
        setValue={(callback) => setFilter(callback())}
        setItems={setFilterItems}
        placeholder="Select Filter"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
        zIndex={1000}
        zIndexInverse={2000}
      />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={styles.loading}
          />
        ) : getFilteredTasks().length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No tasks available</Text>
            <Text style={styles.emptyStateSubtext}>
              Tasks matching your filter will appear here
            </Text>
          </View>
        ) : (
          getFilteredTasks().map((task) => {
            return (
              <TouchableOpacity
                key={task._id}
                onPress={() => router.push(`/task/${task._id}`)}
                activeOpacity={0.7}
                style={styles.taskCardContainer}
              >
                <View
                  style={[
                    styles.taskCard,
                    {
                      backgroundColor:
                        task.status === "overdue"
                          ? getStatusBgColor(task.status)
                          : undefined,
                      borderColor: getStatusColor(task.status),
                    },
                  ]}
                >
                  <View style={styles.taskCardHeader}>
                    <Text style={styles.taskTitle} numberOfLines={2}>
                      {task.title}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor: getStatusColor(task.status),

                          flexDirection: "row",
                        },
                      ]}
                    >
                      {task.status === "overdue" && (
                        <Ionicons
                          name="warning-outline"
                          size={16}
                          color={COLORS.white}
                          style={{ marginRight: 4 }}
                        />
                      )}

                      <Text style={styles.statusBadgeText}>
                        {getStatusText(task.status)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.taskDetailsContainer}>
                    <View style={styles.taskDetailRow}>
                      <Text style={styles.taskDetailLabel}>Duration:</Text>
                      <Text style={styles.taskDetailValue}>
                        {task.estimatedDuration || task.duration} min
                      </Text>
                    </View>

                    <View style={styles.taskDetailRow}>
                      <Text style={styles.taskDetailLabel}>Deadline:</Text>
                      <Text style={styles.taskDetailValue}>
                        {task.deadline}
                      </Text>
                    </View>

                    <View style={styles.taskDetailRow}>
                      <Text style={styles.taskDetailLabel}>Assigned to:</Text>
                      <Text style={styles.taskDetailValue}>
                        {task.assignedTo || "Unassigned"}
                      </Text>
                    </View>

                    {task.timeSpent > 0 && (
                      <View style={styles.taskDetailRow}>
                        <Text style={styles.taskDetailLabel}>Time Spent:</Text>
                        <Text style={styles.taskDetailValue}>
                          {formatTime(task.timeSpent)}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.taskCardFooter}>
                    <Text style={styles.viewDetailsText}>View Details</Text>
                    <Text style={styles.viewDetailsArrow}>→</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
      <Toast />
    </View>
  );
}
