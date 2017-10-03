import React from 'react';
import SelectItemsPerPageButtons from './SelectItemsPerPageButtons';
import PaginationContainer from './PaginationContainer';
import PokeList from './PokeList';

const PokemonIndexList = ({display, options, selectedValue, allValue, onOptionSelected, listOfPokemon, bsSize, totalPages, activePage, onSelect, openModal, offset}) => {

    let style = {display: 'none'};

    if (display) {
        style.display = 'initial'
    }
    else {
        style.display = 'none'
    }

    return (
        <div style={style} className='pokemon-index-list'>
            <SelectItemsPerPageButtons
                options={options}
                selectedValue={selectedValue}
                allValue={allValue}
                onOptionSelected={onOptionSelected}/>

            <PokeList
                listOfPokemon={listOfPokemon}
                openModal={openModal}
                offset={offset}/>

            <PaginationContainer
                bsSize={bsSize}
                totalPages={totalPages}
                activePage={activePage}
                onSelect={onSelect}/>
        </div>
    )
};

export default PokemonIndexList;
