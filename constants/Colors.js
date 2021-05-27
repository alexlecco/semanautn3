const tintColorLight = '#58231e';
const tintColorDark = '#e87a36';
const tintColor = '#d72969';
const palette1 = '#FFFFFF';
const palette2 = '#E6E7E8';
const palette3 = '#E87A36';
const palette4 = '#C55A38';
const palette5 = '#58231E';
const palette6 = '#4F3C3B';
const splashBg = '#b0b1b3';

export default {
  light: {
    text: palette1,
    background: palette2,
    tint: tintColorLight,
    tabIconDefault: palette2,
    tabIconSelected: tintColorLight,
    talkCardText: palette5,
  },
  dark: {
    text: palette2,
    background: palette5,
    tint: tintColorDark,
    tabIconDefault: palette2,
    tabIconSelected: tintColorDark,
    talkCardText: palette2,
  },
  colors: {
    tintColor,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColor,
    tabBar: '#fefefe',
    errorBackground: 'red',
    errorText: '#fff',
    warningBackground: '#EAEB5E',
    warningText: '#666804',
    noticeBackground: tintColor,
    noticeText: '#fff',
    text2: '#ffaf19',
    dark: '#5e142f',
    medium: '#7b193d',
    light: '#d72969',
    text1: '#d2d3d5',
    white: '#fff',
  }
};
