import React, { useState, useEffect } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import {
  Box, 
  OutlinedInput, 
  InputLabel, 
  MenuItem, 
  FormControl, 
  Select, 
  Chip, 
  Checkbox } from '@mui/material';

const ITEM_HEIGHT = 48;

const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 8.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const ImgStyled = styled('img')( 
  () => ({
    width: '30px',
    margin:'0 10px 0 0', 
    display: 'inline'
}));

const sxBoxStyle = { 
  display: 'flex', 
  flexWrap: 'wrap', 
  gap: 0.5 
};

const sxFormStyle = { 
  m: 2, 
  width: 300
};

const LabelStyled = styled(InputLabel)(({ theme }) => ({
  backgroundColor:'white', 
  padding:'0 10px 0 0'
}));

function getStyles( name, state, theme ) {
  return {
    fontWeight:
      state.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
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

  const isChecked = el => {

    const inDDBB = items.find( item => item.name === el.name );

    return inDDBB || items.indexOf(el) > -1 ? true : false;

  };

  const DropdownMultiSelect = () => (
      <FormControl sx={ sxFormStyle } >
        <LabelStyled 
          id={ `input-label-${ label }` } >{ label }
        </LabelStyled>
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
            <Box sx={ sxBoxStyle } >
              { selected.map( value => (
                <Chip
                  key={ value.itemId }  
                  label={ value.name } 
                />
              )) }
            </Box>
          ) }
          MenuProps={ MenuProps } >
          { options.map( ( el, index ) => (
            <MenuItem
              key={ index }
              value={ el }
              name={ el.name }
              style={ getStyles( el, items, theme ) }
            >
              <Checkbox 
                checked={ 
                  isChecked(el) } />
              <ImgStyled
                src={ el.image } 
                alt={ el.name } /> 
              { el.name } { el.description }
            </MenuItem>
          )) }
        </Select>
      </FormControl>
  );

  return [ 
    add, 
    remove, 
    DropdownMultiSelect, 
    setItems ]

}

export default MultipleSelectChip;