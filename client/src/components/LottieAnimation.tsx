import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/lotties/to-do-lottie.json';

interface LottieAnimationProps {
  width?: number;
  height?: number;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ width = 150, height = 150 }) => {
  return (
    <div className="flex justify-center items-center">
      <Lottie animationData={animationData} style={{ width, height }} />
    </div>
  );
};

export default LottieAnimation;
