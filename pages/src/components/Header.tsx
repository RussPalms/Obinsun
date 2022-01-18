//@ts-nocheck

import ZLogo from "../assets/ObinsunVectors/ZLogo";
import ZBanner from "../assets/ObinsunVectors/ZBanner";
import CatsAndSkullsPatternBanner from "../assets/ObinsunVectors/ZBanner/CatsAndSkullsPatternBanner";
import { CgSearch } from "react-icons/cg";
import { BsBookmark } from "react-icons/bs";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { BiCart } from "react-icons/bi";

function Header() {
	return (
		<header
			className="font-grandstander w-full bg-gray-600 flex flex-col 
		items-center"
		>
			<div className="flex items-center w-full bg-gray-500 h-24">
				<div className="flex justify-center w-1/3 items-center">
					<div className="bg-gray-400 rounded-full p-2 h-20 w-20">
						<ZLogo className="object-contain" />
					</div>
					<h1 className="text-7xl mx-2 select-none">Obinsun</h1>
				</div>
				{/* <div className="flex justify-center mx-2 w-full"> */}
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
				{/* </div> */}
				<div className="flex justify-center items-center w-1/3">
					<h2 className="rounded-full bg-gray-100 text-black p-2 cursor-pointer whitespace-nowrap select-none">
						Sign In
					</h2>
					<MdOutlineBookmarkBorder className="h-6 w-6 cursor-pointer" />
					<BiCart className=" h-6 w-6 cursor-pointer" />
				</div>
			</div>
			<div className="h-full w-full flex justify-center items-center">
				<CatsAndSkullsPatternBanner className="xs:full object-contain" />
				<CatsAndSkullsPatternBanner className="xs:w-0 sm:w-full object-contain" />
				<CatsAndSkullsPatternBanner className="xs:w-0 sm:w-0 md:w-full object-contain" />
				<CatsAndSkullsPatternBanner className="xs:w-0 sm:w-0 md:w-0 lg:w-full object-contain" />
				<CatsAndSkullsPatternBanner className="xs:w-0 sm:w-0 md:w-0 lg:w-0 xl:w-full object-contain" />
				<CatsAndSkullsPatternBanner className="xs:w-0 sm:w-0 md:w-0 lg:w-0 xl:w-0 2xl:w-full object-contain" />
			</div>
		</header>
	);
}

export default Header;
