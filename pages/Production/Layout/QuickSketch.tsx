import { usePainter } from 'pages/server/hooks/usePainter';
import React, { useCallback, useEffect, useState } from 'react';
import { Intro } from './Sketch/Intro';
import { Goo } from './Sketch/Goo';
import { Canvas } from './Sketch/Canvas';
import { Toolbar } from './Sketch/Toolbar';

const QuickSketch = ({ closeQuickSketch }: any) => {
  const [dateUrl, setDataUrl] = useState('#');
  const [{ canvas, isReady, ...state }, { init, ...api }] = usePainter();

  const handleDownload = useCallback(() => {
    if (!canvas || !canvas.current) return;

    setDataUrl(canvas.current.toDataURL('image/png'));
  }, [canvas]);

  const toolbarProps = { ...state, ...api, dateUrl, handleDownload };

  useEffect(() => {
    init();
  }, []);
  return (
    <div className="flex items-center justify-center">
      {/* <div className='quick-sketch-root'>
            <div className='quick-sketch-base'> */}
      {/* <body className="quick-sketch-body"> */}
      <button onClick={closeQuickSketch}>Close QuickSketch</button>
      {/* <Intro isReady={isReady} init={init} /> */}
      <Toolbar {...toolbarProps} />
      <Canvas width={state.currentWidth} canvasRef={canvas} />
      {/* <Goo /> */}
      {/* </body> */}
      {/* </div>
        </div> */}
    </div>
  );
};

export default QuickSketch;
