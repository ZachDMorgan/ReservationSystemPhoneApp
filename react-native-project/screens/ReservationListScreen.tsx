import * as React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Typography, Input, Button, Reservation, GlassView } from '../components'
import { Text, View } from '../components/Themed';
import { getReservation } from '../services/reservation'
import { getStorage, clearStorage } from '../services/storage'

export default function ReservationListScreen(props: any) {

  const [jwtToken, setJwtToken] = React.useState("");
  const [reservations, setReservations] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(<View />);

  React.useEffect(() => {
    if(jwtToken === ""){
      getStorage().then((value: string | null) => {
        if (value !== null) {
          setJwtToken(value)
        }
        else {
          clearStorage();
          props.navigation.replace('Login')
        };
      });
    }
    else {
      setLoading(true)
      getReservation(jwtToken).then((response: any) => {
        return response.data;
      }).then((data: any) => {
        if (data.length !== 0) {
          setErrors("");
          setReservations(data.map((r: any) => {
            return (
              <Reservation 
                key={r.id}
                Sitting={r.sitting}
                ReservationStatus={r.reservationStatus} 
                StartTime={r.startTime} 
                Duration={r.duration} 
                Guests={r.guests} 
                Notes={r.notes} 
                Tables={r.tables} 
              />
            );
          }));
        }
        else {
          setErrors();
        }
      }).catch((error: any) => {
        setErrors(<Typography variant={"error"}>You currently have no reservations.</Typography>
          "Oops! There was an error. Please try again later or contact us at 9876 5432.");
      });
    }
    setLoading(false)

  }, [jwtToken, reservations])


  return (
    <GlassView>
      <Text style={styles.title}>Reservation List Screen</Text>
      <View style={styles.separator} lightColor="#000" darkColor="#000" />
      {loading ? <ActivityIndicator /> :
        <View style={{ backgroundColor: "rgba(0,0,0,0)" }}>
          <View style={{ backgroundColor: "rgba(0,0,0,0)" }}>{reservations}</View>
          {errors}
        </View>
      }
    </GlassView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
