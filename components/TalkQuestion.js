import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, } from 'react-native';

// constants
import colors from './constants/Colors';

const TalkQuestion = ({ talkQuestion, users }) => {
	const [ user, setUser ] = useState('')

  useEffect(() => {
    getUserName();
  }, [])

	const getUserName = () => {
		let localUser = '';

		users.forEach((user) => {
			for(let i = users.length; i > 0; i--) {
				if(user._key === talkQuestion.user) {
					localUser = user.name
				}
			}
		});

		setUser(localUser);
	}

  return(
    <View style={styles.questionWrapper}>
        <View style={styles.questionContainer}>

          <View style={styles.questionBodyContainer}>
            <Text style={styles.questionBody}>
              {talkQuestion.body}
            </Text>
          </View>

          <View style={styles.questionUserNameContainer}>
            <Text style={{color: colors.text2, fontSize: 15, textAlign: 'center'}}>
              {user}
            </Text>
          </View>

        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  questionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
	questionContainer: {
		flexDirection: 'column',
		marginTop: 20,
		marginBottom: 30,
	},
	questionUserNameContainer: {
		flexWrap: 'wrap',
		paddingBottom: 10,
		flexDirection: 'row',
		width: Dimensions.get('window').width - 82,
	},
	questionUserName: {
		fontSize: 15,
		color: colors.text2,
	},
	questionBodyContainer: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		width: Dimensions.get('window').width - 82,
	},
  questionBody: {
		textAlign: 'center',
		fontSize: 20,
    color: colors.text1,
	},
});

export default TalkQuestion;