import React, { useState, useContext } from 'react'
import { View, StyleSheet, TextInput, Alert, Text, StatusBar, } from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Icon,
  Title,
  Content,
  Button,
  Form,
} from 'native-base';
import Constants from 'expo-constants';

// helpers
import { AppContext } from '../context/provider';
import firebaseApp from '../firebase/firebase';
import useColorScheme from '../hooks/useColorScheme';

// constants
import Colors from '../constants/Colors';

const MakeTalkQuestion = () => {
  const colorScheme = useColorScheme();
  const [ body, setBody ] = useState('');
  const [ state, setState ] = useContext(AppContext);
  const { talk, loggedUser } = state;

  const sendTalkQuestion = () => {
    try {
      if(body !== '') {
        firebaseApp.database().ref().child('questions').push({
          body: body,
          user: loggedUser.uid,
          talk: talk.id,
        }).key;
    
        setBody('');
        Alert.alert('¡Gracias por tu participación!', 'Tu pregunta se envió correctamente');
        hideMakeTalkQuestions();
      } else {
        Alert.alert('¡Error!', 'intentaste enviar una pregunta vacía');
      }
    } catch ({ message }) {
      alert(`Se produjo un error: ${message}`);
    }
  }

  const hideMakeTalkQuestions = () => {
    setState({
      ...state,
      makeTalkQuestionVisible: false
    })
  }

  return(
    <Container style={{flex: 1, paddingTop: Constants.statusBarHeight, backgroundColor: Colors[colorScheme].background,}}>
      <Header style={{backgroundColor: Colors[colorScheme].tint}}>
        <Left>
          <Button transparent onPress={() => hideMakeTalkQuestions()}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title style={{color: Colors[colorScheme].background}}> Hacer una pregunta </Title>
        </Body>
      </Header>
      
      <View style={{ flex: 1, paddingTop: 0, backgroundColor: Colors[colorScheme].background, }}>
        <Text style={{ textAlign: 'center', color: Colors[colorScheme].talkCardText, fontSize: 20, marginBottom: 10, marginTop: 7 }}>{ talk.title } </Text>
        <Text style={styles.centerText}>
          Estás por escribir una pregunta que aparecerá en pantalla gigante <Text style={{fontWeight: 'bold', color: Colors[colorScheme].text,}}>junto a tu nombre de usuario</Text>, queremos escucharte:
        </Text>

        <Content padder>
          <Form>
            <TextInput
              multiline={true}
              style={{color: Colors[colorScheme].talkCardText, fontSize: 18}}
              numberOfLines={4}
              placeholder="[tocá aquí para escribir tu pregunta]"
              value={body}
              onChangeText={text => setState(text)} />
          </Form>
        </Content>

        <View style={styles.feedbackButtonContainer}>
          <Button full style={{backgroundColor: Colors[colorScheme].tint}} onPress={sendTalkQuestion} >
            <Text>
              Enviar pregunta
            </Text>
          </Button>
        </View>
      </View>
      <StatusBar backgroundColor={Colors[colorScheme].tint} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  feedbackButtonContainer: {
    margin: 25,
  },
  feedbackButtonText: {
    flex: 1,
    textAlign: 'center',
  },
});

export default MakeTalkQuestion;