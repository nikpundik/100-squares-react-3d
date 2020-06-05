import { useState, useEffect } from 'react';

import Renderer from '../lib/renderer';

function useRenderer(game) {
  const [renderer, setRenderer] = useState(null);

  useEffect(() => {
    if (game) setRenderer(new Renderer(game));
  }, [game]);

  return renderer;
}

export default useRenderer;
