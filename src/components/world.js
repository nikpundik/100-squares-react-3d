import React from 'react';
import { useMachine } from '@xstate/react';

import gameMachine from '../lib/machine';
import WorldCanvas from './canvas';
import UI from '../ui/ui';

function App() {
  const [state, send] = useMachine(gameMachine);

  return (
    <React.Fragment>
      <WorldCanvas context={state.context} send={send} />
      {!state.matches('playing') && (
        <UI status={state.value} result={state.context.result} send={send} />
      )}
    </React.Fragment>
  );
}

export default App;
