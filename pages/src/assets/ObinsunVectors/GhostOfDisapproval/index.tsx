const GhostOfDisapproval = ({ id, name, className }: any) => {
  return (
    <>
      <svg
        name={name}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3000 3000"
      >
        <path
          fill="#fff"
          d="M1537.9533283 1090.78967386c-77.14152898.29077694-153.80978389 14.44773674-218.94811015 41.32321052-143.65938412 70.85777014-210.74397734 149.11013626-263.0838952 286.88260282-76.4782114 203.53084003-63.65612545 425.05696466-92.81495974 713.31217309-4.83901285 64.00935019-17.84511907 139.9743403-27.04398594 213.32296107-7.5770931 82.02097368-21.23301655 181.12038458 12.54840948 250.75183762 9.18377415 18.08805628 22.50724263 33.93249157 41.97226617 46.94835958 27.44913514 17.73033142 61.13488171 20.31803846 89.56968143 3.89433398 35.18214007-24.30652878 40.90497635-54.50745223 43.91943316-92.81495974 2.14046442-27.65371748 5.01285593-46.38743703 10.16853871-58.63136151 8.13330786-30.79196219 53.21584877-32.8733712 54.95337943 9.73583494.4015491 37.65097473 4.17437986 78.40149314 11.68300192 115.09920415 6.67845392 31.98892467 28.4273226 60.98374693 55.16973132 79.6174946 55.26001063 37.70317611 117.5083603 35.12218463 146.68657972-23.14965197 14.20486876-33.46087907 14.83910865-63.19337472 19.25531799-97.79105315 8.08110647-62.83204976 11.03477705-78.96843893 37.21252465-78.96843893 21.96563597 0 31.10655514 8.99456144 31.80372746 49.11187846-1.12800681 43.02460175-.32331626 82.05254375 7.13961229 122.8878721 7.15532809 38.37971712 32.52679278 53.52019529 59.06406529 67.28543701 58.22759696 19.74264629 95.30387185 9.8313067 117.6954268-16.87544722 32.11631267-40.23113542 30.82865547-88.03825623 32.23643123-133.4891146 1.3872137-42.83691216 5.04878765-78.82471204 11.25029815-85.02629178 14.40280478-14.40294324 31.6073838-15.70146996 45.2175445-.6487095 6.40180042 7.08014148 10.85352609 52.46197494 12.76476135 102.98349845 6.23231902 78.50125733 36.90582422 102.3648359 98.44010882 103.19985034 112.4518186.82843734 129.02305777-148.55357536 135.65263346-219.16446204-85.71210996 36.76971292-186.15269487 10.94242076-230.63111208-77.45397572-14.37628868-28.59258083-21.89460331-63.13272696-23.79870762-103.19985034-1.06092042-29.30609204-3.59677224-64.992107-4.32703775-126.78220608-.70437251-59.59764096-.97770283-100.87765033-.6487095-129.5947806-.04153956-15.73823248-.94793281-35.16019335 1.7308151-51.49174923 6.31941363-47.53794445 59.9115416-40.00246013 62.95839926 1.29811132 3.76874603 14.4283516 3.53030895 30.84492513 3.89433398 44.35213694.66878695 25.4802291.8538457 61.16659024.86540755 111.85392584.01384652 46.99266845.81597547 92.60449262 2.16351887 127.64761362-2.03329234 45.5800464 9.24400652 84.90921945 37.64522843 117.47907491 32.55711666 35.36297564 76.56495986 42.7303632 118.99353812 26.39493028 26.50002537-10.51456327 46.72771528-30.7338068 60.7948804-54.30432376 30.92911197-53.9410603 25.74552844-108.22052955 25.74552844-170.26928163v-168.32176847c0-482.25922676-7.55833108-564.25859987-62.09299171-681.9411494-46.81210983-101.01777713-125.51974954-175.41852579-229.54935264-219.59716582-40.23549707-17.08695283-84.3045419-29.57277603-131.75829949-37.42887653-34.27048514-5.77032985-69.43365548-8.5699579-104.49796166-8.43772362zm-385.53906353 484.19552423c14.79002273-.380087 29.66374768 5.52912345 43.91943317 17.52450289 40.90407633 34.41857368 20.43649544 105.27897466-32.45278313 112.07027772-12.74980712 1.63714339-29.62234657.29077694-37.42887654-3.02892642-39.35319676-16.736082-48.22646268-74.87783054-16.22639156-106.87783243 12.68791317-12.6879824 27.3985261-19.30786553 42.18861806-19.68802176zm536.11997723 55.16973131c54.19452085-2.47160396 90.12582693 64.78219375 45.65024826 109.25770319-25.6265176 25.62665607-66.0115571 27.01975452-89.78603331 3.24527831-34.67694976-34.67688053-24.53575793-88.21916102 20.12072554-106.87783242 8.30050459-3.46813807 16.2729851-5.2720628 24.01505951-5.62514908zm-287.09895471 93.03131163c30.84887139.22500596 61.3846037 15.2947284 77.02127195 48.2464709 29.62290043 62.42565438-11.22717446 130.46018817-78.31938328 130.46018817-14.61887973 0-36.11338783-5.8469011-47.81376714-12.98111325-27.23666027-16.60710165-41.5395624-44.95757606-41.5395624-81.78101347 0-53.03355932 45.56460754-84.27387185 90.65144087-83.94453235zm-953.56481707 86.92125739c-.72230376 57.45267643 29.57783 119.46078897 95.21553105 126.6374407-2.19460432 18.5514301-4.40997841 34.43276636-4.9148918 49.82781282.39116422 25.71949699.47770497 51.78861863 22.54995915 65.79596677 14.6030947 9.06254786 32.75664503 9.05777081 43.28810105-2.90776937 8.67346063-12.15800682 11.45418817-27.99531115 13.84845931-41.51560792 4.44736402-23.31401016 11.19996605-42.89340597 21.4053365-66.24867877 21.01908781-1.34698954 181.82323398 2.8772378 268.6668124 4.11068587 10.69380647-126.37691842 11.50950501-144.71393514 21.42728323-253.43425486-71.4501243-.42578051-162.0071319-5.0251101-250.42526742-7.60187838-53.60763607 1.18484678-118.23557957-9.51671375-165.3388125 7.6851652-20.29595325 7.6891807-37.27407243 20.28335293-47.53109041 39.45725337-13.65440033 26.567181-17.62129007 51.19667987-18.1916975 78.19386457zM2000.73001566 250.04623904c-42.96554634-.18969734-85.94743158.1834664-126.99855796 1.51446321-30.22833956.98026444-57.8439791 2.03481546-82.86277291 3.24527831-35.50247933 1.71773014-66.20700074 3.97679-92.81495974 6.49055663-269.71291703 21.53085521-258.495989 218.24636847-262.21848765 383.80824842-2.52068988 65.59235368 4.275321 123.90995304 20.7697812 171.99975057 22.97310882 59.42455945 57.38351306 93.18604649 99.73822014 115.7482598 77.3460421 39.29829532 153.65975683 49.20077313 232.79463095 51.70810112 100.80869466 3.10217452 206.22426525-.5102443 272.17067447.43270378-1.474516 5.66758866-7.48826768 35.99638472-13.41381702 67.285437-11.60469985 61.27680855-8.22898731 94.19400398 10.16853871 103.848906 18.86366915 9.89963929 36.70774973 5.74291374 61.44393605-14.27922457 34.30503221-27.76739741 64.1541848-63.79853691 96.49294183-115.74825981l28.34209726-45.65024826 50.1936379-6.49055663c146.70728027-19.10591403 228.18436261-96.98359329 253.99711592-242.96316966 6.86925897-95.93679632 4.9182842-162.83743852-14.49557646-263.0838952-23.2603549-115.31347906-90.22316797-179.498957-207.91416389-199.0437365-68.722152-11.41271784-196.49673823-18.25248372-325.3932388-18.82261421zM1638.556956 426.15667546c10.88918089-.32123928 16.2103296 5.48273761 23.36600385 14.92828024 9.93065548 13.10836278 11.01615348 22.54358975 7.13961228 56.25149075-2.55551387 22.22131198-1.3855521 50.51771572-2.16351887 59.71312095 27.70121105-4.4592028 51.7781645-2.17383453 75.07410496 5.40879719 43.45432853 14.3899275 65.99411049 49.17944948 69.88165966 106.01242487 4.13235567 73.5966812-61.01524776 120.07702838-123.10422398 121.37340889-24.40836994.05538608-43.40455029-5.74755232-62.3093436-13.41381702-16.4727904-5.0760653-19.95892894-15.9926623-22.28424441-29.6402086-11.39554816-67.96710122-12.53283214-262.6600532.86540755-297.7001972 5.48772235-14.3517111 19.53411768-22.51998142 33.53454256-22.93330007zm657.709738 116.83001925c9.59148496.28039205 19.33694323 2.09629402 29.85656047 5.40879719 59.43515205 18.71585754 84.7126681 48.00872615 88.48792199 103.19985034 4.36061556 63.75035102-10.75154647 92.45855029-64.47286247 122.02246455-26.39846114 14.52756192-37.98862215 16.65833378-72.26153043 13.41381702-35.64586005-3.37446635-55.86454973-14.1852067-76.37221629-40.89050673-39.1572685-50.99064364-28.86833428-130.62994651 22.28424442-173.2978619 21.64813524-18.05724777 41.65171921-27.85871521 62.74204737-29.64020858 3.16358384-.26723785 6.53867328-.31016207 9.73583494-.21600572zm-295.32032644 4.54338964c16.12101954-.12600334 32.02949498 3.8219859 46.7320077 12.33205759 55.36344414 32.04534925 77.26400146 97.872263 50.62634167 160.9658043-23.73653674 56.2218592-71.17880173 78.36071514-137.16709667 64.0401587-51.41746264-11.15842649-89.426093-68.37702748-83.72818046-125.70044664 6.44140147-64.80420972 61.2973014-106.92283362 116.61366736-111.20487017 2.30482262-.1779278 4.62023783-.41539563 6.9232604-.43270378zm-1.94716699 63.60745493c-1.2335173.00463858-2.44432631.09207936-3.67798209.21600572-16.44835129 1.66885192-32.14213643 13.78109599-40.89050673 33.96724634-14.65259601 33.80904983-12.76316902 48.39421329 8.6540755 67.06908512 21.73349905 18.9506253 49.28786774 18.0740713 68.58354834-1.94716699 19.72409194-20.46619623 15.25007338-72.2389606-7.57231607-90.21873708-7.78825255-6.13580877-16.46226704-9.1193186-25.09681895-9.08677928zm301.59453118.21600572c-1.55593354-.04153956-3.20387722.09623332-4.75974153.21600572-19.36207466 1.49327804-37.85057233 15.34471435-44.78484071 42.40496995-9.23784482 36.04934767-2.15008775 57.92712747 21.20248497 65.55462192 26.92047498 8.79288687 37.50316313 7.41121179 59.28041718-9.08677928 15.16747888-11.49067375 18.9695258-22.01181411 17.308151-46.29930392-2.30558418-33.70644712-24.90698315-52.2034604-48.24647091-52.78986055zm-600.5928397 10.81759437c-9.52599092.10384891-20.4722887 1.41026815-33.10183879 3.02892643.61547785 38.46958104-.72645771 68.45228332 2.81257454 94.54577484 24.05639137 10.27931088 49.114717 2.6513318 65.12191814-12.1157057 7.63296382-7.98930404 12.36487384-16.26502336 14.49557646-24.66411518 2.96557859-29.41236409-12.14810656-57.61447302-40.24145108-60.5785285-2.86629904-.27000715-5.91142589-.25062202-9.08677927-.21600572z"
        />
      </svg>
    </>
  );
};

export default GhostOfDisapproval;
