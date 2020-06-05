import React from 'react';
import { useSpring, animated } from 'react-spring';

import styles from './ui.module.css';

function UI({ status, send, result }) {
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });
  return (
    <animated.div style={props} className={styles.ui}>
      {status === 'stuck' && <h1>Stuck!</h1>}
      {status === 'completed' && <h1>WIN!</h1>}
      {status === 'launching' && <h2>fill with green</h2>}
      {result && <h2>{result}</h2>}
      <button
        onClick={() => send(status === 'launching' ? 'START' : 'RESTART')}
      >
        {status === 'launching' ? 'START' : 'RESTART'}
      </button>
    </animated.div>
  );
}

export default UI;
