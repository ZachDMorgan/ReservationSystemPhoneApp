import * as React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { getName } from '../services/token';
import { getStorage, clearStorage } from '../services/storage'
import { Typography, Button, GlassView } from '../components'
import { Text, View } from '../components/Themed';

export default function HomeScreen(props: any) {
  const [name, setName] = React.useState("");
  const [token, setToken] = React.useState("");

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
    if (token !== "") {
      getName(token).then(response => {
        return response.data;
      }).then((data: string) => setName(data)
      );
    }
  }, [token])

  function Logout() {
    clearStorage();
    props.navigation.replace('Login')
  };

  return (
    <GlassView>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subTitle}>Welcome {name}!</Text>
      <View style={styles.separator} lightColor="#000" darkColor="#000" />
      <Button text={"Logout"} onPress={Logout} varient={"Login"} />
      <View style={styles.separator} lightColor="#000" darkColor="#000" />
      <View style={{ backgroundColor: "rgba(0,0,0,0)" }}>
        <Text style={styles.help}>If you have any issues please contact us straight away at: </Text>
        <View style={{ backgroundColor: "rgba(0,0,0,0)", padding:3 }}>
          <Text style={styles.help}> - Email: contact@crocodiledilemma.com.au</Text>
          <Text style={styles.help}> - Phone: 9876 5432</Text>
        </View>
      </View>
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
  help: {
    padding: 3,
    fontSize: 12,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
