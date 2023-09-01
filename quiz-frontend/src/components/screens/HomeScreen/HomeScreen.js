import React, { useEffect, useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import QuestionList from "../../QuestionList/QuestionList";
import Loading from "../../Loading/Loading";
import { View, Input, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Sprinkle from "../../../assets/Sprinkle1.png";
import useDebounce from "../../../hooks/useDebounceHook";

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },

  listConatiner: {
    padding: 10,
  },
  searchContainer: {
    backgroundColor: "#8c6cd0",
    padding: 15,
  },
  searchBarContainer: {
    backgroundColor: "#fff",
    borderRadius: 30,
  },

  searchBar: {
    backgroundColor: "white",
  },

  imageBackground: {
    flex: 1,
    resizeMode: "cover",
  },
});

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedValue = useDebounce(searchText, 500);

  // test for loader - will be used when backend is implemented
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  return (
    <View style={styles.homeContainer}>
      {!loading ? (
        <Loading />
      ) : (
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
              <QuestionList
                searchText={debouncedValue}
                navigation={navigation}
              />
            </View>
          </ImageBackground>
        </>
      )}
    </View>
  );
};

export default HomeScreen;
