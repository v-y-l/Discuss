import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from '../Navigation/Styles/NavigationStyles';
// import styles from './Styles/ScrollUpTitleStyle';

export default class ScrollUpTitle extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={styles.headerTitle}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}
