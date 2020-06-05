import React from 'react';
import { useSpring, animated } from 'react-spring';

import styles from './ui.module.css';

function UI({ status, restart, result }) {
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });
  return (
    <animated.div style={props} className={styles.ui}>
      {
        <h1>
          {status === 'stuck' && 'Stuck!'}
          {status === 'completed' && 'WIN!'}
        </h1>
      }
      <h2>{result}</h2>
      <button onClick={restart}>RESTART</button>
    </animated.div>
  );
}

export default UI;
