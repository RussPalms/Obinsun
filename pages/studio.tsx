// import { Studio } from '@/components/Studio';
import Content from 'pages/Production/Layout/Content';
import React from 'react';
// import Content from './Production/Layout/Content';
import { Studio } from './src/components/Studio';

type Props = {};

const title = 'Welcome, this is Obinsun 👋';
const subtitle =
  'You will fins a plethora of custom graphic designs attatched to high quality merchandise.';

export default function StudioPage({}: Props) {
  return (
    <Content title="Studio" description={`${title} - ${subtitle}`}>
      <div className="">
        <Studio />
      </div>
    </Content>
  );
}
