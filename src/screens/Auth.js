import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
  Image,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import normalize from 'react-native-normalize';
import CustomTextInput from '../components/customTextInput';
import CustomButtom from '../components/customButton';
import Images from '../constants/Images';
import {connect} from 'react-redux';
import axios from 'axios';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const Height = Dimensions.get('window').height;

const Auth = ({navigation, data}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isShowingResults, setIsShowingResults] = useState(false);
  const [authdata, setAuthData] = useState({
    name: '',
    email: '',
    contact: '',
    country: '',
    address: '',
  });
  const API_KEY = 'AIzaSyA9clAaw0Cov080JQ65VoOU9_l1rW0fO2Q';

  // console.log(authdata, 'authdata');
  const handleAuthValidation = () => {
    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!authdata.name.trim()) {
      Snackbar.show({text: 'Please enter name'});
      return false;
    } else if (!authdata.email.trim().match(emailRegex)) {
      Snackbar.show({text: 'Please enter valid email id'});
      return false;
    } else if (authdata.contact.length !== 10) {
      Snackbar.show({text: 'Please Enter 10 digits Contact Number'});
      return false;
    }
    return true;
  };

  const handleSignupSubmit = async () => {
    const isValid = handleAuthValidation();
    if (isValid) {
      data(authdata);
      navigation.navigate('Home');
    }
  };

  const searchLocation = async text => {
    setSearchKeyword({searchKeyword: text});
    axios
      .request({
        method: 'post',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${searchKeyword}`,
      })
      .then(response => {
        console.log(response.data);
        setSearchResults(response.data.predictions);
        setIsShowingResults(true);
      })
      .catch(e => {
        console.log(e.response);
      });
  };

  return (
    <View>
      <ImageBackground
        source={Images.bgImage}
        style={styles.bgImage}></ImageBackground>

      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.loginHeading}>Register</Text>
            <View style={{marginTop: 40}}>
              <CustomTextInput
                onChangeText={name =>
                  setAuthData(prevState => ({
                    ...prevState,
                    name,
                  }))
                }
                value={authdata.name}
                style={{width: '100%', color: 'black'}}
                autoCapitalize="none"
                placeholder={'Enter Name'}
              />
              <CustomTextInput
                onChangeText={email =>
                  setAuthData(prevState => ({
                    ...prevState,
                    email,
                  }))
                }
                value={authdata.email}
                style={{width: '100%', color: 'black'}}
                autoCapitalize="none"
                placeholder={'Enter Email'}
              />
              <CustomTextInput
                onChangeText={contact =>
                  setAuthData(prevState => ({
                    ...prevState,
                    contact,
                  }))
                }
                value={authdata.contact}
                style={{width: '100%', color: 'black'}}
                autoCapitalize="none"
                keyboardType={'numeric'}
                placeholder={'Enter Contact'}
              />
              {/* <ScrollView>
                <GooglePlacesAutocomplete
                  placeholder="Search"
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                  }}
                  query={{
                    key: API_KEY,
                    language: 'en',
                  }}
                  onPress={(data, details = null) => console.log(data)}
                  onFail={error => console.error(error)}
                  requestUrl={{
                    url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                    // useOnPlatform: 'web',
                  }}
                />
              </ScrollView> */}

              <TextInput
                placeholder="Search for an address"
                returnKeyType="search"
                style={styles.searchBox}
                placeholderTextColor="#000"
                onChangeText={text => searchLocation(text)}
                value={searchKeyword}
              />
              {isShowingResults && (
                <FlatList
                  data={searchResults}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        style={styles.resultItem}
                        onPress={
                          (() => setSearchKeyword(item.description),
                          setIsShowingResults(false))
                        }>
                        <Text>{item.description}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={item => item.id}
                  style={styles.searchResultsContainer}
                />
              )}
            </View>
            <View style={{marginTop: 40, alignItems: 'center'}}>
              <View style={{width: '60%'}}>
                <CustomButtom
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() => handleSignupSubmit()}
                  title="Save and Proceed"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    data: authdata => dispatch({type: 'AUTH_DATA', authdata: authdata}),
  };
};
export default connect(null, mapDispatchToProps)(Auth);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loginHeading: {
    marginVertical: 40,
    marginHorizontal: 20,
    fontSize: normalize(35),
    fontWeight: 'bold',
    color: 'white',
  },
  bgImage: {
    flex: 1,
    width: '100%',
    opacity: 0.7,
    height: Height,
  },
});
