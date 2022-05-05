import React from 'react';
import {DatePickerAndroid, StyleSheet, Text, View} from 'react-native';

export default function Header() {
  const date = new Date();

  const days = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];
  const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre',
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{`${days[date.getDay()]} ${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 25,
  },
  date: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});
