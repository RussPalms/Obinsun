import React from 'react';
import Content from './Production/Layout/Content';

type Props = {};

const title = 'Welcome, this is Obinsun 👋';
const subtitle =
  'You will fins a plethora of custom graphic designs attatched to high quality merchandise.';

export default function DashboardPage({}: Props) {
  return (
    <Content title="Dashboard" description={`${title} - ${subtitle}`}>
      <h1>Dashboard</h1>
    </Content>
  );
}
