// libraries
import React, {useState, useEffect, useContext} from 'react';
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Tab, Tabs, TabHeading, DefaultTabBar } from 'native-base';

// components
import TalkCard from '../components/TalkCard';
import { Text, View } from '../components/Themed';

// helpers
import { AppContext } from '../context/provider';
import useColorScheme from '../hooks/useColorScheme';
import firebaseApp from '../firebase/firebase';

// constants
const days = ['lun', 'mar', 'mie', 'jue', 'vie'];
import Colors from '../constants/Colors';

//Mis charlas
const TabTwoScreen = _ => {
  const [ state, setState ] = useContext(AppContext);
  const { talks, userTalks, loggedUser } = state;
  const colorScheme = useColorScheme();
  const [ userTalksMon, setUserTalksMon ] = useState([]);
  const [ userTalksTue, setUserTalksTue ] = useState([]);
  const [ userTalksWed, setUserTalksWed ] = useState([]);
  const [ userTalksThu, setUserTalksThu ] = useState([]);
  const [ userTalksFri, setUserTalksFri ] = useState([]);

  const getObjectOfArray = (array, index) => {
    return array[index] = array[index] || {};
  }

  useEffect(() => {
    let userTalks = [];
    let userTalksSorted = [];

    const userTalksRef = firebaseApp.database().ref().child('userTalks').orderByChild('user').equalTo(loggedUser.uid);
    userTalksRef.on('value', snap => {
      snap.forEach(child => {
        userTalks.push({
          user: child.val().user,
          talk: child.val().talk,
          _key: child.key,
        });
      });

      userTalksSorted = userTalks;

      let talksSorted = []
      talks.forEach(talk => {
        for(let i = userTalksSorted.length; i > 0; i--) {
          if(talk._key == getObjectOfArray(userTalksSorted, i - 1).talk) {
            talksSorted.push({
              _key: talk._key,
            })
          }
        }
      });

      userTalksSorted = [];
      talksSorted.forEach(talkSorted => {
        userTalksSorted.push({
          user: loggedUser.uid,
          talk: talkSorted._key,
        })
      })
    });

    setState({
      ...state,
      userTalks,
    })
  }, [])

  useEffect(() => {
    const readUserTalksByDay = () => {
      let arrayUserTalksMon = [];
      let arrayUserTalksTue = [];
      let arrayUserTalksWed = [];
      let arrayUserTalksThu = [];
      let arrayUserTalksFri = [];
  
      for (let i = 0; i < talks.length ; i++) {
        for (let j = 0; j < userTalks.length; j++) {
          if(talks[i]._key == userTalks[j].talk) {
            switch(talks[i].day) {
              case 'monday':
                arrayUserTalksMon.push(talks[i]);
                break;
              case 'tuesday':
                arrayUserTalksTue.push(talks[i]);
                break;
              case 'wednesday':
                arrayUserTalksWed.push(talks[i]);
                break;
              case 'thursday':
                arrayUserTalksThu.push(talks[i]);
                break;
              case 'friday':
                arrayUserTalksFri.push(talks[i]);
                break;
            }
          }
        }
      }
      setUserTalksMon(arrayUserTalksMon);
      setUserTalksTue(arrayUserTalksTue);
      setUserTalksWed(arrayUserTalksWed);
      setUserTalksThu(arrayUserTalksThu);
      setUserTalksFri(arrayUserTalksFri);
    }

    readUserTalksByDay();
  }, [userTalks]);

  function getTalksArray(day) {
    if (day === 'lun') return userTalksMon
    if (day === 'mar') return userTalksTue
    if (day === 'mie') return userTalksWed
    if (day === 'jue') return userTalksThu
    if (day === 'vie') return userTalksFri
  }

  const renderTabBar = (props) => {
    props.tabStyle = Object.create(props.tabStyle);
    return <DefaultTabBar {...props} />;
  };

  const getDayName = day => {
    if (day === 'lun') return 'monday'
    if (day === 'mar') return 'tuesday'
    if (day === 'mie') return 'wednesday'
    if (day === 'jue') return 'thursday'
    if (day === 'vie') return 'friday'
  }

  const renderTimeYesOrNo = (userTalk, talks, day) => {
    let myTalk = talks.find(talk => talk._key === userTalk.item.talk);

    if(myTalk.day === getDayName(day)) {
      return(
        <TalkCard talk={myTalk} />
      )
    } else {
      return(
        <View />
      )
    }
  }

  const message = `Aún no tenés charlas o eventos
  agregados este día`;

  return(
    <View style={styles.container}>
      <Container>
        <SafeAreaView style={styles.container}>
          <Tabs renderTabBar={renderTabBar}>
            {
              days.map(day => (
                <Tab heading={<TabHeading style={{backgroundColor: Colors[colorScheme].tint}}><Text>{day}</Text></TabHeading>} key={day}>
                  {
                    getTalksArray(day).length !== 0 ?
                      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors[colorScheme].background,}}>
                        <FlatList
                          data={userTalks}
                          renderItem={userTalk => renderTimeYesOrNo(userTalk, talks, day) }
                          keyExtractor={userTalk => userTalk.talk}
                        />
                      </View>
                    :
                      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors[colorScheme].background,}}>
                        <Text style={{textAlign: 'center', color: Colors[colorScheme].talkCardText,}}>{message}</Text>
                      </View>
                  }
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

export default TabTwoScreen;