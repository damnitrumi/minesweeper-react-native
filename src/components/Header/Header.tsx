import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Flag from '../Flag/Flag';

type HeaderProps = {
  onFlagPress: () => void;
  flagsLeft: number;
  onNewGame: () => void;
};

export default class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flagContainer}>
          <TouchableOpacity
            style={styles.flagButton}
            onPress={this.props.onFlagPress}>
            <Flag bigger />
          </TouchableOpacity>
          <Text style={styles.flagsLeft}>= {this.props.flagsLeft}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.props.onNewGame}>
          <Text style={styles.buttonLabel}>Novo Jogo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  flagContainer: {
    flexDirection: 'row',
  },
  flagButton: {
    marginTop: 10,
    minWidth: 30,
  },
  flagsLeft: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 5,
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#999',
    padding: 5,
  },
  buttonLabel: {
    fontSize: 20,
    color: '#DDD',
    fontWeight: 'bold',
  },
});
