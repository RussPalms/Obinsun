import "./app/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "./app/features";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<UserProvider>
				<Component {...pageProps} />
			</UserProvider>
		</SessionProvider>
	);
}

export default MyApp;
