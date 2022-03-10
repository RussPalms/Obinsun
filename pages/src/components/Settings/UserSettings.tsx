import Settings from './Settings';
import { useSession } from 'next-auth/react';
import PrintfulSignin from './PrintfulSignin';
import SettingsForm from './SettingsForm';

const UserSettings = () => {
  const { data: session } = useSession() as any;
  // console.log(session.user.stripeId);

  return (
    <div className="relative h-[100%] w-[100%] flex items-center justify-center">
      {session.user.stripeId ? <SettingsForm /> : <Settings />}
      {/* <SettingsForm /> */}
    </div>
  );
};

export default UserSettings;
