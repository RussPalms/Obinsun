import { ReactNode } from 'react';
import DarkModeToggle from './DarkModeToggle';

interface IProps {
  children: ReactNode;
  linebreak?: boolean;
}

const linebreakStyles = 'mt-24 md:mt-32 xl:mt-44';

const Glass = ({ children, linebreak = false }: IProps): JSX.Element => {
  return (
    <section>
      <div className="glass-container h-full w-full text-center p-[3em]">
        <DarkModeToggle />
        {children}
      </div>
    </section>
  );
};

export default Glass;
