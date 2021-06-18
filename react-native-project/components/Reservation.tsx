import React from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity, Linking} from 'react-native'

type ReservationProps = {
    Sitting: string,
    ReservationStatus: string,
    StartTime: string,
    Duration: number,
    Guests: number,
    Notes: string,
    Tables: string[],
}


export function Reservation({Sitting, ReservationStatus, StartTime, Duration, Guests, Notes, Tables}: ReservationProps){
    

    return (
        <View style={styles.reservations}>
          <View style={styles.container}>
          <Text style={styles.container}>{StartTime}</Text>
          </View>
            <Text>{Sitting} for {Guests} Guests</Text>
            <Text>Duration is {Duration} minutes</Text>
            <Text>Notes: {Notes}</Text>
            <Text>Status: {ReservationStatus}</Text>
            <Text>Tables: {Tables.toString()}</Text>
        </View>
    );

    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    reservations: {
      margin:2,
      padding: 10,
      borderRadius: 10,
      border: "1px solid grey",
      backgroundColor: "rgba(255,255,255,0.75)",
      maxWidth:"85%"
    }
  });


