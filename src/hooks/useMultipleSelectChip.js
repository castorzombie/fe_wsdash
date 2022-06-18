import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;

const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    }
  }
};

const boxStyle = { 
  display: 'flex', 
  flexWrap: 'wrap', 
  gap: 0.5 
};

const imgStyle = {
  width: '25px',
  margin:'0 10px 0 0', 
  display: 'inline'
};

function getStyles( name, state, theme ) {
  return {
    fontWeight:
      state.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const MultipleSelectChip = ( 
  label, 
  defaultstate, 
  options ) => {

  const theme = useTheme();

  const [ items, setItems ] = useState([]);

  const [ add, setAdd ] = useState();

  const [ remove, setRemove ] = useState();


  useEffect( () => {

    if( Array.isArray( defaultstate ) ){

      setItems( defaultstate )

    }
    
  },[ defaultstate ] );

 
  const handleChange = ( event, item ) => {

    const { target: { value } } = event;

    let newer, duplicate;

    newer = value.filter( el => !items.find( sub => el.itemId === sub.itemId ) )[0];

    duplicate = value.find( ( el, i ) => value.find( ( sub, j ) => sub.itemId === el.itemId && i !== j ) );
    
    setRemove( null );

    setAdd( newer ? newer : null );
  
    if( !newer ){
      setRemove( duplicate ? duplicate : item.props.value );
    }

    setItems( duplicate ? value.filter( el => el.itemId !== duplicate.itemId ) : value );

  };


  const DropdownMultiSelect = () => (
      <FormControl 
        sx={{ m: 1, width: 300 }} >
        <InputLabel 
          id={ `input-label-${ label }` } >
            { label }
        </InputLabel>
        <Select 
          labelId={ `label-${ label }` }
          id={ `multiple-chip-${ label }` }
          multiple
          name={ label }
          value={ items }
          onChange={ ( event, item ) => handleChange( event, item ) }
          input={ 
            <OutlinedInput 
              id={ `select-multiple-chip-${ label }` } 
              label="Chip" 
            /> }
          renderValue={ selected => (
            <Box sx={ boxStyle } >
              { selected.map( value => (
                <Chip 
                  key={ value.itemId }  
                  label={ value.name } 
                />
              )) }
            </Box>
          ) }
          MenuProps={ MenuProps }
          //disabled={ !options.length }
        >
          { options.map( ( el, index ) => (
            <MenuItem
              key={ index }
              value={ el }
              name={ el.name }
              style={ getStyles( el, items, theme ) }
            >
              <img 
                src={ el.image } 
                alt={ el.name } 
                style={ imgStyle } 
              /> 
              { el.name } { el.description }
            </MenuItem>
          )) }
        </Select>
      </FormControl>
  );

  return [ 
    //items, 
    add, 
    remove, 
    DropdownMultiSelect, 
    setItems ]

}

export default MultipleSelectChip;