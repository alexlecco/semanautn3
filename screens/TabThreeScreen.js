// libraries
import * as React from 'react';
import { StyleSheet } from 'react-native';

// helpers
import texts from '../constants/texts'
import { Text, View } from '../components/Themed';

//Sponsors
const TabThreeScreen = _ => (
  <View style={styles.container}>
    <Text style={styles.title}>{texts.screens.title3}</Text>
  </View>
);

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

export default TabThreeScreen;