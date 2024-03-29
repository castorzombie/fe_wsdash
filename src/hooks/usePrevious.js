import { useRef, useEffect } from 'react';

export default function usePrevious( val ) {

    const ref = useRef();

    useEffect(() => {

      ref.current = val;

    });
    
    return ref.current;

};