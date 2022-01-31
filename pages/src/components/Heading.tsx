//@ts-nocheck

import ZLogo from "../assets/ObinsunVectors/ZLogo";
import ZBanner from "../assets/ObinsunVectors/ZBanner";
import CatsAndSkullsPatternBanner from "../assets/ObinsunVectors/ZBanner/CatsAndSkullsPatternBanner";
import { CgSearch } from "react-icons/cg";
import { BsBookmark, BsSun, BsMoon } from "react-icons/bs";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { BiCart } from "react-icons/bi";
// import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
// import { useSelector } from "react-redux";
import Link from "next/link";
import {
  useSession,
  signOut,
  //  getSession
} from "next-auth/react";
import { useState } from "react";

function Heading() {
  // const [session, loading] = useSession();
  const { data: session, status } = useSession();
  // const [isLoading, setIsLoading] = useState(true);
  // const loading = status === "loading";
  const router = useRouter();
  // const users = useSelector(selectUsers);

  function logStateHandler() {
    if (!session) {
      router.push("/routes/loading/authenticate");
    } else {
      signOut();
    }
  }

  // if (isLoading) {
  // 	return <p>Loading...</p>;
  // }

  return (
    <section className="font-grandstander md:py-[50px] md:px-[20px] flex justify-center items-center h-screen bg-gray-600 bg-cover bg-center bg-fixed p-16">
      <div className="md:flex-col md:h-auto md:p-[20px] relative w-full min-h-full bg-white bg-opacity-50 shadow-glass1 rounded-3xl flex justify-between items-center p-[50px]">
        <div className="absolute -top-14 -left-10 rounded-full p-4 h-24 w-24 flex justify-center items-center bg-white bg-opacity-20 shadow-glass border border-solid border-white border-opacity-25 border-t border-t-white border-l border-l-white backdrop-blur-[4px] border-top-left-glass z-50">
          <ZLogo className="object-contain" onClick={() => router.push("/")} />
        </div>
        <header className="h-20 md:relative md:flex-col md:w-full md:top-[-60px] md:p-[20px] md:right-0 md:left-0 absolute -top-6 right-5 left-5 py-[20px] px-5 flex justify-between items-center shadow-glass1 bg-white/[0.2] border rounded-3xl backdrop-blur-[10px] border-top-left-glass z-40">
          <div className="relative left-6 max-w-full">
            <a className="text-6xl relative left-2 top-2">Obinsun</a>
          </div>
          <div className="flex justify-center items-center bg-gray-100 p-2 rounded-full w-1/3 mx-3">
            <input
              className="w-full select-none border-none rounded-full bg-transparent outline-none p-1 placeholder-gray-400"
              placeholder="Search Our Merch"
              type="text"
            />
            <CgSearch
              className="rounded-full cursor-pointer h-6 w-6"
              type="submit"
            />
          </div>
          <div className="flex justify-end items-center">
            {/* {!session && !loading && ( */}
            <h2
              className="rounded-full bg-gray-100 text-black p-2 cursor-pointer whitespace-nowrap select-none mx-1"
              // onClick={!session ? signIn : signOut}
              onClick={logStateHandler}
            >
              {/* <Link> */}
              {/* {!session && !loading ? "Login" : "Logout"} */}
              {!session ? "Login" : "Logout"}
              {/* </Link> */}
            </h2>
            {/* // )} */}
            {/* {session && (
							<h2
								className="rounded-full bg-gray-100 text-black p-2 cursor-pointer whitespace-nowrap select-none mx-1"
								// onClick={!session ? signIn : signOut}
							>
								<Link href="/dashboard">Dashboard</Link>
							</h2>
						)} */}
            {/* {session && (
							<h2
								className="rounded-full bg-gray-100 text-black p-2 cursor-pointer whitespace-nowrap select-none mx-1"
							>
								<button onClick={logStateHandler}>
									Logout
								</button>
							</h2>
						)} */}

            <MdOutlineBookmarkBorder className="h-6 w-6 cursor-pointer mx-2" />
            <BiCart className=" h-6 w-6 cursor-pointer mx-2" />
          </div>
        </header>
        <div className="absolute -top-6 -right-2 rounded-full h-11 w-11 flex justify-center items-center bg-white bg-opacity-20 shadow-glass border border-solid border-white border-opacity-25 border-t border-t-white border-l border-l-white backdrop-blur-[4px] border-top-left-glass z-50">
          <BsSun className="h-6 w-6" />
        </div>
        <div className="md:translate-x-[0px] md:max-w-[100%] md:p-[30px] md:mt-[-40px] transform translate-x-[-90px] max-w-[700px] bg-white/[0.2] rounded-[20px] backdrop-blur-[10px] border border-white border-opacity-[0.25] border-top-left-glass p-[40px] pl-[110px]"></div>
      </div>
    </section>
  );
}

export default Heading;

// export async function getServerSideProps(context) {
// 	const session = await getSession(context);

// 	return {
// 		props: {
// 			session,
// 		},
// 	};
// }
