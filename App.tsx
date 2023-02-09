/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import params from './src/utils/params';
import {BoardProps, createMinedBoard} from './src/utils/logic';
import MineField from './src/components/MineField/MineField';

type MyProps = {};
type MyState = {board: BoardProps};

export default class App extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = this.createState();
  }

  minesAmount = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();
    return Math.ceil(rows * columns * params.difficultLevel);
  };

  createState = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();
    return {
      board: createMinedBoard(rows, columns, this.minesAmount()),
    };
  };

  render(): React.ReactNode {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Iniciando o Mines!</Text>
        <Text>
          Tamanho da grade: {params.getRowsAmount()}x{params.getColumnsAmount()}
        </Text>
        <View style={styles.board}>
          <MineField board={this.state.board} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
});
