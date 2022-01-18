//@ts-nocheck

import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Authentication from "../../src/components/Authentication";

function Authenticate() {
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(async () => {
		await getSession().then((session) => {
			if (session) {
				router.replace("/");
			} else {
				setIsLoading(false);
			}
		});
	}, [router]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return <Authentication />;
}

export default Authenticate;
