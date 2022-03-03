// import TestContent from 'pages/src/components/TestContent';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  // props: AppProps;
};

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const Content = ({ children, title, description }: Props): JSX.Element => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />
      <div
        key="content"
        className="z-[49] relative w-[85%] flex items-center justify-center flex-col text-center overflow-hidden rounded-[0.625]em"
      >
        <div className="relative min-h-[45em] rounded-[0.625em] h-full w-full border border-gray-300/0 dark:border-gray-800/0 bg-gray-800/20 dark:bg-gray-300/20 pl-[6em] pt-[12em] pr-[2em] pb-[1em] xl:px-48 4vl:p-32">
          <motion.div
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ type: 'linear' }}
            className="w-full h-full flex flex-col items-center justify-center z-[60]"
          >
            {children}
          </motion.div>

          {/* <TestContent /> */}
        </div>
      </div>
    </>
  );
};

export default Content;
