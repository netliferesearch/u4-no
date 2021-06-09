import { useEffect } from 'react';
import littlefoot from 'littlefoot';

export default function Littlefoot(props) {
  useEffect(() => {
    littlefoot();
  }, []);
  return null;
}
