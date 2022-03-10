import { getSession, useSession } from 'next-auth/react';
import Content from './Production/Layout/Content';
import UserSettings from './src/components/Settings/UserSettings';

type Props = {};

const title = 'Welcome, this is Obinsun 👋';
const subtitle =
  'You will fins a plethora of custom graphic designs attatched to high quality merchandise.';

export default function SettingsPage({}: Props) {
  return (
    <>
      <Content title="Settings" description={`${title} - ${subtitle}`}>
        <UserSettings />
      </Content>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
