// @ts-nocheck

import { useState } from "react";
import BlackBearMetal from "../assets/ObinsunVectors/BlackBearMetal";
import DeathsLittleHelpers from "../assets/ObinsunVectors/DeathsLittleHelpers";
import SpookyPals from "../assets/ObinsunVectors/SpookyPals";

function Design() {
	const [graphic, setGraphic] = useState(null);

	// const changeGraphic = (anything) => {
	// 	document.querySelector(".graphic").src = anything;
	// };

	return (
		<body className="flex justify-center items-center min-h-screen bg-gray-400 bg-cover bg-fixed">
			<div className="relative w-[400px] h-[400px]">
				<ul className="absolute top-[50%] transform translate-y-[-50%] z-10">
					<li className="design-container glass border-top-left-glass">
						<BlackBearMetal className="design" />
					</li>
					<li className="design-container glass border-top-left-glass">
						<DeathsLittleHelpers className="design" />
					</li>
					<li className="design-container glass border-top-left-glass">
						<SpookyPals className="design" />
					</li>
				</ul>
				<div className="absolute top-0 right-0 glass border-top-left-glass w-[350px] h-[100%] py-[60px] px-[20px] pl-[50px] flex flex-col items-center space-between z-0">
					<h2 className="text-white tracking-[1px] text-2xl">
						Merch Customization
					</h2>
					<BlackBearMetal className="graphic w-[80%] transition duration-250 transform hover:scale-150 hover:rotate-[-15deg] hover:translate-x-[20px]" />
					<ul className="flex justify-center items-center">
						<span className="text-white text-[1.2em] tracking-[1px] mr-[5px]">
							Size
						</span>
						<li className="size">7</li>
						<li className="size">8</li>
						<li className="size">9</li>
						<li className="size">10</li>
					</ul>
					<button
						href="#"
						className="absolute bottom-[-30px] bg-white inline-block no-underline py-[15px] px-[30px] border rounded-[30px] shadow-button font-medium text-[#1e6b7b] transition duration-[0.25s] ease-out hover:tracking-[2px]"
					>
						Add To Cart
					</button>
				</div>
			</div>
		</body>
	);
}

export default Design;
