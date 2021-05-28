import React, { useState, useContext } from 'react'
import { View, StyleSheet, TextInput, Alert, Text, } from 'react-native';
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

// helpers
import { AppContext } from '../context/provider';
import firebaseApp from '../firebase/firebase';

// constants
import colors from '../constants/Colors';

const MakeTalkQuestion = () => {
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

  return(
    <Container>
      <Header style={{backgroundColor: colors.colors.light}}>
        <Left>
          <Button transparent onPress={() => hideMakeTalkQuestions()}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title style={{color: colors.colors.white}}> Hacer una pregunta </Title>
        </Body>
      </Header>
      
      <View style={styles.container}>
        <Text style={[styles.centerText, { fontSize: 20, marginBottom: 10, marginTop: 7 }]}>{ talk.title } </Text>
        <Text style={styles.centerText}>
          Estás por escribir una pregunta que aparecerá en pantalla gigante <Text style={styles.boldText}>junto a tu nombre de usuario</Text>, queremos escucharte:
        </Text>

        <Content padder>
          <Form>
            <TextInput
              multiline={true}
              style={{color: colors.colors.text1, fontSize: 18}}
              numberOfLines={4}
              placeholder="[tocá aquí para escribir tu pregunta]"
              value={body}
              onChangeText={text => setState(text)} />
          </Form>
        </Content>

        <View style={styles.feedbackButtonContainer}>
          <Button full style={{backgroundColor: colors.colors.light}} onPress={sendTalkQuestion} >
            <Text>
              Enviar pregunta
            </Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: colors.colors.dark,
    paddingLeft: 10,
    paddingRight: 10,
  },
  feedbackButtonContainer: {
    margin: 25,
  },
  feedbackButtonText: {
    flex: 1,
    textAlign: 'center',
  },
  centerText: {
    textAlign: 'center',
    color: colors.colors.text1,
  },
  boldText: {
    fontWeight: 'bold',
    color: colors.colors.text2,
  }
});

export default MakeTalkQuestion;