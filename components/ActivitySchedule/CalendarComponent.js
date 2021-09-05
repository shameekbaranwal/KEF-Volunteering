import React, { useState, useEffect } from "react";
import { Text, ScrollView, StyleSheet, View, Button } from "react-native";
import { Calendar } from "react-native-calendars";

import Colors from "../../constants/Colors";
import AppListView from "./AppListView.js";
import AppButton from "../AppButton";
import useBackButton from "../BackButtonHandler.js";
import { scale } from "react-native-size-matters";

const CalendarComponent = ({
  EventsScheduled,
  navigation,
  refreshing,
  onRefresh,
}) => {
  if (EventsScheduled === []) return <Text>Loading...</Text>;

  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  function updateStyle() {
    //this function updates the styles of those dates that have some events, it accepts parameter in format 'YYYY-MM-DD'
    //console.log(dateString)
    return {
      selected: true,
      selectedColor: "red",
      customStyles: {
        container: {
          elevation: 3,
          borderRadius: 15,
          justifyContent: "center",
        },
      },
    };
  }

  function getMarkedDates() {
    //This function sends those dates of the calender to another function that have some events in it
    const e = {};
    for (let event of EventsScheduled) {
      let eventDate = new Date(parseInt(event.milliseconds, 10)); //Makes an object of the event date in the system Date format
      // eventDate = getJSDateObject(event.date)
      if (currentDate.getTime() <= eventDate.getTime()) {
        e[event.date] = updateStyle(event.date); //This is used to avoid showing events that are before present day
      } else {
        continue;
      }
    }
    return e;
  }

  const [dateSelected, setDateSelected] = useState(false);
  const [eventDetails, setEventDetails] = useState([]);

  const onDayPress = (day) => {
    let sendDate = [];
    for (let event of EventsScheduled) {
      if (event.date == day.dateString) {
        sendDate.push(event);
      }
    }
    setDateSelected(true);
    // console.log(sendDate)
    setEventDetails(sendDate);
  };

  useBackButton(() => {
    //for fixing the overall navigation
    if (dateSelected) {
      setDateSelected(false);
      return true;
    }
    navigation.navigate("AfterLogin");
    return true;
  });

  if (!dateSelected) {
    return (
      <ScrollView style={styles.calendarContainer}>
        <View style={{}}>
          <Calendar
            style={styles.calendar}
            minDate={currentDate}
            markingType="custom"
            //showMarkedDatesExamples={true}
            onDayPress={onDayPress}
            disableAllTouchEventsForDisabledDays={true}
            enableSwipeMonths={true}
            theme={{
              calendarBackground: Colors.light,
              textSectionTitleColor: Colors.secondary,
              dayTextColor: Colors.dark,
              monthTextColor: Colors.primary,
              arrowColor: "red",
              textDayFontWeight: "500",
              textMonthFontWeight: "700",
              textDayHeaderFontWeight: "bold",
              textDayFontSize: scale(15),
              textMonthFontSize: scale(23),
              textDayHeaderFontSize: 16,
            }}
            markedDates={getMarkedDates()}
            hideExtraDays={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Schedule a New Activity"
            styleButton={styles.button}
            styleTextSize={{ fontSize: scale(19) }}
            styleTextFontWeight={{ fontWeight: "700" }}
            styleTextFontColor={{ color: Colors.third }}
            onPress={() => navigation.navigate("CreateEvent")}
          />
        </View>
      </ScrollView>
    );
  }
  return (
    <View style={styles.listContainer}>
      <AppListView
        eventDetails={eventDetails}
        goBack={() => setDateSelected(false)}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      {eventDetails.length === 0 ? (
        <Text style={styles.noActivities}>
          No activities scheduled for this date.
        </Text>
      ) : null}
    </View>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: Colors.primary,
    padding: "4%",
  },
  calendar: {
    padding: "4%",
    borderRadius: 30,
    marginTop: "10%",
    marginBottom: scale(20),
    //height:scale(300)
  },
  buttonContainer: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    height: "auto",
    width: "auto",
    padding: "5%",
    marginBottom: scale(150),
    backgroundColor: Colors.secondary,
  },
  listContainer: {
    backgroundColor: Colors.primary,
    width: "100%",
    height: "100%",
    paddingTop: "2%",
    paddingBottom: "24%",
  },
  returnButtonContainer: {
    // padding: 20,
  },
  returnButton: {
    marginBottom: "2%",
    alignSelf: "center",
    paddingVertical: "5%",
    paddingHorizontal: "10%",
    width: "auto",
    height: "auto",
    backgroundColor: Colors.white,
  },
  returnButtonText: {
    fontSize: 18,
  },
  noActivities: {
    fontSize: 15,
    color: Colors.white,
    position: "absolute",
    top: "50%",
    alignSelf: "center",
  },
});
