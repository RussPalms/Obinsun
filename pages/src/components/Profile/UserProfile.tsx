// import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import ProfileForm from './ProfileForm';
import Link from 'next/link';
import DarkModeToggle from '../DarkModeToggle';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

function UserProfile() {
  // const { data: session } = useSession();
  // console.log(session.user.stripeId);
  const router = useRouter();

  // const { data: session, status } = useSession();
  // const loading = status === "loading";
  // console.log(session);

  const [passwordResponse, setPasswordResponse] = useState('');

  async function changePasswordHandler(passwordData: any) {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const passwordApiResponse = await response.json();

    // console.log(response);
    // console.log(data);

    setPasswordResponse(passwordApiResponse);
    // console.log(response)
  }

  // console.log(passwordResponse);

  return (
    <div className="relative h-full w-[85%] flex items-center justify-center">
      <ProfileForm
        passwordResponse={passwordResponse}
        onChangePassword={changePasswordHandler}
      />
    </div>
  );
}

export default UserProfile;
