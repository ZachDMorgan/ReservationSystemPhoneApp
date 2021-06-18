import React from 'react'
import {TextInput, StyleSheet} from 'react-native'

type TextInputProps = {
    placeholder?: string;
    onChange?(text: string): void;
    value?: string;
}

export function Input({placeholder, onChange}: TextInputProps){
    const styles = StyleSheet.create ({ input:{
        fontSize:16,
        padding:10,
        margin:3,
        backgroundColor: 'white',
        border:"1px solid grey",
        borderRadius:5,
        minWidth:"85%"
        
    }
    });

    return (
        <TextInput style={styles.input} placeholder={placeholder} onChangeText={onChange} />
    );
}