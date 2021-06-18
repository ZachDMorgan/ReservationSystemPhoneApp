import React from 'react';
import { Text } from 'react-native';

type TypographyProps = {
    children: string;
    variant?: "h1" | "body" | "error";
    onPress?(): void; // make a type a function that returns void
}

export function Typography({ children, variant = 'body' }: TypographyProps) { 
    const style = { fontSize:16, color:'black', backgroundColor: "rgba(0,0,0,0)", margin:0, padding:0, border:'none'};
    switch(variant){
        case "h1": style.fontSize = 26; break;
        case "body": style.fontSize = 16; break;
        case "error": style.fontSize = 18; style.color = 'red'; style.backgroundColor="white"; style.margin=10; style.border="1px solid black"; style.padding=5; break;
    }

    return (
        <Text style={style}>

                {children}

        </Text>
    );
}