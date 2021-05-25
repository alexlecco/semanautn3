// libraries
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Image, } from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Icon,
  Title,
  Content,
  Button,
  Text,
} from 'native-base';
import {
  useFonts,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto';

// helpers
import { AppContext } from '../context/provider';
import firebaseApp from '../firebase/firebase';

const TalkInfo = _ => {
  let [ fontsLoaded ] = useFonts({ Roboto_500Medium });
  const [ state, setState ] = useContext(AppContext)
  const { talk, speakers, loggedUser, userTalks } = state;
  const [ buttonText, setButtonText ] = useState('');

  const getSpeakerPhoto = photo => {
    if (photo) {
      return `https://firebasestorage.googleapis.com/v0/b/semana-utn-c9f91.appspot.com/o/speakers%2F${photo}.png?alt=media`
    } else {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imagen_no_disponible.svg/1200px-Imagen_no_disponible.svg.png'
    }
  }

  const getSpeaker = (speakers, speakerId) => (
    speakers.filter(sp => sp.id === speakerId)[0]
  )
  
  const speaker = getSpeaker(speakers, talk.speaker)

  let day = talk.day;
  let dayToShow = '';
  switch(day) {
    case 'monday':
      dayToShow = 'lunes';
      break;
    case 'tuesday':
      dayToShow = 'martes';
      break;
    case 'wednesday':
      dayToShow = 'miercoles';
      break;
    case 'thursday':
      dayToShow = 'jueves';
      break;
    case 'friday':
      dayToShow = 'viernes';
      break;
    case 'saturday':
      dayToShow = 'sabado';
      break;
  }

  const askButtonText = (loggedUser, talk) => {
    let text = 'Me interesa';

    firebaseApp.database().ref().child('userTalks')
      .orderByChild('user')
      .equalTo(loggedUser.uid)
      .on('child_added', snap => {
        const userTalk = snap.val();
        if(userTalk.talk === talk._key) {
          text = 'Ya no me interesa';
        }
      });

    text === 'Ya no me interesa' ?
      setButtonText('Ya no me interesa') :
      setButtonText('Me interesa')
  }
  
  useEffect(() => {
    askButtonText(loggedUser, talk);
  }, [])

  const showOrHideTalkInfo = () => {
    setState({
      ...state,
      talk: {},
      talkInfoVisible: false,
    })
  }

  const getObjectOfArray = (array, index) => {
    return array[index] = array[index] || {};
  }

  const addOrRemoveUserTalk = () => {
    let text = 'Me interesa';

    if(buttonText === 'Ya no me interesa') {
      firebaseApp.database().ref().child('userTalks')
        .orderByChild('user')
        .equalTo(loggedUser.uid)
        .once('value', snap => {
          let userTalks = [];
          snap.forEach(child => {
            userTalks.push({
              user: child.val().user,
              talk: child.val().talk,
              _key: child.key,
            })
          });

          let userTalk = ''
          for(let i = userTalks.length; i >= 0 ; i-- ) {
            if (getObjectOfArray(userTalks, i).talk === talk._key) {
              userTalk = userTalks[i];
            }
          }

          let keyToRemove = ''
          if(userTalk.talk === talk._key) {
            text = 'Me interesa';
            keyToRemove = ''
            snap.forEach((child) => {
              if(child.child('talk').val() === userTalk.talk) {
                keyToRemove = child.key
              }
            });
          }

          snap.ref.child(keyToRemove).remove();
        })
    } else {
      text = 'Ya no me interesa';

      firebaseApp.database().ref().child('userTalks').push({
        user: loggedUser.uid,
        talk: talk._key,
      }).key;

      let userTalksSorted = userTalks;
      userTalksSorted.push({
        user: loggedUser.uid,
        talk: talk._key,
      });

      let talksSorted = [];
      userTalksSorted.forEach((talk) => {
        for(let i = userTalksSorted.length; i > 0; i--) {
          if(talk._key === getObjectOfArray(userTalksSorted, i - 1).talk) {
            talksSorted.push({
              _key: talk._key,
            })
          }
        }
      });

      userTalksSorted = [];
      talksSorted.forEach((talk) => {
        userTalksSorted.push({
          user: loggedUser.uid,
          talk: talk._key,
        });
      });

      setState({
        ...state,
        userTalks: userTalksSorted,
      });
    }

    text === 'Me interesa' ?
      setButtonText('Me interesa')
    :
      setButtonText('Ya no me interesa')
  }

  if (!fontsLoaded) {
    return null
  }

  return(
    <Container style={styles.container}>
      <Header>
        <Left>
          <Button transparent onPress={() => showOrHideTalkInfo()}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title> { dayToShow } - { talk.time } </Title>
        </Body>
      </Header>
      <Content style={styles.dark}>
        <View style={styles.TalkContainer}>
          <View style={styles.TalkTitleContainer}>
            <Text style={styles.TalkTitle}>{ talk.title }</Text>
          </View>
          <View style={styles.TalkBodyContainer}>
            <Text style={styles.TalkBody}>{ talk.description }</Text>
          </View>
          {
            !!talk.speaker &&
              <View style={styles.speakerContainer}>
                <View style={styles.TalkSpeakerContainer}>
                  <Text style={styles.TalkSpeaker}>
                  {
                    (talk.speaker && talk.speaker.name !== undefined) ?
                      speaker.name : ""
                  }
                  </Text>
                </View>
                {
                  speaker.photo ?
                    <View>
                      <Image
                        source={{uri: getSpeakerPhoto(speaker.photo)}}
                        style={{height: 200, width: null, flex: 1}}
                        style={styles.infoImage}
                      />
                    </View>
                  : <Text>""</Text>
                }
              <View style={styles.TalkSpeakerBioContainer}>
                <Text style={styles.TalkSpeakerBio}>
                  {
                    speaker.bio ?
                      speaker.bio : ""
                  }
                </Text>
              </View>
            </View>
          }
        </View>

        <View style={styles.dark}>
          <Button transparent full primary onPress={() => {}} >
            <Text style={{color: '#ffaf19'}}>
              Compartir
            </Text>
          </Button>
          <Button transparent full primary onPress={() => {}} >
            <Text style={{color: '#ffaf19'}}>
              Ver las preguntas de la charla
            </Text>
          </Button>
        </View>
      </Content>

      {
        buttonText === 'Ya no me interesa' ? (
          <Button
            full
            style={styles.buttonColor}
            onPress={() => {}}
          >
            <Text> Hacer una pregunta </Text>
          </Button>
          ) : (
            null
          )
      }
      
      <View style={styles.buttonsSeparator}></View>
      <Button
        full
        style={buttonText === 'Me interesa' ? styles.buttonColor : styles.buttonColor2}
        onPress={addOrRemoveUserTalk}
      >
        <Text style={buttonText === 'Ya no me interesa' ? styles.buttonText : false }>
          {buttonText}
        </Text>
      </Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 33 //to fix
  },
  TalkContainer: {
    flexDirection: 'column',
    backgroundColor: '#000',
    flex: 1,
  },
	TalkTitleContainer: {
		marginTop: 10,
		marginRight: 15,
		marginLeft: 15,
    marginTop: 10,
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
	TalkBodyContainer: {
		marginTop: 10,
		marginRight: 15,
		marginLeft: 15,
    marginTop: 10,
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
  TalkSpeakerContainer: {
		marginTop: 10,
		marginRight: 15,
		marginLeft: 15,
    marginTop: 10,
		flexWrap: 'wrap',
		flexDirection: 'row',
  },
  TalkMapContainer: {
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
  },
  TalkTitle: {
		fontSize: 20,
    color: '#ffaf19',
	},
  TalkBody: {
		fontSize: 17,
    color: '#d2d3d5',
	},
  TalkSpeaker: {
    fontSize: 17,
    color: '#ffaf19',
    textAlign: 'center',
  },
  TalkSpeakerBio: {
    fontSize: 17,
    color: '#d2d3d5',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  TalkSpeakerBioContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  infoImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  speakerContainer: {
    justifyContent:'center',
    alignItems:'center',
    margin: 10,
  },
  shareContainer: {
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 25,
    marginTop: 10,
  },
  shareText: {
    color: '#fff',
  },
  buttonText: {
    color: '#ffaf19',
  },
  buttonColor: {
    backgroundColor: '#000',
  },
  buttonColor2: {
    backgroundColor: '#000',
  },
  buttonsSeparator: {
    backgroundColor: '#000',
    height: 10,
  },
  dark: {
    backgroundColor: '#000',
  }
});

export default TalkInfo;