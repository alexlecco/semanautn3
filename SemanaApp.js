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
  const { talkInfoVisible, logged } = state;
  const colorScheme = useColorScheme();
  const talksRef = firebaseApp.database().ref().child('talks').orderByChild('time');
  const speakersRef = firebaseApp.database().ref().child('speakers');
  const userTalksRef = firebaseApp.database().ref().child('userTalks');

  useEffect(() => {
    console.log("state.talk:::::::::", state.talk)
  }, [state])

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

  function getObjectOfArray(array, index) {
    return array[index] = array[index] || {};
  }
  
  useEffect(() => {
    let talksMon = [];
    let talksTue = [];
    let talksWed = [];
    let talksThu = [];
    let talksFri = [];
    let talks = [];
    let speakers = [];
    let userTalks = [];
    let userTalksSorted = [];
    function listenForDatabase() {

      talksRef.on('value', snap => {
        snap.forEach(child => {
          if (child.val()) {
            talks.push({
              day: child.val().day,
              id: child.val().id,
              time: child.val().time,
              title: child.val().title,
              description: child.val().description,
              site: child.val().site,
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
              site: child.val().site,
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
          if (child.val().photo) {
            speakers.push({
              name: child.val().name,
              bio: child.val().bio,
              photo: child.val().photo,
              degree: child.val().degree,
              id: child.val().id,
              _key: child.key,
            })
          } else {
            speakers.push({
              name: child.val().name,
              bio: child.val().bio,
              degree: child.val().degree,
              id: child.val().id,
              _key: child.key,
            })
          }
        });
      });

      userTalksRef.on('value', snap => {
        snap.forEach((child) => {
          userTalks.push({
            user: child.val().user,
            talk: child.val().talk,
            _key: child.key,
          });
        });
  
        userTalksSorted = userTalks;
  
        let talksSorted = [];
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
        talksSorted.forEach(talk => {
          userTalksSorted.push({
            user: state.loggedUser.uid,
            talk: talk._key,
          });
        });
      });
    }

    calculateImgSize(300, 300);
    listenForDatabase();
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user !== null) {
        addUser(user);

        setState({
          ...state,
          talksMon,
          talksTue,
          talksWed,
          talksThu,
          talksFri,
          talks,
          speakers,
          userTalks: userTalksSorted,
          logged: true,
          loggedUser: {
            displayName: user.displayName,
            uid: user.uid,
          }
        })
      }
    })
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
        console.log("Login Exitoso!");

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