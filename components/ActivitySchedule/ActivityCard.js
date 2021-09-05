import React from "react";
import { View, StyleSheet } from "react-native";

function Card(props) {
  return (
    <View style={styles.cardContainer}>
      <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black", //ios
    shadowOffset: { width: 0, height: 2 }, //ios
    shadowRadius: 6, //ios
    shadowOpacity: 0.26, //ios
    backgroundColor: "white", //ios
    elevation: 5, //android
    borderRadius: 20,
    marginLeft: '5%',
	  marginRight: '5%'
  },
  cardContainer: {
	//   borderWidth: 1,
	//   borderColor: 'white'
  }

});

export default Card;
