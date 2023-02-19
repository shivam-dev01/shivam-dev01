import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export function useOrientation() {
  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  const [orientation, setOrientation] = useState(
    isPortrait() ? 'PORTRAIT' : 'LANDSCAPE',
  );

  useEffect(() => {
    const callback = () =>
      setOrientation(isPortrait() ? 'PORTRAIT' : 'LANDSCAPE');

    Dimensions.addEventListener('change', callback);

    return () => {
      Dimensions.addEventListener('change', callback);
    };
  }, []);

  return orientation;
}
