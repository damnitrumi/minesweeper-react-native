import React from 'react';
import {BoardProps} from '../../utils/logic';
import {View, StyleSheet} from 'react-native';
import Field from '../Field/Field';

type MineFieldProps = {
  board: BoardProps;
  onOpenField: (r: number, c: number) => void;
  onSelectField: (r: number, c: number) => void;
};

export default class MineField extends React.Component<MineFieldProps> {
  render(): React.ReactNode {
    const rows = this.props.board.map((row, r) => {
      const columns = row.map((field, c) => {
        return (
          <Field
            {...field}
            onOpen={() => this.props.onOpenField(r, c)}
            onSelect={() => this.props.onSelectField(r, c)}
            key={c}
          />
        );
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
