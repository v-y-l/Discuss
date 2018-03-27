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
          <View style={styles.modalContainer}>
            <View style={styles.modalInputs}>
              <Text style={styles.header}> Your Pseudonym </Text>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                value={this.state.text}
                onChangeText={(text)=>this.setState({text})}
              />
            </View>
            <View style={styles.modalButtons}>
              <Button style={styles.cancelButton} title='Cancel' onPress={toggleModal} />
              <Button style={styles.saveButton} title='Save' onPress={toggleModal} />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
