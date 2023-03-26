import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "./Card";
import {
  cardsNivel0,
  cardsNivel1,
  cardsNivel2,
  cardsNivel3,
  cardsNivel4,
} from "./nivelesCards";

export default function App() {
  const [board, setBoard] = useState(() =>
    shuffle([...cardsNivel0, ...cardsNivel0])
  );
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedcards] = useState([]);
  const [score, setScore] = useState(0);
  const [nivel, setNivel] = useState(false);
  const [nivelCards, setNivelCards] = useState(0);

  const handleTapCard = (index) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
    setSelectedCards([...selectedCards, index]);
  };

  const selectedNivel = (nivel) => {
    setNivelCards(nivel);
    setNivel(true);
    setSelectedCards([]);
    setMatchedcards([]);
    setScore(0);
  };
  console.log("setNivel", nivelCards);

  useEffect(() => {
    if (nivelCards === 1) {
      setBoard(() => shuffle([...cardsNivel1, ...cardsNivel1]));
    } else if (nivelCards === 2) {
      setBoard(() => shuffle([...cardsNivel2, ...cardsNivel2]));
    } else if (nivelCards === 3) {
      setBoard(() => shuffle([...cardsNivel3, ...cardsNivel3]));
    } else if (nivelCards === 4) {
      setBoard(() => shuffle([...cardsNivel4, ...cardsNivel4]));
    } else if (nivelCards === 0) {
      setBoard(() => shuffle([...cardsNivel0, ...cardsNivel0]));
    }
  }, [nivelCards]);

  const didPlayerWin = () => matchedCards.length === board.length;

  useEffect(() => {
    if (selectedCards.length < 2) return;
    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedcards([...matchedCards, ...selectedCards]);
      setSelectedCards([]);
      setScore(score + 2);
    } else {
      const timeoutId = setTimeout(() => setSelectedCards([]), 1000);
      return () => {
        clearTimeout(timeoutId), setScore(score - 1);
      };
    }
  }, [selectedCards]);

  const resetGame = () => {
    setMatchedcards([]);
    setScore(0);
    setSelectedCards([]);
  };

  return (
    <View style={styles.container}>
      {nivel ? (
        <View
          style={
            ({ flex: 1, marginTop: StatusBar.currentHeight }, styles.container)
          }
        >
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={styles.containerTitle}>
              <Text style={styles.title}>
                {didPlayerWin() ? "Congratulations 🎉" : "AcMemory 🤔 "}
              </Text>
              <Text style={styles.title}>Score: {score}</Text>
            </View>

            <View style={styles.board}>
              {board.map((card, index) => {
                const isTurnedOver =
                  selectedCards.includes(index) || matchedCards.includes(index);
                return (
                  <Card
                    key={index}
                    isTurnedOver={isTurnedOver}
                    onPress={() => handleTapCard(index)}
                    nivel={nivelCards}
                  >
                    {card}
                  </Card>
                );
              })}
            </View>
            {didPlayerWin() && <Button onPress={resetGame} title="reset" />}
            <Button
              onPress={() => {
                setNivel(false);
                setNivelCards(0);
                setSelectedCards([]);
                setMatchedcards([]);
                setScore(0);
              }}
              title="Elige nivel"
            />
            <StatusBar style="light" />
          </ScrollView>
        </View>
      ) : (
        <View
          style={
            ({ flex: 1, marginTop: StatusBar.currentHeight },
            styles.containerNivel)
          }
        >
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Elije tu Nivel</Text>
          </View>
          <View style={styles.containerButtons}>
            <Button
              style={styles.button}
              onPress={() => selectedNivel(1)}
              title="Nivel 1"
            />
            <Button onPress={() => selectedNivel(2)} title="Nivel 2" />
            <Button onPress={() => selectedNivel(3)} title="Nivel 3" />
            <Button onPress={() => selectedNivel(4)} title="Nivel 4" />
          </View>
          <View style={styles.board}>
            {board.map((card, index) => {
              const isTurnedOver =
                selectedCards.includes(index) || matchedCards.includes(index);
              return (
                <Card
                  key={index}
                  isTurnedOver={isTurnedOver}
                  onPress={() => handleTapCard(index)}
                  nivel={nivelCards}
                >
                  {card}
                </Card>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerNivel: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  containerTitle: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  containerButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    gap: "10px",
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "900",
  },
  button: {
    backgroundColor: "white",
    color: "white",
  },
});
/**
 * Returns the array shuffled into a random order.
 * Do not edit this function.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
