import React from 'react';
import Content from './Production/Layout/Content';

type Props = {};

const title = 'Welcome, this is Obinsun 👋';
const subtitle =
  'You will fins a plethora of custom graphic designs attatched to high quality merchandise.';

export default function ProfilePage({}: Props) {
  return (
    <Content title="Profile" description={`${title} - ${subtitle}`}>
      <h1>profile</h1>
    </Content>
  );
}
