//@ts-nocheck

import type { NextPage } from "next";

import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Designs from "./src/components/Designs";
import Design from "./src/components/Design";
import Entity from "./src/components/EntityCreation/Entity";
import Entities from "./src/components/EntityCreation/Entities";
import Header from "./src/components/Header";
import Headers from "./src/components/Headers";
import Heading from "./src/components/Heading";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home(): NextPage {
	// useEffect(async (error) => {
	// 	console.log(error);
	// console.log(errors);
	// window.addEventListener("unhandledrejection", (event) => {
	// 	console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
	// });
	// window.onunhandledrejection = (event) => {
	// 	console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
	// };
	// window.addEventListener("unhandledrejection", function (event) {
	// 	// ...your code here to handle the unhandled rejection...
	// 	// Prevent the default handling (such as outputting the
	// 	// error to the console)
	// 	event.preventDefault();
	// });
	// }, []);

	const { data: session, status } = useSession();
	const loading = status === "loading";
	console.log(status);
	console.log(session);

	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	// useEffect(async () => {
	// 	await getSession().then((session) => {
	// 		if (session) {
	// 			router.replace("/");
	// 		} else {
	// 			setIsLoading(false);
	// 		}
	// 	});
	// },
	// [router]
	// )
	// ;

	if (status == "loading") {
		return <p>Loading...</p>;
	}

	return (
		<>
			<Head>
				<title>Obinsun</title>
				<link rel="icon" href="/Grim2021.svg" />
			</Head>

			<main>
				<Heading />
				{/* home */}
				{/* <Headers /> */}
				{/* <Header /> */}
				<Designs />
				{/* <Design /> */}
				{/* <Entity /> */}
				{/* <Entities /> */}
				{/* <Login /> */}
				{/* <Log /> */}
			</main>
		</>
	);
}

// export async function getServerSideProps(context) {
// 	const session = await getSession(context);

// 	return {
// 		props: {
// 			session
// 		},
// 	};
// }
