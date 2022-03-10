import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
// import Authentication from "../../src/components/Authentication";
import { Preload } from 'pages/src/components/Progress';
import Authorization from 'pages/Production/Layout/Authorization';
import LoginModal from './Production/Layout/LoginModal';
import Content from './Production/Layout/Content';

export default function AuthenticatePage() {
  const modalRef = useRef() as any;

  const openModal = () => {
    modalRef.current?.openModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  async () => {
    await getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  };

  if (isLoading) {
    return <Preload />;
  }

  //   return (
  //     <LoginModal ref={modalRef}>
  //       <Authorization closeModal={closeModal} passHref />
  //     </LoginModal>
  //   );

  // return {
  //   redirect,
  // };

  return;
}
