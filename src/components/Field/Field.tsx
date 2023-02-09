import React, {Component} from 'react';
import {View, StyleSheet, TextStyle, ViewStyle, Text} from 'react-native';
import params from '../../utils/params';
import Mine from '../Mine/Mine';
import Flag from '../Flag/Flag';

type FieldProps = {
  mined?: boolean;
  opened?: boolean;
  nearMines?: number;
  exploded?: boolean;
  flagged?: boolean;
};

export default class Field extends Component<FieldProps> {
  render(): React.ReactNode {
    // const mined = this.props.mined || false;
    // const opened = this.props.opened || false;
    // const nearMines = this.props.nearMines || 0;

    const {
      mined = false,
      opened = false,
      nearMines = 0,
      exploded = false,
      flagged = false,
    } = this.props;

    const styleField: TextStyle[] | ViewStyle[] = [styles.field];

    if (opened) {
      styleField.push(styles.opened);
    }
    if (exploded) {
      styleField.push(styles.exploded);
    }
    // if (flagged) {
    //   styleField.push(styles.flagged, styles.regular);
    // }
    if (!opened && !exploded) {
      styleField.push(styles.regular);
    }

    let color = null;
    if (nearMines > 0) {
      if (nearMines === 1) {
        color = '#2A28D7';
      }
      if (nearMines === 2) {
        color = '#2B520F';
      }
      if (nearMines > 2 && nearMines < 6) {
        color = '#F9060A';
      }
      if (nearMines >= 6) {
        color = '#F221A9';
      }
    }

    return (
      <View style={styleField}>
        {!mined && opened && nearMines > 0 && (
          <Text style={[styles.label, {color: color as string}]}>
            {nearMines}
          </Text>
        )}
        {mined && opened && <Mine />}
        {flagged && !opened && <Flag />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  field: {
    height: params.blockSize,
    width: params.blockSize,
    borderWidth: params.borderSize,
  },
  regular: {
    backgroundColor: '#999',
    borderLeftColor: '#CCC',
    borderTopColor: '#CCC',
    borderRightColor: '#333',
    borderBottomColor: '#333',
  },
  opened: {
    backgroundColor: '#999',
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: params.fontSize,
  },
  exploded: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
});
