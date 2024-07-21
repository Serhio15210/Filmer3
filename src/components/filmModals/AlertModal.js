import { StyleSheet, View, Text } from "react-native";
import ModalContainer from "../ModalContainer";
import { normalize } from "../../responsive/fontSize";
import { useTheme } from "../../providers/ThemeProvider";
import { useState } from "react";
import { themeColors } from "./themeColors";
import FilmerButton from "../UI/FilmerButton";

const AlertModal = ({ open, setOpen, title, text, onCancel, onDiscard,cancelText="Cancel", discardText="Discard" }) => {
  const { i18n, appTheme } = useTheme();
  const styles = style(themeColors[appTheme]);
  return (
    <ModalContainer open={open} setOpen={setOpen} position={"center"} padding={20} type={"fade"}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.buttonRow}>
          <FilmerButton text={cancelText} style={{ backgroundColor: "transparent" }} onPress={onCancel} />
          <FilmerButton text={discardText} style={{ backgroundColor: "transparent" }} onPress={onDiscard} />
        </View>

      </View>
    </ModalContainer>
  );
};
const style = (theme) => StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.backgroundColor,
    padding: normalize(15),
    borderRadius: 10,

  },
  title: {
    color: "white",
    fontSize: normalize(24),
  },
  text: {
    color: "white",
    fontSize: normalize(16),
  },
  buttonRow: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10, marginTop: normalize(30),
  },
});
export default AlertModal;
