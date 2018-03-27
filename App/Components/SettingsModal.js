import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Button, TextInput } from 'react-native'
import styles from './Styles/SettingsModalStyle'
import Modal from "react-native-modal";

export default class SettingsModal extends Component {
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

  constructor(props) {
    super(props)
    this.state = {
      text: "Fixture User"
    }
  }

  render () {
    const { isVisible, toggleModal } = this.props
    return (
      <View style={styles.container}>
        <Modal isVisible={isVisible}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.header}> Your Pseudonym </Text>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                value={this.state.text}
                onChangeText={(text)=>this.setState({text})}
              />
            </View>
            <View style={styles.separator}></View>
            <View style={styles.modalButtons}>
              <Button title='Save' onPress={toggleModal} />
              <Button title='Cancel' onPress={toggleModal} />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
