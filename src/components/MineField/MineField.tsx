import React from 'react';
import {BoardProps} from '../../utils/logic';
import {View, StyleSheet} from 'react-native';
import Field from '../Field/Field';

type MineFieldProps = {
  board: BoardProps;
};

export default class MineField extends React.Component<MineFieldProps> {
  render(): React.ReactNode {
    const rows = this.props.board.map((row, r) => {
      const columns = row.map((field, c) => {
        return <Field {...field} key={c} />;
      });
      return (
        <View style={styles.row} key={r}>
          {columns}
        </View>
      );
    });

    return <View style={styles.container}>{rows}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
  },
  row: {
    flexDirection: 'row',
  },
});
