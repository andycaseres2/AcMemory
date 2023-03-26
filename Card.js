import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const Card = ({ onPress, isTurnedOver, children, nivel = 4 }) => {
  return (
    <Pressable
      onPress={onPress}
      style={
        isTurnedOver
          ? nivel === 3 || nivel === 4
            ? styles.cardUpNivel3_4
            : styles.cardUp
          : nivel === 3 || nivel === 4
          ? styles.cardDownNivel3_4
          : styles.cardDown
      }
    >
      {isTurnedOver ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        <Text style={styles.text}>?</Text>
      )}
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardUp: {
    width: 100,
    height: 100,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "25%",
    backgroundColor: "#1e293b",
    borderWidth: "8",
    borderColor: "#334155",
  },
  cardDown: {
    width: 100,
    height: 100,
    margin: 10,
    borderWidth: "8",
    borderColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "25%",
    backgroundColor: "#1e293b",
  },
  cardUpNivel3_4: {
    width: 80,
    height: 80,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "25%",
    backgroundColor: "#1e293b",
    borderWidth: "8",
    borderColor: "#334155",
  },
  cardDownNivel3_4: {
    width: 80,
    height: 80,
    margin: 10,
    borderWidth: "8",
    borderColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "25%",
    backgroundColor: "#1e293b",
  },
  text: {
    fontSize: 46,
    color: "#334155",
  },
});
