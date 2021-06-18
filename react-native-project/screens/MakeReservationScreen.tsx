import * as React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDates, getTimes, postReservation } from '../services/reservation';
import { getStorage, clearStorage } from '../services/storage'
import { Text, View } from '../components/Themed';
import { Input, Button, Typography, GlassView } from '../components'

//hack
let Notes = "";

export default function MakeReservationScreen(props: any) {

  const [guests, setGuests] = React.useState(0);
  const [date, setDate] = React.useState();
  const [datePicker, setDatePicker] = React.useState(<View></View>);
  const [time, setTime] = React.useState();
  const [timePicker, setTimePicker] = React.useState(<View></View>);
  const [submit, setSubmit] = React.useState(<View></View>);
  const [notes, setNotes] = React.useState("");
  const [token, setToken] = React.useState("");

  const errorMessage = "Oops! There was an error. Please try again later or contact us at 9876 5432.";
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const guestArray = numbers.map((n: number) => {
    return (<Picker.Item key={n} value={n} label={n.toString()} />);
  })
  guestArray.unshift(<Picker.Item key={0} value={0} label={"Please choose the number of guests."} />);

  React.useEffect(() => {
    getStorage().then((value: string | null) => {
      if (value !== null) {
        setToken(value)
      }
      else {
        clearStorage();
        props.navigation.replace('Login')
      }
    }
    );
  }, []);

  React.useEffect(() => {
    Notes = notes;
  }, [notes]);

  React.useEffect(() => {
    if (guests !== 0) {
      getDates(guests).then((data: any) => renderDates(data)).catch((error: any) => {
        console.error(error);
        setDatePicker(
          <View>
            <Typography variant={"error"}>{errorMessage}</Typography>
          </View>
        );
      });
    }
  }, [guests]);

  React.useEffect(() => {
    if (date !== undefined) {
      getTimes(date).then((data: any) => renderTimes(data)).catch((error: any) => {
        console.error(error);
        setTimePicker(
          <View>
            <Typography variant={"error"}>{errorMessage}</Typography>
          </View>
        );
      });
    }
  }, [date]);

  React.useEffect(() => {
    if (time !== undefined) {
      setSubmit(
        <View style={{ backgroundColor: "rgba(0,0,0,0)" }}>
          <Input placeholder={"Any Notes?"} onChange={setNotes} value={notes} />
          <Button text={"Submit"} varient={"Login"} onPress={submitReservation} />
        </View>
      );
    }
  }, [time]);

  function renderDates(data: any) {
    const dateArray = data.map((d: string, index: number) => {
      let l = new Date(d);
      return (<Picker.Item key={index + 1} value={d} label={l.toDateString()} />);
    })
    dateArray.unshift(<Picker.Item key={0} value={""} label={"Please choose the date of your reservation."} />);
    setDatePicker(
      <Picker
        style={styles.picker}
        selectedValue={date}
        onValueChange={(itemValue, itemIndex) => {
          setTimePicker(<ActivityIndicator />)
          setSubmit(<View></View>)
          setTime(undefined);
          setDate(itemValue);
        }}>
        {dateArray}
      </Picker>
    );
  }

  function renderTimes(data: any) {
    const dateArray = data.map((d: string, index: number) => {
      let l = new Date(d);
      return (<Picker.Item key={index + 1} value={d} label={l.toTimeString().slice(0, 5)} />);
    })
    dateArray.unshift(<Picker.Item key={0} value={""} label={"Please choose the time of your reservation."} />);
    setTimePicker(
      <Picker
        style={styles.picker}
        selectedValue={time}
        onValueChange={(itemValue, itemIndex) => {
          setTime(itemValue)
        }}>
        {dateArray}
      </Picker>
    );
  }

  function submitReservation() {
    postReservation(token, time.toString(), guests, Notes).then((data: any) => {
      if (data) {
        setSubmit(<Typography variant={"h1"}>Your reservation was successful thank you!</Typography>)
      }
      else {
        setTimePicker(<View></View>)
        setDatePicker(<View></View>)
        setSubmit(<Typography variant={"error"}>{errorMessage}</Typography>)
      }
    })
  }

  return (
    <GlassView>
      <Text style={styles.title}>Make a Reservation</Text>
      <View style={styles.separator} lightColor="#000" darkColor="#000" />
      <View style={{ backgroundColor: "rgba(0,0,0,0)" }}>
        <Picker
          style={styles.picker}
          selectedValue={guests}
          onValueChange={(itemValue: number, itemIndex) => {
            setTimePicker(<View></View>);
            setSubmit(<View></View>);
            setTime(undefined);
            setDate(undefined);
            setDatePicker(<ActivityIndicator />)
            setGuests(itemValue)
          }}>
          {guestArray}
        </Picker>
        {datePicker}
        {timePicker}
        {submit}
      </View>
    </GlassView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  picker: {
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center',
  }
});