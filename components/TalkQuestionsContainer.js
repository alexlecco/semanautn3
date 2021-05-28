import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, FlatList, Text, StatusBar } from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Icon,
  Title,
  Content,
  Button,
} from 'native-base';
import Constants from 'expo-constants';

// helpers
import firebaseApp from '../firebase/firebase';
import { AppContext } from '../context/provider';
import useColorScheme from '../hooks/useColorScheme';

// constants
import Colors from '../constants/Colors';

const TalkQuestionContainer = () => {
  const colorScheme = useColorScheme();
  const [ talkQuestions, setTalkQuestions ] = useState([]);
  const [ users, setUsers ] = useState([]);
  const [ state, setState ] = useContext(AppContext);
  const { talk } = state;
  const message = 'Aún no hay preguntas registradas en este evento';

  useEffect(() => {    
    const listenForTalkQuestions = () => {
      const talkQuestionsRef = firebaseApp.database().ref().child('questions');
      talkQuestionsRef.on('value', (snap) => {
        let talkQuestions = [];
  
        snap.forEach((child) => {
          if(child.val().talk === talk.id) {
            talkQuestions.push({
              body: child.val().body,
              talk: child.val().talk,
              user: child.val().user,
              _key: child.key,
            });
          }
        });
  
        setTalkQuestions(talkQuestions);
      });
    }
    
    const listenForUsers = () => {
      const usersRef = firebaseApp.database().ref().child('mobileUsers');
      usersRef.on('value', (snap) => {
        var users = [];
        
        snap.forEach((child) => {
          users.push({
            name: child.val().name,
            userId: child.val().userId,
            _key: child.val().userId,
          });
        });
  
        setUsers(users)
      });
    }

    listenForTalkQuestions();
    listenForUsers();
  }, [])

  const hideTalkQuestionsContainer = () => {
    setState({
      ...state,
      talkQuestionsContainerVisible: false
    })
  };

  const getObjectOfArray = (array, index) => {
    return array[index] = array[index] || {};
  }

  return (
    <Container style={{flex: 1, paddingTop: Constants.statusBarHeight, backgroundColor: Colors[colorScheme].background,}}>
      <Header style={{backgroundColor: Colors[colorScheme].tint}}>
        <Left>
          <Button transparent onPress={hideTalkQuestionsContainer}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title> Preguntas de la charla: </Title>
        </Body>
      </Header>
      <View style={styles.container}>
        <Text style={{textAlign: 'center', color: Colors[colorScheme].talkCardText, fontSize: 20, marginBottom: 10, marginTop: 7 }}> { talk.title } </Text>

        <Content padder>
        {
          talkQuestions.length === 0 ?
            <View style={styles.empty}>
              <Text style={styles.emptyText}> { message } </Text>
            </View>
          :
            <FlatList
              data={talkQuestions}
              renderItem={talkQuestion => <TalkQuestion talkQuestion={talkQuestion} users={users} /> }
            />
        }
        </Content>
      </View>
      <StatusBar backgroundColor={Colors[colorScheme].tint} />
    </Container>
  )
}

const styles = StyleSheet.create({
  feedbackButtonContainer: {
    margin: 25,
  },
  feedbackButtonText: {
    flex: 1,
    textAlign: 'center',
  },
  centerText: {
    textAlign: 'center',
    color: 'blue',
  },
  boldText: {
    fontWeight: 'bold',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
  },
  emptyText: {
    textAlign: 'center',
    color: 'black',
  },
})

export default TalkQuestionContainer
