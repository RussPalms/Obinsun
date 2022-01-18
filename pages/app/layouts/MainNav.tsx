//@ts-nocheck

// app/layouts/MainNav.jsx
// ----------------------------------------
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUserContext } from "../features";

const MainNav = (props) => {
	// const { data: session, status } = useSession();
	// console.log(session);

	const router = useRouter();
	const { access } = useUserContext();

	return (
		<ul>
			<li>
				<Link href="/">
					<a>Home</a>
				</Link>
			</li>
			{access("users", "read:any").granted && (
				<li>
					<Link href="/users">
						<a>Manage users</a>
					</Link>
				</li>
			)}
			{access("users", "read:own").granted && (
				<li>
					<Link href="/profile">
						<a>Profile</a>
					</Link>
				</li>
			)}
		</ul>
	);
};

export default MainNav;
