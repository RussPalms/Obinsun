import React, { useRef, useEffect } from 'react';

const Draggable = () => {
  const canvas = useRef() as any;
  let ctx = null;
  const boxes = [
    { x: 200, y: 220, w: 100, h: 50 },
    { x: 100, y: 120, w: 100, h: 50 },
  ];
  let isDown = false;
  let dragTarget = null;
  let startX = null;
  let startY = null;

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    // get context of the canvas
    ctx = canvasEle.getContext('2d');
  }, []);

  useEffect(() => {
    draw();
  }, []);

  // draw rectangle
  const draw = () => {
    ctx.clearRect(
      0,
      0,
      canvas.current.clientWidth,
      canvas.current.clientHeight
    );
    boxes.map((info) => drawFillRect(info));
  };

  // draw rectangle with background
  const drawFillRect = (info, style: any = {}) => {
    const { x, y, w, h } = info;
    const { backgroundColor = 'black' } = style;

    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, w, h);
  };

  // identify the click event in the rectangle
  const hitBox = (x, y) => {
    let isTarget = null;
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (
        x >= box.x &&
        x <= box.x + box.w &&
        y >= box.y &&
        y <= box.y + box.h
      ) {
        dragTarget = box;
        isTarget = true;
        break;
      }
    }
    return isTarget;
  };

  const handleMouseDown = (e: any) => {
    startX = parseInt(
      (e.nativeEvent.offsetX - canvas.current.clientLeft) as any
    );
    startY = parseInt(
      (e.nativeEvent.offsetY - canvas.current.clientTop) as any
    );
    isDown = hitBox(startX, startY);
  };
  const handleMouseMove = (e: any) => {
    if (!isDown) return;

    const mouseX = parseInt(
      (e.nativeEvent.offsetX - canvas.current.clientLeft) as any
    );
    const mouseY = parseInt(
      (e.nativeEvent.offsetY - canvas.current.clientTop) as any
    );
    const dx = mouseX - startX;
    const dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    dragTarget.x += dx;
    dragTarget.y += dy;
    draw();
  };
  const handleMouseUp = (e) => {
    dragTarget = null;
    isDown = false;
  };
  const handleMouseOut = (e) => {
    handleMouseUp(e);
  };

  return (
    <div className="draggable">
      <h3>
        Draggable Rectangle on Canvas -{' '}
        <a
          href="http://www.cluemediator.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Clue Mediator
        </a>
      </h3>
      <canvas
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        ref={canvas}
      ></canvas>
    </div>
  );
};

export default Draggable;
