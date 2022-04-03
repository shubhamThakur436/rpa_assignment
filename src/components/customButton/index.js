import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const CustomButtom = (props) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress}>
            <Text style={styles.text}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 25,
        marginVertical: 10,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});

export default CustomButtom;