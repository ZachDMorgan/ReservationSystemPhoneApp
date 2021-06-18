import * as React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { getStorage, clearStorage, saveToken } from '../services/storage'
import { Text, View } from '../components/Themed';
import { getToken, checkValid } from '../services/token';
import { Typography, Button, Input, GlassView } from '../components'


export default function HomeScreen(props: any) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState('');

  function Login() {
    if (email !== "" && password !== "") {
      setLoading(true);
      getToken(email, password).then(response => {
        return response.data;
      }).then((data: any) => {
        if (data.length == 0) {
          setErrors('Unknown error');
          setLoading(false);
        }
        else {
          saveToken(data);
          setLoading(false);
          setErrors('')
          props.navigation.replace('Home')
        }
      }).catch(error => {
        setErrors('Email or Password was not valid. Please type a valid email and password');
        setLoading(false);
      });
    }
    else {
      setErrors('Email or Password is empty. Please type a valid email and password');
    }
  }

  React.useEffect(() => {
    getStorage().then((value: string | null) => {
      if (value !== null) {
        checkValid(value).then(response => {
          return response.data
        }).then((data: any) => {
          if (data === true) {
            props.navigation.replace('Home')
          }
          else {
            clearStorage()
          }
        }).catch(error => clearStorage());
      }
    });
  }, [])
  return (

    <GlassView>
      <Text style={styles.title}>Crocodile Dilemma</Text>
      <Text style={styles.subTitle}>Login</Text>
      <View style={styles.separator} lightColor="#000" darkColor="#000" />
      <View style={{ backgroundColor: "rgba(0,0,0,0)" }}>
        <Input placeholder={"Email"} value={email} onChange={setEmail} />
        <Input placeholder={"Password"} value={password} onChange={setPassword} />
        <Button text={"Login"} onPress={Login} varient={"Login"} />
        {(errors === '') ? <View></View> : <Typography variant={"error"}>{errors}</Typography>}
        {loading ? <ActivityIndicator /> : <View></View>}
      </View>
    </GlassView>

  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    margin: 3
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
