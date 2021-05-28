import React, { useContext } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Container, Tab, Tabs, TabHeading, DefaultTabBar } from 'native-base';

// components
import TalkCard from '../components/TalkCard';
import { Text, View } from '../components/Themed';

// helpers
import { AppContext } from '../context/provider';
import useColorScheme from '../hooks/useColorScheme';

// constants
const days = ['lun', 'mar', 'mie', 'jue', 'vie'];
import Colors from '../constants/Colors';

//Calendario
const TabOneScreen = _ => {
  const [ state ] = useContext(AppContext)
  const { talksMon, talksTue, talksWed, talksThu, talksFri } = state;
  const colorScheme = useColorScheme();

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
                <Tab heading={<TabHeading style={{backgroundColor: Colors[colorScheme].tint}}><Text>{day}</Text></TabHeading>} key={day}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors[colorScheme].background,}}>
                    <FlatList
                      data={getTalksArray(day)}
                      renderItem={talk => <TalkCard talk={talk.item} />}
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
});

export default TabOneScreen;