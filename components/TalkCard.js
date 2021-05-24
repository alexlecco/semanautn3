import React, { useEffect, useContext }  from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, } from 'react-native';

import { AppContext } from '../context/provider';

const TalkCard = ({ talk }) => {
  const [ state, setState ] = useContext(AppContext)

  const showOrHideTalkInfo = (talk) => {
    setState({
      ...state,
      talk: talk.item,
      talkInfoVisible: true,
    })
  }

  return(
    <TouchableWithoutFeedback
      onPress={() => showOrHideTalkInfo(talk)}
    >
      <View style={styles.TalkCardContainer}>
        <View styke={styles.TalCardColumn}>
          <View style={styles.TalkTimeContainer}>
            <Text style={styles.TalkText}>{talk.item.time}</Text>
          </View>
        </View>

        <View style={styles.TalCardColumn}>
          <View style={styles.TalkTitleContainer}>
            <Text style={styles.TalkText}>{talk.item.title}</Text>
          </View>
        </View>
      </View>

    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  TalkCardContainer: {
    flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'black',
  },
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
	TalkText: {
		fontSize: 17,
    color: 'white',
	},
});

export default TalkCard;