import { getSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const VerifyRequest = () => {
	return (
		<div>
			<h1>Check your email</h1>
			<h2>A sign in link has been sent to your email address.</h2>
			<Link href="/">
				<a>Go back to homepage</a>
			</Link>
		</div>
	);
};

export default VerifyRequest;

// export async function handler(req: any, res: any) {
// 	const session = await getSession({ req });
// 	console.log({ session });
// 	res.status(200).json({ session });
// }
