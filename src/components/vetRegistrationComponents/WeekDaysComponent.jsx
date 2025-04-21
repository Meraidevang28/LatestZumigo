import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

const WeekDaysComponent = ({ selectedDays, toggleDay }) => {
  // const [selectedDays, setSelectedDays] = useState([]); // Track selected days

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // const toggleDay = (day) => {
  //   if (selectedDays.includes(day)) {
  //     // If the day is already selected, remove it
  //     setSelectedDays(
  //       selectedDays.filter((selectedDay) => selectedDay !== day)
  //     );
  //   } else {
  //     // Otherwise, add it to the selected days
  //     setSelectedDays([...selectedDays, day]);
  //   }
  // };

  return (
    <View style={styles.container}>
      {weekDays.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.weekButtons,
            selectedDays.includes(day) && styles.selectedButton,
          ]}
          onPress={() => toggleDay(day)}
        >
          <Text
            style={[
              styles.text,
              selectedDays.includes(day) && styles.selectedText,
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    // <View style={styles.container}>
    //   {weekDays.map((day, index) => (
    //     <TouchableOpacity
    //       key={index}
    //       style={[
    //         styles.weekButtons,
    //         selectedDays.includes(day) && styles.selectedButton, // Apply selected style if the day is selected
    //       ]}
    //       onPress={() => toggleDay(day)}
    //     >
    //       <Text
    //         style={[
    //           styles.text,
    //           selectedDays.includes(day) && styles.selectedText, // Apply selectedText only if day is selected
    //         ]}
    //       >
    //         {day}
    //       </Text>
    //     </TouchableOpacity>
    //   ))}
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    // gap: 10,
  },
  weekButtons: {
    width: 40,
    height: 54,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: "#ccc",
  },
  selectedButton: {
    backgroundColor: "#FF5362", // Change background color for selected buttons
  },
  text: {
    color: "#333", // Default text color
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Proxima-Nova-Medium",
  },
  selectedText: {
    color: "#fff", // Text color when button is selected
    fontWeight: "bold",
  },
});

export default WeekDaysComponent;