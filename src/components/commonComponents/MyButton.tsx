import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

type MyButtonParams = {
    title: string;
    onPress: () => void;
};

function MyButton(params : MyButtonParams) : React.JSX.Element {
    return (
        <TouchableOpacity style={styles.button} onPress={params.onPress}>
            <Text style={styles.text}>{params.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1976D2',
        padding: 10,
        borderRadius: 5,
        width: 200,
        alignSelf: 'center',
    },
    text: {
        color: 'white',
        textAlign: 'center',
    },
});

export default MyButton;
