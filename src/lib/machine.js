import { Machine, assign } from 'xstate';

import Game from './game';

const gameToContext = (game) => ({
  isStuck: game.isStuck(),
  isComplete: game.isComplete(),
  currentBox: game.currentBox,
  result: game.getResult(),
});

const isComplete = (context) => {
  return context.isComplete;
};

const isStuck = (context) => {
  return context.isStuck;
};

const next = assign(({ game }, event) => {
  game.next(event.data.key);
  return gameToContext(game);
});

const setup = assign(() => {
  const game = new Game(10);
  return {
    game,
    ...gameToContext(game),
  };
});

const gameMachine = Machine(
  {
    id: 'game',
    initial: 'launching',
    context: {
      game: null,
      isStuck: false,
      isComplete: false,
      currentBox: null,
      result: null,
    },
    states: {
      launching: {
        on: {
          START: {
            target: 'playing',
            actions: ['setup'],
          },
        },
      },
      playing: {
        on: {
          NEXT: {
            target: 'processing',
            actions: ['next'],
          },
        },
      },
      processing: {
        on: {
          '': [
            {
              target: 'completed',
              cond: 'isComplete',
            },
            {
              target: 'stuck',
              cond: 'isStuck',
            },
            { target: 'playing' },
          ],
        },
      },
      stuck: {
        on: {
          RESTART: {
            target: 'playing',
            actions: 'setup',
          },
        },
      },
      completed: {
        on: {
          RESTART: {
            target: 'playing',
            actions: 'setup',
          },
        },
      },
    },
  },
  {
    guards: {
      isComplete,
      isStuck,
    },
    actions: {
      setup,
      next,
    },
  }
);

export default gameMachine;
