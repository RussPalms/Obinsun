//@ts-nocheck

const GrimKitty = ({ id, name, className }) => {
	return (
		<>
			<svg
				name={name}
				className={className}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 3000 3000"
			>
				<path d="M1541.38657407 250.01849194c-92.30090557-.47229392-182.03502636 8.16610297-279.0357903 34.66416839-51.15173872 14.4854024-111.52612703 36.42519427-160.36910295 62.90259037-37.51618976 21.3634624-73.99615772 45.97889745-106.0311889 70.70766926-37.53651458 29.0803522-78.86378206 67.14083399-110.57947227 109.22046463-13.29967254 16.8761535-25.62788714 33.8887245-34.6035384 48.1071482-8.9439583 14.16847287-16.54751133 32.89831968-20.41370723 47.82466753-3.02771057 13.4157652-.68070953 26.60278996 5.30891428 35.45821469 6.3444471 9.04730489 14.70001882 10.79420673 23.44796309 8.65941069 10.90857695-3.05458068 23.31326803-9.66393954 36.44035177-17.5003669 46.38987238-27.84880533 91.8000191-48.66969813 143.11091156-65.43251486 47.46295446-15.41069887 98.56956517-26.72439445 151.50782192-33.42642075 72.27819292-10.05183374 152.2264252-19.24313487 231.06953794-15.0307279 36.297389 1.28011974 77.3022151 3.95714089 125.88648006 8.20847507 86.85454033 8.6835249 179.37867453 21.70519511 265.5928105 42.64390302 39.87972625 8.89090705 71.06490397 16.31808191 72.97474893 17.97782813 3.11727761 2.70940308-4.03602879 30.8224312-27.52533051 108.18424284-21.57187801 71.04802402-29.85924099 104.51096056-37.7456192 152.43621877-3.5327309 21.46990938-16.6305331 74.62829436-29.10653332 118.13548589-16.3001685 56.84269088-25.3505738 95.38235636-32.16800378 136.93423042-4.31713151 26.31238605-9.02663557 54.34652627-13.7189152 81.9776148-17.12108491-7.21669232-33.1067353-16.25297357-47.037511-29.12031288-21.77891568-22.88437969-64.72149034-57.1210377-101.26105484-80.73952265-24.74702971-15.99564056-28.1102722-21.00106035-43.3838646-64.52409836-5.31580405-15.14854301-18.55346863-43.65669959-29.4162286-63.35352599-17.28953985-31.35018777-19.76090128-37.83759765-19.76090128-52.03018472 0-8.9167437-1.43479515-32.04777725-3.16895091-51.40390439-7.8805219-87.96654962-28.84885583-143.8308928-53.99480338-143.8308928-17.48762081 0-57.58368592 35.47647259-104.39624585 92.37944898l-17.29160679 21.01931825-13.85361025-2.38179439c-64.82449244-13.3248202-129.48397483-13.25075515-207.74938014 12.09740722l-10.15965868-11.5524262c-5.58932802-6.3568487-14.98697785-17.94820212-20.8780779-25.75603692-45.74188928-60.62552053-77.07760853-82.34828456-93.15971573-64.57818307-2.94985614 3.25955142-10.03564277 18.75327204-15.74450835 34.42888266-11.75808591 32.28685236-19.62620622 93.4149818-19.62620622 152.49650429 0 28.39344186-1.02382021 35.10476935-7.51570844 49.30493517-12.2221121 26.73369564-22.83167293 71.68153862-27.66657086 117.19365397-3.01565346 28.92912168-1.36693088 78.03149753 4.40015327 112.93439655 10.39597788 57.16168735 35.35417912 120.3529592 87.97240594 170.30656645 34.20289811 32.26032674 53.9999707 45.6957278 60.65583552 100.09013799 5.71644433 22.19367998 14.62354235 64.8771992 19.79466117 94.85528875 7.32968458 42.49370598 13.46296015 66.31716168 27.82813602 108.07676238 10.13416652 29.46101213 21.90465403 65.95441515 26.1594331 81.10261368 9.1861338 32.70540604 45.9348029 119.3498083 73.33852893 172.910556 14.11611059 27.59009438 23.44382922 51.47314661 33.45983614 85.68465695 20.23078377 69.10097429 25.8927989 110.19846785 25.93069265 188.26441425l.03444886 64.32946227-15.53574824 12.17801756c-22.73314918 17.81936337-30.69428142 36.40280251-23.23954746 54.23697889 6.83947726 16.36252094 8.40345564 17.0456419 69.37553172 30.16273546 7.57427151 1.62943122 36.49684791 4.26683617 64.26883228 5.86044058 27.77198438 1.5932599 61.5081004 4.11836157 74.97312748 5.61792057 10.8407127 1.20743265 25.05121318 1.4268719 42.83922807.68656584-1.75172468 9.34666551-2.60777892 16.01010908-2.14650865 17.96439308.95940084 4.06427686 6.08780307 10.31536754 11.39775081 13.89391543 11.97270234 8.06861269 55.24495262 22.35180026 77.50339647 25.58103668 9.14824006 1.3273147 24.3987517 2.58194228 33.89044693 2.79208035 23.94333774.52947902 27.85982897-3.7631938 34.55634345-37.8665347 1.96771906-10.02220771 5.08224076-21.30627728 8.09410485-30.15653467 195.61752406-4.4449368 203.52284914-4.8142286 229.95959558-10.6708798 14.3066128-3.16963989 39.78051353-8.73071984 56.6118835-12.35336227 18.96582153-4.0811568 39.79704899-11.1679769 54.7819599-18.64406915 13.29829459-6.63485101 24.94304375-11.30232746 25.87695242-10.3680743.93390868.93390868 2.27396945 18.89933522 2.97397034 39.92554324 1.8302681 55.7699533-21.77374834 92.49623062-88.21492592 137.4926465-8.77963723 4.44907065-21.45888574 12.07432648-28.17779198 16.94195082-15.52403563 11.24479786-68.72996004 32.0794702-92.70946909 36.3060012-92.29160437 15.60326801-152.70733132 7.54326754-228.23026265-54.74165472-23.117254-21.98354193-62.020355-48.7978479-86.50557335-59.62615901-38.6874511-16.50686169-96.96631508-19.39160948-135.12428716-.88120192-51.50793996 27.18738717-84.22609208 105.40421959-45.5775682 166.92885544 18.29475768 30.73906494 45.14385701 61.5291142 68.78335578 78.88272894 125.6945999 85.00911474 300.14329764 79.4321883 451.13197519 47.11812135 100.01848434-21.73929949 188.00294738-71.49344783 264.31441318-149.4691382 47.68480515-48.86536769 70.79826978-100.67404622 76.063434-188.66815493 1.9632407-58.51001585-27.27660973-129.5514946-48.69277888-189.15905122-8.33283547-16.57265902-8.75173364-19.00371528-5.73918057-33.04955019 1.78789599-8.33869178 3.24956124-22.63772583 3.24956124-31.77769816 0-9.13997233 4.8204294-39.49252103 10.71152947-67.45121825 16.43693049-78.79247291 21.2659721-181.0732141 16.76006082-269.09109252-3.69119567-80.7777609-6.36959477-104.71524233-18.65061443-166.78106982-8.8530133-44.74011633-16.56818066-68.8129818-39.10497132-122.03785309-36.19438689-84.9312603-107.53453727-170.37339725-198.7065536-235.60473076 9.8923355-45.4804224 18.44357676-82.4378516 28.85746805-125.6036549 14.997657-62.16469572 26.76091024-115.24522628 67.8280888-306.02957485 4.16658998-19.35612715 10.21305441-46.20832688 13.43643452-59.67335396 3.22338012-13.46537157 10.02530811-47.12087725 15.11168274-74.79158197 10.99952195-59.84353134 17.2306323-77.72834754 26.20662804-75.24251759 19.32305623 5.22313661 57.24918746 5.41846167 68.85053105-29.63842377 0-6.5656088 11.83180649-56.72039741 26.28758287-111.46067419 9.06177341-34.31416794 16.35218629-63.92158774 20.58181769-83.1953821 7.65281491-34.69276095-16.34219612-43.43553789-48.57840865-58.1662162-160.37599272-45.47249916-249.00017114-66.70057751-323.38870141-79.38706029-66.064996-11.0952898-134.22517184-18.77807522-204.76197474-21.10681836-13.3193084-.41338636-26.55835093-.66589652-39.74399773-.7330718z" />
				<path
					fill="#fff"
					d="M1548.5722624 288.45722225c55.84987465-.1998034 111.39935522 3.8024655 164.86330161 12.03677722 115.81053213 16.01906578 233.93223847 41.690014 346.68887888 76.51402512 17.14037628 5.04538047 31.72051305 10.03081993 42.220182 14.31798093 12.31787995 5.07741792 20.90081417 6.19390557 14.83574735 23.00391724-3.91580226 15.47167335-11.27235695 43.78209346-19.65996612 75.53877781-12.46049823 47.17633993-23.5447644 90.93879753-24.62576971 97.2505182-3.35841966 18.3364408-27.10229848 5.26550872-45.42254831 3.34395114-50.83343122-9.30567136-97.45548894-17.65676473-149.07883259-29.39590378-196.7798287-43.05246653-395.45365587-78.91855576-633.34785807-57.94402103-96.60735793 10.23647964-199.3672828 27.16017257-290.8035219 70.30392859-40.12431318 18.8666088-72.43527974 33.58109614-73.74881489 33.58109614-4.3446906 0 2.73041688-11.11079178 30.64743097-48.12092775 37.23784295-49.3676321 60.30617957-72.28852758 110.50540722-109.80575081 48.83884205-36.5002928 61.27729302-44.34326543 122.44159376-77.19370119 117.0444904-54.94800342 261.75796306-82.9166908 404.4847698-83.43066783zM1927.29445 608.5756931l31.40771738 5.71231046c17.27507133 3.14449221 33.03370371 6.32825613 35.01416884 7.0716626 2.60640098.9786922 2.04040616 5.45807785-2.05211877 16.22851487-3.10900988 8.18194945-8.64907603 32.01987367-12.30616733 52.97201663-6.05473216 34.69069402-24.70638005 123.84194004-39.66338739 189.57622695-3.25541755 14.3066128-12.26930704 56.31252288-20.0299469 93.34160572-13.3885506 63.87990462-17.74770973 82.89981086-43.12170875 188.20378425-15.9853059 66.33989793-49.84233743 225.44886146-75.86810894 356.52575171-30.23542256 152.27706503-57.83447365 287.03102692-67.20249745 328.13196536-4.13386356 18.13835984-9.50581926 41.93081156-11.94273182 52.87108147-2.4358791 10.9406144-12.7164533 49.49681533-22.84235208 85.68465694-23.6539673 84.53337594-26.67961093 98.86754783-39.43464694 186.67666615-6.8563572 47.19942066-26.11878344 113.9750967-45.28819775 169.20316938-3.5051718 10.09902867-8.78480455 27.30968063-11.72742643 38.25029503-5.20177831 19.34131413-5.63652296 19.9117873-15.87851442 20.56149286-10.99986645.69724498-50.02629436-8.54951882-61.10642666-14.47920161-3.52825255-1.88848667-5.7715625-5.06157144-4.98578394-7.05133777 1.44030696-3.64744561 19.2000738-78.44006105 27.38409018-115.31619094 2.42830035-10.9406144 3.09281892-5.78293063 15.0245271-52.91104214 11.9313637-47.12811152 26.52080168-107.03744019 32.42361435-133.12625311 5.90281268-26.08881293 13.56217287-57.76109757 17.01567139-70.38453893 21.3083442-77.88508987 39.8538896-156.32928478 44.29917089-187.37632256 2.8265292-19.74126543 8.47338683-47.97141968 12.54834283-62.73447992 22.79687958-82.59390495 37.95369032-150.33139325 84.24503896-376.42134805 4.90448462-23.95470586 18.47079136-100.38915411 30.14275512-169.84908555 24.89378187-148.14285698 22.08344363-134.93275149 47.61590742-224.22007052 11.07014212-38.71225429 22.9112498-86.910003 26.31445298-107.10771586 7.4805706-44.39114935 20.16705338-95.65002403 36.1578711-146.09831696 10.90651002-34.40855783 28.1557447-96.52812555 32.18798411-115.92180195l1.66870293-8.01349451zm-698.22850215 285.79121233c33.94108676-.45506948 69.17779525 7.1536509 111.01008306 22.68767668 82.42923939 40.17323057 133.61542697 108.68685175 144.75928966 199.58810001 2.8234288 73.19797757-4.62544884 151.38793987-87.93899054 218.13812375 0 21.87089415-2.23745365 32.41086827-3.2027108 54.55287496h-50.64361798l-.49124078-23.46139814c-.40511863-12.77846125-4.5934114-29.33906316-23.34737241-29.18059839-14.07821684.80093607-16.85100583 16.9064685-16.4369305 31.88517862v22.72832634c-15.89160498 1.56087798-25.71435378 1.78514008-44.71634661 2.30118405 0 0-1.1908972-11.50316433-1.1908972-23.18580724 0-23.53064036-5.77190699-33.48670626-19.4177906-33.48670626-13.41369828 0-17.04943128 2.64050535-17.60130206 28.3193768l-.62559136 28.94496817c-16.8241357-.68002056-32.47080928-.2514767-49.24464965-1.8030535l-.92185158-21.35553914c-1.03794424-24.06528672-5.8535508-32.20176367-19.06779016-32.20176367-12.23968102 0-16.55543458 7.51226355-18.26719858 31.8248931l-.37032528 24.04702882s-30.17754847-.82849515-45.37535336.6121563l-2.11274877-33.91077176-1.28528708-19.57901129c-69.43443929-47.5073935-101.04196006-125.57092847-95.85775067-221.75801028 8.20192979-95.10366506 70.0245483-174.4921033 163.01305318-209.94308373 27.3196708-10.17619413 52.93446737-15.41035438 79.33332007-15.7641442z"
				/>
				<path d="M1195.40389688 2673.04644632c-7.10335555-6.47673073-5.6261883-16.26468617-.84468612-23.62468575 8.84130069-17.7608003 33.56938353-4.96477014 34.50777055 9.39454943 0 18.19244455-20.87601097 27.01720978-33.66308443 14.23013632zM1038.274365 2630.7267071c-5.25000671-5.80118852-6.63726242-17.92029853-2.72249363-23.78315052 8.49302268-12.71955369 29.06243878-10.62161793 34.4364614 3.51275056 3.07662796 8.09203792-.28248067 18.77325238-7.39892679 23.52478405-6.19941738 4.13937538-19.19800686 2.3997078-24.31504097-3.25438409zm93.95720691-109.40097667c-6.57938834-10.04149907-2.88509228-22.14545158 8.75276711-28.67764498 11.6103003-5.56142444 22.81479299 2.3752491 25.844226 13.96350213 1.1636826 4.7718565.0482284 9.88062289-3.39183505 15.12856267-7.00586527 10.6922381-24.07631035 10.46590907-31.20515806-.41441982zm-31.01121096-87.4794427c-6.10261608-4.9416894-7.49710606-9.78106567-9.5351008-33.08641047-1.31284616-15.01384796-2.48479648-29.70801047-2.60433403-32.65373275-.18602386-4.59237792-3.40664807-5.35542024-22.60741084-5.35542024-41.76821292 0-82.78268472-12.48736835-90.91364985-27.67966142-5.5779599-10.4225035-2.38007195-24.58339761 7.15158396-31.66918424 7.44371032-5.53352087 12.41192534-6.31757699 36.72317693-5.79567672 15.46340563.33070909 34.6638239 1.48405702 42.66732825 2.560584l14.55257768 1.95738439-9.51305351-27.06681615c-7.84951793-22.3328534-22.67906447-57.6846211-25.89383237-61.72719517-.43646709-.54877038-10.28126316 3.16688398-21.87743942 8.256359-38.48420281 16.8909665-65.92754503 22.84717492-106.47213434 23.10760832-35.30801764 1.32042492-75.36239963-8.86679285-75.9966032-46.45532522 0-21.82714409 15.25085614-35.21672816 47.83052383-41.99385297l8.55744206-1.77997276-6.32653369-8.88470625c-6.25419108-8.78308211-10.72772043-19.37507402-13.11812703-29.90919184-5.3595541-29.38970298 2.22195166-47.25729475 30.2922632-55.97595748 20.4143962-6.0867696 41.57633275 1.39793486 58.46729925 15.04554091l-1.55467719-27.2679975c-1.87711854-17.57822133 4.73637418-33.61347808 15.38589569-44.81555935 13.56251736-14.26596314 33.67169665-20.69274303 51.12590206-12.48220102 10.19755243 5.26240831 29.97740059 31.74256032 34.29694352 45.91447807l3.50482732 11.4983415 8.3349024-14.558434c24.53758063-43.78863873 64.51238574-25.69471793 78.0780035 3.33086057 6.7867705 14.82369023 8.1867723 22.44825708 8.55882002 46.61103408.3754926 24.3839387-5.64100132 30.85584659-1.7665377 29.23640554 2.52475717-1.05516868 21.12542075-4.87589207 33.0219911-5.71954473 16.5878165-1.17573969 23.95539484-.33070908 31.60820975 3.6267763 19.40401106 10.03426482 28.80200538 50.03387311 15.67595511 66.72090235-9.03421432 11.48490643-32.76465809 25.66130254-64.98881351 38.82283513-24.80042546 10.12968817-38.84694934 14.11335469-71.62021965 20.3117386-6.423335 1.21466691-6.3864747 1.53262992 3.63848891 31.10594534 20.26867753 59.79461395 32.39295486 150.14330245 21.97768562 163.77816243-6.24488989 8.17540417-18.55415761 9.55680357-26.66135303 2.99188375z" />
				<path
					fill="#fff"
					d="M961.69488705 2200.5248276c10.58854702-3.19754345 11.37501456-4.03740673 6.39336448-6.82500873-5.73745813-3.211323-67.8708054-1.3056119-85.10488257 2.60984586-7.90876997 1.79719718-8.11925252 2.22780797-3.0600925 6.27003756 6.53736073 5.2231366 62.31213686 3.82141237 81.77161059-2.05487468zm183.64206581-15.86266794c35.33592122-12.91108936 59.81666123-26.6196699 59.81666123-33.49635193 0-8.59430235-15.73520716-7.33416294-46.083622 3.69085118-29.65633717 10.77353741-33.10880222 12.77846124-51.84519432 30.1072728l-13.77093298 12.73677811 13.77093298-2.0724436c7.5742715-1.13991287 24.72463795-6.0747125 38.1121551-10.96610656zm-36.76313762-63.72109536c18.41636216-26.91868603 14.99111172-97.95499745-3.59715027-62.68694048-11.46251467 22.38073731-31.41460715 79.9048267-31.41460715 90.57226162v9.19784642l10.10109561-7.70448821c5.55556814-4.23721015 16.76522816-17.4579948 24.91066181-29.37867934zm-148.57105634 10.9557719c-13.90907293-22.18300083-29.12651367-35.38931695-40.78021953-35.38931695-6.10881688 0-7.85227383 1.53056298-7.84331713 6.88563873.03444886 12.65065596 10.97334082 25.75121407 28.04309692 33.5428579 16.93506106 7.72998037 31.14280562 14.09096293 32.27513975 14.4492311.35964613.11368125-4.90276218-8.65562132-11.69470001-19.48841077zm71.94679486-22.38314873c-1.8812524-44.40871827-4.35330281-57.29810485-14.08097275-73.4270625-5.20453422-8.6290957-6.81191817-9.48480546-12.29755511-6.54907335-5.8173795 3.11348824-6.1656575 5.25896343-4.45458248 27.44540915 1.02071981 13.2369756 5.36988877 34.53601863 9.66462852 47.32998185 7.76718514 23.13757884 18.74879369 47.27934203 21.50642517 47.27934203.79439078 0 .6424713-18.93550653-.33759886-42.07859718z"
				/>
				<path d="M1078.1799279 1233.56212314c-6.38991959-2.9023167-13.31448554-8.24602433-19.43742645-14.49401462-19.7605568-19.0061267-21.31523398-45.0105399-15.0038578-68.18360107 3.75561505-13.37304861 10.17206028-25.4776901 18.33506285-33.09226677 23.95883973-22.34938885 67.78399426-18.20415717 93.20622169 8.81615302 19.15942413 20.36375638 23.85893802 40.70959936 15.70558113 67.99688823-10.50552526 35.15988753-57.62157968 54.93801325-92.80558141 38.95684121zm270.86210858 1.01899736c-17.8059283-4.78632502-29.07794077-12.5552326-38.67263809-26.65446325-15.12305085-22.22296152-16.33875123-55.25942114-2.77382245-75.3903032 17.28402804-25.64993442 47.29346606-35.7668765 77.13720506-26.00441322 38.73016769 12.66925834 54.36891803 47.18667458 45.1286995 77.16683107-4.19449356 13.60936782-11.6888437 26.14530907-21.39205494 35.49886435-21.11577507 19.54249549-43.56437664 19.66237753-59.42738908 15.38348426z" />
			</svg>
		</>
	);
};

export default GrimKitty;
