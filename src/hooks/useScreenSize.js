import { useMediaQuery } from 'react-responsive';

export const useScreenSize = () => {
  const isMobile = useMediaQuery({ query: `only screen and (max-width: 600px)` });
  return {
    isMobile,
  };
};
