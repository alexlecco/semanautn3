// libraries
import React, { useContext } from 'react';
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Tab, Tabs, TabHeading, DefaultTabBar } from 'native-base';

// components
import TalkCard from '../components/TalkCard';
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

// helpers
import { Text, View } from '../components/Themed';
import { AppContext } from '../context/provider';

// constants
const days = ['lun', 'mar', 'mie', 'jue', 'vie'];

//Calendario
const TabOneScreen = _ => {
  const [ state ] = useContext(AppContext)
  const { talksMon, talksTue, talksWed, talksThu, talksFri } = state;

  const renderTalkCard = talk => <TalkCard talk={talk.item} />

  function getTalksArray(day) {
    if (day === 'lun') return talksMon
    if (day === 'mar') return talksTue
    if (day === 'mie') return talksWed
    if (day === 'jue') return talksThu
    if (day === 'vie') return talksFri
  }

  const renderTabBar = (props) => {
    props.tabStyle = Object.create(props.tabStyle);
    return <DefaultTabBar {...props} />;
  };
  
  return (
    <View style={styles.container}>
      <Container>
        <SafeAreaView style={styles.container}>
          <Tabs renderTabBar={renderTabBar}>
            {
              days.map(day => (
                <Tab heading={<TabHeading><Text>{day}</Text></TabHeading>} key={day}>
                  <View style={styles.empty}>
                    <FlatList
                      data={getTalksArray(day)}
                      renderItem={renderTalkCard}
                      keyExtractor={talk => talk._key}
                    />
                  </View>
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
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default TabOneScreen;