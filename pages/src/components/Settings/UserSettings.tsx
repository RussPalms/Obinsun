import Settings from './Settings';
import { useSession } from 'next-auth/react';
import PrintfulSignin from './PrintfulSignin';
import SettingsForm from './SettingsForm';
import { useEffect } from 'react';
import ExternalAccounts from './ExternalAccounts';

const UserSettings = () => {
  const { data: session } = useSession() as any;
  // console.log(session.user.stripeId);
  // useEffect(() => {
  //   console.log('session loaded');
  // });

  return (
    <div className="relative h-[100%] w-[100%] flex items-center justify-center">
      {/* {!session.user.stripeId ? <SettingsForm /> : <ExternalAccounts />} */}
      <SettingsForm />
    </div>
  );
};

export default UserSettings;
