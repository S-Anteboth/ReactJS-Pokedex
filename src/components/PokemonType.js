import React from 'react';
import {Label} from 'react-bootstrap';

const PokemonType = ({type}) => {

    return (

        <Label className={type} bsClass="type-label" >
            {type}
        </Label>
    )
};
export default PokemonType;