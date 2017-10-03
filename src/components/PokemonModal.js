import React from 'react';
import PokemonDetail from './PokemonDetail';
import Dialog from 'material-ui/Dialog';

const PokemonModal = ({closeModal, showModal, pokemon}) => {

    return (
        <div>
            <Dialog
                title={(pokemon !== null ? pokemon.name : 'Loading...').toUpperCase()}
                modal={false}
                open={showModal}
                onRequestClose={closeModal}>


                {pokemon !== null ? <PokemonDetail pokemon={pokemon}/> : null}
            </Dialog>

        </div>
    )
};
export default PokemonModal;