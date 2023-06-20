import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function CreatePostScreen() {
  const [name, useName] = useState("");
  const [location, useLocation] = useState("");
  const [focused, setFocused] = useState(null);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center", zIndex: 10 }}
      >
        <View style={styles.main}>
          <ImageBackground style={styles.image}>
            <View style={styles.icon}>
              <MaterialIcons
                name="photo-camera"
                size={24}
                style={{ color: "#BDBDBD", opacity: 0.5 }}
              />
            </View>
          </ImageBackground>

          <Pressable>
            <Text style={styles.text}>Завантажити фото</Text>
          </Pressable>

          <TextInput
            // style={{ ...styles.input, marginTop: 32 }}
            style={
              focused === "name"
                ? {
                    ...styles.input,
                    marginTop: 32,
                    borderBottomColor: "#FF6C00",
                  }
                : { ...styles.input, marginTop: 32 }
            }
            name="name"
            textContentType="name"
            placeholder="Назва..."
            placeholderTextColor="#BDBDBD"
            value={name}
            onChangeText={(value) => useName(value)}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
          ></TextInput>

          <View style={styles.inputWrapper}>
            <SimpleLineIcons
              name="location-pin"
              size={24}
              style={styles.locationIcon}
            />
            <TextInput
              // style={{ ...styles.input, paddingLeft: 28 }}
              style={
                focused === "location"
                  ? {
                      ...styles.input,
                      paddingLeft: 28,
                      borderBottomColor: "#FF6C00",
                    }
                  : { ...styles.input, paddingLeft: 28 }
              }
              name="location"
              textContentType="location"
              placeholder="Місцевість..."
              placeholderTextColor="#BDBDBD"
              value={location}
              onChangeText={(value) => useLocation(value)}
              onFocus={() => setFocused("location")}
              onBlur={() => setFocused(null)}
            ></TextInput>
          </View>

          <Pressable
            style={{
              ...styles.button,
              backgroundColor: name && location ? "#FF6C00" : "#F6F6F6",
            }}
          >
            <Text
              style={{
                ...styles.btnText,
                color: name && location ? "#FFFFFF" : "#BDBDBD",
              }}
            >
              Опубліковати
            </Text>
          </Pressable>

          <View style={styles.deleteIcon}>
            <Ionicons name="ios-trash-outline" size={24} color="#BDBDBD" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 34,
    backgroundColor: "#FFFFFF",
    zIndex: 10,
  },

  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    height: 240,
    borderRadius: 8,
  },

  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    backgroundColor: "white",
    borderRadius: 30,
  },

  text: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 8,
  },

  input: {
    height: 50,

    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,

    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  inputWrapper: {
    marginTop: 16,
    marginBottom: 32,
  },

  locationIcon: {
    position: "absolute",
    top: 10,
    left: 0,
    color: "#BDBDBD",
    opacity: 0.5,
  },

  button: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },

  btnText: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#BDBDBD",
  },

  deleteIcon: {
    width: 70,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",

    paddingHorizontal: 23,
    paddingVertical: 8,

    marginTop: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

// imp

export const useKeyboardListenerWithOpen = (number) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        const { height } = event.endCoordinates;
        setKeyboardHeight(height - number);
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return { keyboardHeight, keyboardOpen };
};

export const useKeyboardListener = (number) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        const { height } = event.endCoordinates;
        setKeyboardHeight(height - number);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return { keyboardHeight };
};

export const usePasswordVisibility = (initialState, password) => {
  const [showPassword, setShowPassword] = useState(initialState);
  const [hidden, setHidden] = useState("#F6F6F6");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (password === "") {
      setHidden("#F6F6F6");
    } else {
      setHidden("#1B4371");
    }
  }, [password]);

  return { showPassword, hidden, togglePasswordVisibility };
};
