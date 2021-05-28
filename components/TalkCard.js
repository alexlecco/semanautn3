import React, { useContext }  from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, } from 'react-native';

// helpers
import { AppContext } from '../context/provider';
import useColorScheme from '../hooks/useColorScheme';

// constants
import Colors from '../constants/Colors';

const TalkCard = ({ talk }) => {
  const [ state, setState ] = useContext(AppContext)
  const colorScheme = useColorScheme();

  const showTalkInfo = (talk) => {
    setState({
      ...state,
      talk: talk,
      talkInfoVisible: true,
    })
  }

  return(
    <TouchableWithoutFeedback
      onPress={() => showTalkInfo(talk)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors[colorScheme].palette2, }}>
        <View styke={styles.TalCardColumn}>
          <View style={styles.TalkTimeContainer}>
            <Text style={{ fontSize: 17, color: Colors[colorScheme].talkCardText, }}>{talk.time}</Text>
          </View>
        </View>

        <View style={styles.TalCardColumn}>
          <View style={styles.TalkTitleContainer}>
            <Text style={{ fontSize: 17, color: Colors[colorScheme].talkCardText, }}>{talk.title}</Text>
          </View>
        </View>
      </View>

    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
	TalCardColumn: {
    flexDirection: 'column',
	},
	TalkTimeContainer: {
		margin: 10,
  },
	TalkTitleContainer: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 10,
		marginTop: 10,
		marginRight: 10,
		flexWrap: 'wrap',
		flexDirection: 'row',
		width: Dimensions.get('window').width - 82,
	},
});

export default TalkCard;