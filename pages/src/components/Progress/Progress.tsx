import { useNProgress } from '@tanem/react-nprogress';
import { Bar } from './Bar';
import { Container } from './Container';

export const Progress = ({ isAnimating }: any) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });
  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
    </Container>
  );
};

export default function _() {
  const div = document.createElement('div');
  return div;
}
