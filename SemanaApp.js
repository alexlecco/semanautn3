// libraries
import React, { useState, useEffect, useContext, } from 'react';
import { Container, Button, Text } from 'native-base';
import * as Facebook from 'expo-facebook';
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
  Alert,
} from 'react-native';

// components
import Navigation from './navigation/Navigation';
import TalkInfo from './components/TalkInfo';

// custom hooks
import useColorScheme from './hooks/useColorScheme';

// helpers
import { AppContext } from './context/provider'
import firebaseApp from './firebase/firebase';
import texts from './constants/texts';

const SemanaApp = _ => {
  const [state, setState] = useContext(AppContext);
  const [imgHeight, setImgHeight] = useState(0)
  const [imgWidth, setImgWidth] = useState(0)
  const { talkInfoVisible, logged, loggedUser } = state;
  const colorScheme = useColorScheme();
  const talksRef = firebaseApp.database().ref().child('talks').orderByChild('time');
  const speakersRef = firebaseApp.database().ref().child('speakers');

  const getLoginScreen = () => texts.loginScreenUrl

  const calculateImgSize = _ => {
    Image.getSize(getLoginScreen(), (width, height) => {
      const screenWidth = Dimensions.get('window').width;
      const scaleFactor = width / screenWidth;
      const imageHeight = height / scaleFactor;
      setImgWidth(screenWidth);
      setImgHeight(imageHeight);
    })
  }

  const addUser = (loggedUser) => {
    let ref =  firebaseApp.database().ref();
    let mobileUsersRef = ref.child('mobileUsers');
    mobileUsersRef.child(loggedUser.uid).set({
      name: loggedUser.displayName,
      userId: loggedUser.uid,
    }).key;
  }
  
  useEffect(() => {
    let talksMon = [];
    let talksTue = [];
    let talksWed = [];
    let talksThu = [];
    let talksFri = [];
    let talks = [];
    let speakers = [];

    function listenForDatabase() {
      firebaseApp.auth().onAuthStateChanged(user => {
        addUser(user);

        talksRef.on('value', snap => {
          snap.forEach(child => {
            if (!!child.val().speaker) {
              talks.push({
                day: child.val().day,
                id: child.val().id,
                time: child.val().time,
                title: child.val().title,
                description: child.val().description,
                speaker: child.val().speaker,
                _key: child.key,
              });
            } else {
              talks.push({
                day: child.val().day,
                id: child.val().id,
                time: child.val().time,
                title: child.val().title,
                description: child.val().description,
                _key: child.key,
              });
            }
  
            switch(child.val().day){
              case 'monday':
                talksMon.push({
                  day: child.val().day,
                  id: child.val().id,
                  time: child.val().time,
                  title: child.val().title,
                  description: child.val().description,
                  site: child.val().site,
                  speaker: child.val().speaker,
                  _key: child.key,
                });
                break;
              case 'tuesday':
                talksTue.push({
                  day: child.val().day,
                  id: child.val().id,
                  time: child.val().time,
                  title: child.val().title,
                  description: child.val().description,
                  site: child.val().site,
                  speaker: child.val().speaker,
                  _key: child.key,
                });
                break;
              case 'wednesday':
                talksWed.push({
                  day: child.val().day,
                  id: child.val().id,
                  time: child.val().time,
                  title: child.val().title,
                  description: child.val().description,
                  site: child.val().site,
                  speaker: child.val().speaker,
                  _key: child.key,
                });
                break;
              case 'thursday':
                talksThu.push({
                  day: child.val().day,
                  id: child.val().id,
                  time: child.val().time,
                  title: child.val().title,
                  description: child.val().description,
                  site: child.val().site,
                  speaker: child.val().speaker,
                  _key: child.key,
                });
                break;
              case 'friday':
                talksFri.push({
                  day: child.val().day,
                  id: child.val().id,
                  time: child.val().time,
                  title: child.val().title,
                  description: child.val().description,
                  site: child.val().site,
                  speaker: child.val().speaker,
                  _key: child.key,
                });
                break;
              }
          });
        });
  
        speakersRef.on('value', snap => {
          snap.forEach(child => {
            if (!!child.val().photo) {
              speakers.push({
                name: child.val().name,
                photo: child.val().photo,
                id: child.val().id,
                _key: child.key,
              })
            } else {
              speakers.push({
                name: child.val().name,
                id: child.val().id,
                _key: child.key,
              })
            }
          });
        });
        
        setState({
          ...state,
          logged: true,
          loggedUser: {
            displayName: user.displayName,
            uid: user.uid,
          },
          talksMon,
          talksTue,
          talksWed,
          talksThu,
          talksFri,
          talks,
          speakers,
        })
      })      
    }
    
    calculateImgSize(300, 300);
    listenForDatabase();
  }, []);

  const logIn = async() => {
    try {
      await Facebook.initializeAsync({
        appId: '599546973887572',
      });
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        const credential = firebaseApp.auth.FacebookAuthProvider.credential(token);
        firebaseApp.auth().signInWithCredential(credential).catch(error => console.log(error));

        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert(
          '¡Ingresaste correctamente!',
          `Hola ${(await response.json()).name}!, gracias por participar de la semana de la ingeniería 2021`
        );
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Error de Login: ${message}`);
    }
  }
  
  if (logged) {
    if (talkInfoVisible) {
      return(
        <TalkInfo />
        )
    } else {
      return(
        <Navigation colorScheme={colorScheme} />
        )
      }
    } else {
      return(
        <Container>
          <View style={styles.container}>      
            <ImageBackground
              source={require('./assets/images/login.png')}
              style={{width: imgWidth, height: imgHeight}}
            >
              <View style={styles.loginContainer}>
                <Button full block onPress={ logIn }>
                  <Text>{texts.loginText}</Text>
                </Button>
              </View>
            </ImageBackground>
          </View>
        </Container>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: '#fff',
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
    marginBottom: 75,
  },
});

export default SemanaApp;