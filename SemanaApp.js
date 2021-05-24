// libraries
import React, { useContext, useEffect } from 'react';

// components
import Navigation from './navigation/Navigation';
import TalkInfo from './components/TalkInfo';

// custom hooks
import useColorScheme from './hooks/useColorScheme';

// helpers
import { AppContext } from './context/provider'
import firebaseApp from './firebase/firebase';

const SemanaApp = _ => {
  const [state, setState] = useContext(AppContext);
  const { talkInfoVisible } = state;
  const colorScheme = useColorScheme();
  const talksRef = firebaseApp.database().ref().child('talks').orderByChild('time');
  const speakersRef = firebaseApp.database().ref().child('speakers');

  useEffect(() => {
    function listenForDatabase() {      
      let talksMon = [];
      let talksTue = [];
      let talksWed = [];
      let talksThu = [];
      let talksFri = [];
      let talks = [];
      let speakers = [];

      talksRef.on('value', snap => {
        snap.forEach(child => {
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
          speakers.push({
            name: child.val().name,
            bio: child.val().bio,
            photo: child.val().photo,
            degree: child.val().degree,
            id: child.val().id,
            _key: child.key,
          })
        });
      });

      setState({
        ...state,
        talksMon,
        talksTue,
        talksWed,
        talksThu,
        talksFri,
        talks,
        speakers,
      })
    }

    listenForDatabase();
  }, [])

  return(
    talkInfoVisible ?
      <TalkInfo />
    :
      <Navigation colorScheme={colorScheme} />
  )
}

export default SemanaApp;