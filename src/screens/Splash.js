import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import Images from '../constants/Images';
const Splash = ({navigation}) => {
  const [align, setAlign] = useState('center');
  const [alignsecond, setAlignsecond] = useState(false);

  setTimeout(() => {
    setAlign('flex-start'), setAlignsecond(true);
  }, 1500);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Auth');
    }, 3500);
  }, []);

  return (
    <View style={[styles.Container, {justifyContent: align}]}>
      <Image source={Images.logo} style={styles.Logo} resizeMode="contain" />
      {!alignsecond ? null : (
        <View style={{margin: 10}}>
          <Text style={{color: '#114998', fontSize: 30, fontWeight: 'bold'}}>
            Welcome
          </Text>
        </View>
      )}
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  Logo: {
    width: 300,
    height: 300,
  },
});
