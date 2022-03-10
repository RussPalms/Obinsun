// app/layouts/MainNav.jsx
// ----------------------------------------
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUserContext } from '../features';

const MainNav = (props: any) => {
  const { data: session, status } = useSession();
  console.log(session);

  const router = useRouter();
  const { access } = useUserContext() as any;

  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      {access('app', 'read:any').granted && (
        <li>
          <Link href="/routes/protected/admin/users">
            <a>Manage App</a>
          </Link>
        </li>
      )}
      {access('users', 'read:any').granted && (
        <li>
          <Link href="/routes/protected/creator/studio">
            <a>Manage Users</a>
          </Link>
        </li>
      )}
      {access('users', 'read:own').granted && (
        <li>
          <Link href="/routes/protected/profile">
            <a>Profile</a>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default MainNav;
