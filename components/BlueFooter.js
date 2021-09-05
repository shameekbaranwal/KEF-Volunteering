import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { ScaledSheet } from "react-native-size-matters";

const BlueFooter = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.call}>
        <Text style={styles.infoText}>Call Us On</Text>
        <Text style={styles.detailText}>1800-121-131-141</Text>
      </View>
      <View style={styles.mail}>
        <Text style={styles.infoText}>Send a mail to</Text>
        <Text style={styles.detailText}>
          kef.volunteer@kotakeducationfoundation.org
        </Text>
      </View>
    </View>
  );
};
const styles = ScaledSheet.create({
  screen: {
    backgroundColor: Colors.primary,
    paddingVertical: "4%",
    paddingHorizontal: "5%",
    //paddingBottom: '4%',
    height: "23%",
    width: "100%",
  },
  infoText: {
    color: "grey",
    fontSize: "13@s",
  },
  detailText: {
    color: "white",
    fontSize: "14@s",
  },
  call: {
    flex: 1,
    marginBottom: "4%",
  },
  mail: {
    flex: 1,
    paddingBottom: "2%",
  },
});

export default BlueFooter;
