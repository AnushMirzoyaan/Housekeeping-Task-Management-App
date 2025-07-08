import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { getStatusColor, getStatusText } from "../../../utils/taskStatusUtils";
import { formatTime } from "../../../utils/timeUtils";

import styles from "../../../assets/styles/taskDetails.styles";
import COLORS from "../../../constants/colors";
import useTasksStore from "../../../store/useTasksStore";

export default function TaskDetail() {
  const { id } = useLocalSearchParams() || {};
  const router = useRouter();

  const tasks = useTasksStore((state) => state.tasks);
  const updateTask = useTasksStore((state) => state.updateTask);
  const startTimer = useTasksStore((state) => state.startTimer);
  const pauseTimer = useTasksStore((state) => state.pauseTimer);
  const stopTimer = useTasksStore((state) => state.stopTimer);
  const timer = useTasksStore((state) => state.timers[id] || 0);

  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("notStarted");

  useEffect(() => {
    if (!id) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Task ID is missing",
      });
      router.replace("/dashboard");
      return;
    }

    const found = tasks.find((t) => t._id === id);
    if (found) {
      setTask(found);
      setStatus(found.status || "notStarted");
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Task not found",
      });
      router.replace("/dashboard");
    }
  }, [id, tasks, router]);

  const getProgressPercentage = () => {
    if (!task) return 0;
    if (status === "completed") return 100;
    const estimatedSeconds = (task.estimatedDuration || task.duration) * 60;
    return Math.min((timer / estimatedSeconds) * 100, 100);
  };

  const getProgressBarColor = () => {
    if (!task) return COLORS.statusGrey;
    const estimatedSeconds = (task.estimatedDuration || task.duration) * 60;
    if (timer > estimatedSeconds && status !== "completed") {
      return COLORS.statusRed;
    }
    return getStatusColor(status);
  };

  const saveStatusAndTime = (newStatus) => {
    if (!task) return;
    setStatus(newStatus);
    updateTask({
      ...task,
      status: newStatus,
      timeSpent: timer,
    });
  };

  const handleStart = () => {
    if (!task) return;
    startTimer(id);
    saveStatusAndTime("inProgress");
    Toast.show({
      type: "success",
      text1: "Task Started",
      text2: `${task.title} is now in progress`,
    });
  };

  const handlePause = () => {
    if (!task) return;
    pauseTimer(id);
    saveStatusAndTime("paused");
    Toast.show({
      type: "info",
      text1: "Task Paused",
      text2: `${task.title} has been paused`,
    });
  };

  const handleFinish = () => {
    if (!task) return;
    stopTimer(id);
    const newStatus = status === "overdue" ? "overdue" : "completed";
    saveStatusAndTime(newStatus);
    Toast.show({
      type: "success",
      text1: "Task Completed",
      text2: `${task.title} finished in ${formatTime(timer)}`,
    });
  };

  if (!task) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle} numberOfLines={2}>
            {task.title}
          </Text>
          <View style={styles.headerStatus}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(status) },
              ]}
            >
              <Text style={styles.statusBadgeText}>
                {getStatusText(status)}
              </Text>
            </View>
            <Text style={styles.taskId}>Task #{task._id.slice(-6)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.timerCard}>
        <Text style={styles.timerCardTitle}>Time Tracker</Text>
        <View style={styles.timerDisplay}>
          <View style={styles.circularProgress}>
            <View
              style={[
                styles.progressRing,
                {
                  borderColor: getProgressBarColor(),
                  borderTopWidth: 6,
                  transform: [
                    { rotate: `${(getProgressPercentage() / 100) * 360}deg` },
                  ],
                },
              ]}
            />
            <Text style={styles.timerText}>{formatTime(timer)}</Text>
          </View>
        </View>
        <View style={styles.estimatedTime}>
          <Ionicons
            name="time-outline"
            size={16}
            color={COLORS.textSecondary}
          />
          <Text style={styles.estimatedTimeText}>
            Estimated: {task.estimatedDuration || task.duration} min
          </Text>
        </View>

        <View style={styles.actionButtons}>
          {status === "notStarted" && (
            <TouchableOpacity
              style={[styles.primaryButton, styles.startButton]}
              onPress={handleStart}
            >
              <Ionicons name="play" size={20} color={COLORS.white} />
              <Text style={styles.primaryButtonText}>Start Task</Text>
            </TouchableOpacity>
          )}
          {(status === "inProgress" || status === "overdue") && (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.primaryButton, styles.pauseButton]}
                onPress={handlePause}
              >
                <Ionicons name="pause" size={20} color={COLORS.white} />
                <Text style={styles.primaryButtonText}>Pause</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.primaryButton, styles.finishButton]}
                onPress={handleFinish}
              >
                <Ionicons name="checkmark" size={20} color={COLORS.white} />
                <Text style={styles.primaryButtonText}>Finish</Text>
              </TouchableOpacity>
            </View>
          )}
          {status === "paused" && (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.primaryButton, styles.resumeButton]}
                onPress={handleStart}
              >
                <Ionicons name="play" size={20} color={COLORS.white} />
                <Text style={styles.primaryButtonText}>Resume</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.primaryButton, styles.finishButtonSecondary]}
                onPress={handleFinish}
              >
                <Ionicons name="checkmark" size={20} color={COLORS.white} />
                <Text style={styles.primaryButtonText}>Finish</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.cardTitle}>Task Details</Text>
        <View style={styles.detailsContent}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Deadline</Text>
            <Text style={styles.detailValue}>{task.deadline}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailValue}>
              {task.hotelApartment || task.location || "Not specified"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Assigned To</Text>
            <Text style={styles.detailValue}>
              {task.assignedTo || "Unassigned"}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>
              {task.estimatedDuration || task.duration} minutes
            </Text>
          </View>
          {timer > 0 && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Time Spent</Text>
              <Text style={styles.detailValue}>{formatTime(timer)}</Text>
            </View>
          )}
        </View>
      </View>

      {task.description && (
        <View style={styles.descriptionCard}>
          <Text style={styles.cardTitle}>Description</Text>
          <Text style={styles.descriptionText}>{task.description}</Text>
        </View>
      )}

      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressPercentage}>
            {Math.round(getProgressPercentage())}%
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${getProgressPercentage()}%`,
                backgroundColor: getProgressBarColor(),
              },
            ]}
          />
        </View>
      </View>

      <Toast />
    </ScrollView>
  );
}
