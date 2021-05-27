// libraries
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, } from 'react-native';

// helpers
import texts from '../constants/texts'

//Sponsors
const TabThreeScreen = _ => {
  const [imgHeight, setImgHeight] = useState(0)
  const [imgWidth, setImgWidth] = useState(0)
  
  const getSponsorsImage = () => texts.sponsorsImage

  const calculateImgSize = _ => {
    Image.getSize(getSponsorsImage(), (width, height) => {
      const screenWidth = Dimensions.get('window').width;
      const scaleFactor = width / screenWidth;
      const imageHeight = height / scaleFactor;
      setImgWidth(screenWidth);
      setImgHeight(imageHeight);
    })
  }

  useEffect(() => {
    calculateImgSize(300, 300)
  }, [])
  
  return(
    <View style={styles.container}>
      <View style={styles.infoImageContainer}>
        <Image
          source={{uri: getSponsorsImage()}}
          style={{width: imgWidth, height: imgHeight}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b0b1b3',
  },
  feedbackText: {
    fontSize: 30,
    color: '#fff',
    margin: 10,
  },
  infoTitle: {
    fontSize: 20,
    color: '#fff',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  infoImageContainer: {
    justifyContent:'center',
    alignItems:'center',
  },
  feedbackButton: {
    color: '#fff',
  },
});

export default TabThreeScreen;