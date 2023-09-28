import React, { useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import QuestionList from "../../QuestionList/QuestionList";
import { View, Input, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Sprinkle from "../../../assets/Sprinkle1.png";
import useDebounce from "../../../hooks/useDebounceHook";
import { globalStyles } from "../../../globalStyles";

const styles = StyleSheet.create({
  homeContainer: {
    ...globalStyles.flex1,
  },

  listConatiner: {
    padding: 10,
  },

  searchContainer: {
    ...globalStyles.backgroundColorPrimary,
    padding: 15,
  },
  searchBarContainer: {
    ...globalStyles.backgroundColorSecondary,
    borderRadius: 30,
  },

  searchBar: {
    ...globalStyles.backgroundColorSecondary,
  },

  imageBackground: {
    ...globalStyles.flex1,
    resizeMode: "cover",
  },
});

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const debouncedValue = useDebounce(searchText, 500);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  return (
    <View style={styles.homeContainer}>
      <>
        <ImageBackground style={styles.imageBackground} source={Sprinkle}>
          <View style={styles.searchContainer}>
            <View style={styles.searchBarContainer}>
              <Input
                style={styles.searchBar}
                variant="rounded"
                size="xl"
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="search" />}
                    size={6}
                    ml="2"
                    color="#8c6cd0"
                  />
                }
                value={searchText}
                onChangeText={(e) => handleSearch(e)}
                placeholder="Search"
              />
            </View>
          </View>
          <View style={styles.listConatiner}>
            <QuestionList searchText={debouncedValue} navigation={navigation} />
          </View>
        </ImageBackground>
      </>
    </View>
  );
};

export default HomeScreen;
