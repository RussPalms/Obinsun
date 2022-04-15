import React from 'react';
import Content from './Production/Layout/Content';
import Draggable from './Production/Layout/Sketch/Draggable';

type Props = {};

function Drag({}: Props) {
  return (
    <Content title="" description="">
      <Draggable />
    </Content>
  );
}

export default Drag;
