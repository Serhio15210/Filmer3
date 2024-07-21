import React from 'react';
import {BlurView} from "@react-native-community/blur";
import {Modal, Pressable, StyleSheet} from "react-native";
import {normalize} from "../responsive/fontSize";

const ModalContainer = ({open, setOpen, children, type = "fade", position = 'center', padding = normalize(15)}) => {
  return (
    <Modal
      animationType={type}
      transparent={true}
      visible={open}
      onRequestClose={() => {
        setOpen(!open);
      }}

    >

      <BlurView style={{flex: 1}}
                blurRadius={2}
                downsampleFactor={0}

      >
        <Pressable onPress={(e) => {
          e.stopPropagation()
          setOpen(false)
        }} style={{
          ...styles.container,
          justifyContent: position,
          padding: padding,
          borderBottomRightRadius: position === 'flex-end' ? 0 : 10,
          borderBottomLeftRadius: position === 'flex-end' ? 0 : 10
        }}>
          <Pressable onPress={(e) => {
            e.stopPropagation()

          }} style={{width: '100%'}}>
            {children}
          </Pressable>

        </Pressable>
      </BlurView>


    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(15)
  }
})
export default ModalContainer;
