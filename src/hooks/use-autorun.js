import { useEffect } from 'react';

function useAutorun(game, send) {
  useEffect(() => {
    if (!game) return;
    const i = setInterval(() => {
      const options = game.currentBox
        ? game.getOptions(game.currentBox)
        : game.boxes;
      if (options.length) {
        const box = options[Math.floor(Math.random() * options.length)];
        send({ type: 'NEXT', data: { key: box.k } });
      } else clearInterval(i);
    }, 1000);
    return () => clearInterval(i);
  }, [game, send]);
}

export default useAutorun;
