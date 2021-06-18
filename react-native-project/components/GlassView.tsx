import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';

type GlassProps = {
    children: React.ReactNode,
}

export function GlassView({ children }: GlassProps) {
    return (
        
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require('../images/brooke-lark-background-sml.jpg')}
                style={styles.imgBackground}
                resizeMode='cover'
            />
            <BlurView intensity={45} style={[StyleSheet.absoluteFill, styles.blur]}>
                <View style={styles.glass}>
                    {children}
                </View>
            </BlurView>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgBackground: {
        width: '100%',
        height: '100%',
    },
    blur: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    glass: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(255,255,255,0.55)",
        shadowRadius: 8,
        shadowOffset: { height: 8, width: 8 },
        shadowColor: "rgba(31, 38, 135, 0.37)",
        borderRadius: 10,
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
        padding: 30,
        maxWidth: "85%"
    }
});
