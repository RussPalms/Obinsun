// app/features/UserContext.jsx
// ----------------------------------------
import { AccessControl } from 'accesscontrol';
import { useSession } from 'next-auth/react';
import react, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from 'react';

// front-end isolated instance of AccessControl
const ac = new AccessControl();

// create and export User context
export const UserContext = createContext({
  access: () => ({ granted: false }),
  loading: false,
  user: {},
});

// export hook context wrapper
export const useUserContext = () => useContext(UserContext);

// export pre-configured provider
export const UserProvider = (props: any) => {
  const { data: session, status } = useSession() as any;
  const loading = status === 'loading';

  // update permissions from session data
  const permissions = session?.user?.permissions || {};
  useEffect(() => {
    ac.setGrants(permissions);
    return () => {
      ac.reset(); // reset when permissions change
    };
  }, [permissions]);

  // expose access checking wrapper method
  // automatically fill user role on permission check
  const role = session?.user?.role || 'guest';
  const access = useCallback(
    (resource, action, possession) => {
      try {
        return ac.permission({
          role,
          resource,
          action,
          possession,
        });
      } catch {
        // if role is not a string
        return { granted: false };
      }
    },
    [role]
  );

  // Return context values
  // ----------------------------------------
  const context = {
    access,
    loading,
    user: session?.user,
  };

  return (
    <UserContext.Provider value={context as any}>
      {props.children}
    </UserContext.Provider>
  );
};

export default function r() {}
