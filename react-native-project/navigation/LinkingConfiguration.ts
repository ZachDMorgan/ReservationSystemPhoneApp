/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Login:{
        screens:{
          Login:{
            screens:{
              LoginScreen: 'login'
            }
          }
        }
      },
      Home: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          ReservationList: {
            screens: {
              ReservationListScreen: 'reservation-list',
            },
          },
          MakeReservation: {
            screens: {
              MakeReservationScreen: 'reservation-make',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
