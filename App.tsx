/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, Alert} from 'react-native';
import params from './src/utils/params';
import {
  BoardProps,
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed,
} from './src/utils/logic';
import MineField from './src/components/MineField/MineField';
import Header from './src/components/Header/Header';
import LevelSelection from './src/templates/LevelSelection/LevelSelection';

type MyProps = {};
type MyState = {
  board: BoardProps;
  won: boolean;
  lost: boolean;
  showLevelSelection: boolean;
};

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
      won: false,
      lost: false,
      showLevelSelection: false,
    };
  };

  onOpenField = (row: number, column: number) => {
    const board = cloneBoard(this.state.board);
    const fieldOpened = openField(board, row, column);

    if (fieldOpened) {
      const lost = hadExplosion(board);
      const won = wonGame(board);

      if (lost) {
        showMines(board);
        Alert.alert('Você perdeu!');
      }

      if (won) {
        Alert.alert('Parabéns!', 'Você venceu!');
      }

      this.setState({board, lost, won});
    }
  };

  onSelectField = (row: number, column: number) => {
    const board = cloneBoard(this.state.board);
    invertFlag(board, row, column);
    const won = wonGame(board);

    if (won) {
      Alert.alert('Parabéns!', 'Você venceu!');
    }

    this.setState({board, won});
  };

  onLevelSelected = (level: number) => {
    params.difficultLevel = level;
    this.setState(this.createState());
  };

  render(): React.ReactNode {
    return (
      <SafeAreaView style={styles.container}>
        <LevelSelection
          isVisible={this.state.showLevelSelection}
          onLevelSelected={this.onLevelSelected}
          onCancel={() => this.setState({showLevelSelection: false})}
        />
        <Header
          flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
          onNewGame={() => this.setState(this.createState())}
          onFlagPress={() => this.setState({showLevelSelection: true})}
        />
        <View style={styles.board}>
          <MineField
            board={this.state.board}
            onOpenField={this.onOpenField}
            onSelectField={this.onSelectField}
          />
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
