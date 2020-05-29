import * as FileSystem from "./FileSystem";
import * as StoreReview from "expo-store-review";
import {  Platform , Alert} from 'react-native';

export const requestReview = () => {
  FileSystem.loadFromFileSystem(FileSystem.FILES.SETTINGS, (settings) => {
    if (!settings.reviewRequestShown) {
      if (Platform.OS === "ios") {
        Alert.alert(
          "Rate On Paper Sports Football",
          "Would you mind spending a moment to rate On Paper Sports Football?",
          [
            {
              text: "Don't Ask Again",
              onPress: () => {
                updateSettings(settings);
              },
            },
            {
              text: "Remind Me Later",
              onPress: () => {},
            },
            {
              text: "Rate Now!",
              onPress: () => {
                updateSettings(settings);
                StoreReview.requestReview();
              },
            },
          ]
        );
      }
    }
  });
};

const updateSettings = (settings) => {
  let newSettings = settings;
  newSettings.reviewRequestShown = true;
  FileSystem.saveToFileSystem(FileSystem.FILES.SETTINGS, newSettings, () => {});
};
