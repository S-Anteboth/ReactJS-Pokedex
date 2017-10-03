import React from 'react';
import {ListGroup, ListGroupItem, Col} from 'react-bootstrap';

const PokeList = ({listOfPokemon, openModal, offset}) => {

    let pokemon = listOfPokemon.map((creature, i) => {
        let index = i + 1 + offset;
        return (
            <Col sm={6} md={3} key={creature.name}>
                <ListGroupItem
                    className='PokeList-item'
                    onClick={openModal.bind(null, creature)}>

                    <img className='list-image'
                         src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + index + ".png"}
                         alt="pokemon"/>

                    {creature.name}

                </ListGroupItem>
            </Col>
        )
    });

    return (
        <Col sm={8} md={10} smOffset={2} mdOffset={1}>
            <ListGroup>
                {pokemon}
            </ListGroup>
        </Col>
    )

};
export default PokeList;