import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

type ButtonProps = {
    text: string;
    onPress?(): void;
    varient: string
}

export function Button({ text, onPress, varient }: ButtonProps) {
    const styles = StyleSheet.create({
        button: {
            fontSize: 16,
            padding: 10,
            backgroundColor: 'white',
            border: "1px solid grey",
            borderRadius: 5,
            minWidth: "85%",
            justifyContent: 'center',
            alignItems: 'center',
        },
        login: {
            fontSize: 16,
            padding: 10,
            marginTop: 3,
            backgroundColor: '#003555',
            border: "1px solid #210388",
            borderRadius: 5,
            minWidth: "85%",
            justifyContent: 'center',
            alignItems: 'center',
        }
    });
    switch (varient) {
        case "Login":
            return (
                <TouchableOpacity style={{ borderRadius: 5 }} onPress={onPress}>
                    <View style={styles.login}>
                        <Text style={{ color: 'white' }}>{text}</Text>
                    </View>
                </TouchableOpacity>
            );
        default:
            return (
                <TouchableOpacity style={{ borderRadius: 5 }} onPress={onPress}>
                    <View style={styles.button}>
                        <Text>{text}</Text>
                    </View>
                </TouchableOpacity>
            );
    }

}
