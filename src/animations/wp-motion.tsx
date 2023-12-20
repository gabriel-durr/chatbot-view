import { useRef } from 'react';
import Lottie, { LottieComponentProps } from 'lottie-react';

import { Box } from '@chakra-ui/react';

import wwpData from './data/wp-connected.json';

type WpMotionProps = Omit<LottieComponentProps, 'animationData'> & {
	boxSize?: string;
};

export const WpMotion = ({ boxSize, ...props }: WpMotionProps) => {
	const lottieRef = useRef(null);

	return (
		<Box boxSize={boxSize}>
			<Lottie lottieRef={lottieRef} animationData={wwpData} aria-labelledby="use lottie animation" {...props} />
		</Box>
	);
};
