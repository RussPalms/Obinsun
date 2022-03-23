// import {
//   createContext,
//   useContext,
//   useState,
//   Dispatch,
//   ReactElement,
//   ReactNode,
//   SetStateAction,
// } from 'react';

// type ContextProps = {
//   lang: string | undefined;
//   setLang: Dispatch<SetStateAction<string | undefined>>;
//   colors: string[];
//   setColors: Dispatch<SetStateAction<string[]>>;
//   sizing: string[];
//   setSizing: Dispatch<SetStateAction<string[]>>;
//   reviews: string[];
//   setReviews: Dispatch<SetStateAction<string[]>>;
// };

// type Props = {
//   children: ReactNode;
// };

// const MdxComponentsContext = createContext({} as ContextProps);

// export function MdxComponentsProvider({ children }: Props): ReactElement {
//   const [lang, setLang] = useState<string | undefined>(undefined);
//   const [colors, setColors] = useState<string[]>([]);
//   const [sizing, setSizing] = useState<string[]>([]);
//   const [reviews, setReviews] = useState<string[]>([]);

//   return (
//     <MdxComponentsContext.Provider
//       value={{
//         lang,
//         setLang,
//         colors,
//         setColors,
//         sizing,
//         setSizing,
//         reviews,
//         setReviews,
//       }}
//     >
//       {children}
//     </MdxComponentsContext.Provider>
//   );
// }

// export function useMdxComponentsContext(): ContextProps {
//   return useContext(MdxComponentsContext);
// }

export default function t0() {}
