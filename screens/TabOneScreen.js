import React from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';

import { Container, Tab, Tabs, TabHeading, } from 'native-base';

import { Text, View } from '../components/Themed';
import TalkCard from '../components/TalkCard';
import sites from '../constants/sites';

const TALKS = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    description: 'En el marco de la Semana de la  Ingeniería 2019 se desarrollará',
    time: '09:00',
    day: 'monday',
    site: 'site01',
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    description: 'En el marco de la Semana de la  Ingeniería 2019 se desarrollará',
    time: '19:00',
    day: 'tuesday',
    site: 'site02',
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    description: 'En el marco de la Semana de la  Ingeniería 2019 se desarrollará',
    time: '23:00',
    day: 'monday',
    site: 'site03',
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const days = ['lun', 'mar', 'mie', 'jue', 'vie'];

//Calendario
const TabOneScreen = () => {
  const renderTimeYesOrNo = (talk) => (
      <TalkCard
        talk={talk}
        sites={sites}
        showOrHideTalkInfo={() => {}}
        renderTime={() => {}}
        backTo={() => {}}
      />
  )

  return (
    <View style={styles.container}>
      <Container>
        <SafeAreaView style={styles.container}>
          <Tabs>
            {
              days.map(day => (
                <Tab heading={<TabHeading><Text>{day}</Text></TabHeading> }>
                  <FlatList
                    data={TALKS}
                    renderItem={renderTimeYesOrNo}
                    keyExtractor={(talk) => talk.id}
                  />
                </Tab>
              ))
            }
          </Tabs>
        </SafeAreaView>
      </Container>
    </View>
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

export default TabOneScreen;