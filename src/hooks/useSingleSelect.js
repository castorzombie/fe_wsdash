import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const sxFormStyle = { 
  m: 2, 
  width: 300
};

const useSingleSelect = ( label, defaultValue, options ) => {

    const [ state, setState ] = useState('');

    const [ isEvent, setIsEvent ]  = useState( false );

    useEffect( () => {

        if( defaultValue ){
    
          setState( defaultValue );

          setIsEvent( false );
    
        }

      }, [ defaultValue ] );
    

    const handleChange = event => {

        setState( event.target.value );

        setIsEvent( true );

    };

    const SingleSelect = () => (
        <FormControl sx={ sxFormStyle } >
        <InputLabel id="single-select-label">{ label }</InputLabel>
        <Select
          labelId="single-select-label"
          id="single-select"
          value={ state }
          defaultValue={ state }
          label={ label }
          onChange={ handleChange }
        >
        {options.map( ( el, index ) =>
            <MenuItem
                key={ index }
                value={ el }
                name={ el.name } >
                { el }
            </MenuItem>)}
         </Select>
      </FormControl>
    );

    return [ state, SingleSelect, isEvent ];
    
    }

    export default useSingleSelect;


