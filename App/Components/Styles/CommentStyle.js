import { StyleSheet } from 'react-native';
import Metrics from '../../Themes/Metrics';
import Fonts from '../../Themes/Fonts';

export default StyleSheet.create({
  commentContainer: {
    flex: 1,
    paddingLeft: Metrics.item.paddingLeft,
    paddingRight: Metrics.item.paddingRight,
    flexDirection: 'row',
  },
  profilePicture: {
  	borderRadius: Metrics.profilePicture.borderRadius,
  	height: Metrics.profilePicture.height,
  	width: Metrics.profilePicture.width,
  	marginRight: 10,
  },
  commentBox: {
  	flex: 1,
  	...Fonts.style.normal,
  },
  author: {
  	fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  reply: {
    paddingTop: 5,
    paddingLeft: 65,
  },
});
