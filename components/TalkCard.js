import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, } from 'react-native';

const TalkCard = ({ talk, sites }) => {
	const getSiteName = (sites, siteId) => {
    const site = sites.filter(obj => (
      obj.id === siteId
    ))
    return site[0].name
  }

  return(
    <TouchableWithoutFeedback
      onPress={() => {}}
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
          <View style={styles.TalkSiteContainer}>
            <Text
              style={[
                styles.TalkSiteText, {
                  color: 'red'}
                ]}
              >
              {getSiteName(sites, talk.item.site)}
            </Text>
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
	TalkSiteContainer: {
		flexWrap: 'wrap',
		paddingBottom: 10,
		flexDirection: 'row',
		width: Dimensions.get('window').width - 82,
	},
	TalkSiteText: {
		fontSize: 13,
	},
	TalkText: {
		fontSize: 17,
    color: 'white',
	},
});

export default TalkCard;