import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
const Home = ({myData}) => {
  const [Data] = useState(myData);
  console.log(myData, 'myDatafromHome');
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home Page</Text>
      <Text style={styles.subheading}>Getting Data From Redux Store</Text>
      <Text style={styles.text}>Name : {Data[0].authdata.name}</Text>
      <Text style={styles.text}>Email : {Data[0].authdata.email}</Text>
      <Text style={styles.text}>Contact : {Data[0].authdata.contact}</Text>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    myData: state.myData,
  };
};
export default connect(mapStateToProps, null)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 40,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    padding: 6,
  },
});
