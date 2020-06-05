import { Machine, send } from 'xstate';

import Game from './game2';
import Renderer from './renderer';

const isComplete = (context) => {
  return context.game.isComplete();
};

const isStuck = (context) => {
  return context.game.isStuck();
};

const next = (context, event) => {
  context.game.next(event.data.key);
};

const setup = (context, event) => {
  context.game = new Game(10);
  context.renderer = new Renderer(context.game);
};

const start = send('START');
const processNext = send('PROCESS');

const gameMachine = Machine(
  {
    id: 'game',
    initial: 'launching',
    context: {
      game: null,
      renderer: null,
    },
    states: {
      launching: {
        entry: ['setup', 'start'],
        on: {
          START: 'playing',
        },
      },
      playing: {
        on: {
          NEXT: {
            target: 'processing',
            actions: ['next', 'processNext'],
          },
        },
      },
      processing: {
        on: {
          PROCESS: [
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
        on: { RESTART: 'launching' },
      },
      completed: {
        on: { RESTART: 'launching' },
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
      start,
      next,
      processNext,
    },
  }
);

export default gameMachine;
