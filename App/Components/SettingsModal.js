import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { View, Text, Button, TextInput } from 'react-native';
import styles from './Styles/SettingsModalStyle';
import Modal from 'react-native-modal';

export default class SettingsModal extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // Defaults for props
  // static defaultProps = {
  //   toggleModal: ()=>{console.log("toggleModal not loaded yet")}
  // }

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ text: nextProps.pseudonym });
  }

  render() {
    const { isVisible, toggleModal, pseudonym } = this.props;
    const hasPseudonym = (
      <View style={styles.modalInputs}>
        <Text style={styles.header}> Your Pseudonym </Text>
        <Text style={styles.pseudonymBox}> {pseudonym} </Text>
      </View>
    );

    const explanation = 'Your pseudonym for this discussion will ' +
    'be generated for you once you leave a comment.';

    const noPseudonym = (
      <View style={styles.modalInputs}>
        <Text style={styles.explanation}>{explanation}</Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <Modal isVisible={isVisible}>
          <View style={styles.modalContainer}>
            { !pseudonym && noPseudonym }
            { pseudonym && hasPseudonym }
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={toggleModal} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
