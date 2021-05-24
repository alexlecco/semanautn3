// libraries
import React, { useState, useContext } from 'react';
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
  Roboto_500Medium
} from '@expo-google-fonts/roboto';

// helpers
import { AppContext } from '../context/provider';

const TalkInfo = _ => {
  let [ fontsLoaded ] = useFonts({ Roboto_500Medium });
  const [ state, setState ] = useContext(AppContext)
  const { talk, speakers } = state;
  const [ buttonText, setButtonText ] = useState('me interesa');

  const getSpeakerPhoto = photo => {
    return `https://firebasestorage.googleapis.com/v0/b/semana-utn-c9f91.appspot.com/o/speakers%2F${photo}.png?alt=media`
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

  const showOrHideTalkInfo = () => {
    setState({
      ...state,
      talk: {},
      talkInfoVisible: false,
    })
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
          <View style={styles.speakerContainer}>
            <View style={styles.TalkSpeakerContainer}>
              <Text style={styles.TalkSpeaker}>
              {
                talk.speaker ?
                  `${speaker.name}` : ""
              }
              </Text>
            </View>
            <View>
              {
                speaker.photo ?
                  <Image
                    source={{uri: getSpeakerPhoto(speaker.photo)}}
                    style={{height: 200, width: null, flex: 1}}
                    style={styles.infoImage} />
                :
                  null
              }
            </View>
            <View style={styles.TalkSpeakerBioContainer}>
              <Text style={styles.TalkSpeakerBio}>
                {
                  speaker.bio ?
                    speaker.bio : ""
                }
              </Text>
            </View>
          </View>
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
        buttonText == 'Ya no me interesa' ?
        (
        <Button full style={styles.buttonColor}
                onPress={() => {}} >
          <Text>
            Hacer una pregunta
          </Text>
        </Button>
        ) : <View />
      }
      
      <View style={styles.buttonsSeparator}></View>
      <Button full style={buttonText == 'Me interesa' ? styles.buttonColor : styles.buttonColor2}
              onPress={() => {}} >
        <Text style={buttonText == 'Ya no me interesa' ? styles.buttonText : false }>
          { `${buttonText}` }
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
    backgroundColor: '#fff',
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