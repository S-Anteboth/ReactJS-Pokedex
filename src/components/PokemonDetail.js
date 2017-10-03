import React from 'react';
import {Table, Col} from 'react-bootstrap';
import PokemonType from './PokemonType';
import {Radar} from 'react-chartjs-2';

const PokemonDetail = ({pokemon}) => {


    const types = pokemon.types.map((info) => {
        return info.type.name;
    });

    const abilities = pokemon.abilities.map((info) => {
        return info.ability.name;
    });
    const abilitiesText = abilities.join(',  ');

    const labels = pokemon.stats.map((info) => {
        return info.stat.name;
    });

    const data = pokemon.stats.map((info) => {
        return info.base_stat;
    });

    let chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Status values',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                data: data
            }
        ]
    };

    const options = {
        responsive: true,
    };


    return (
        <div>
            {/*Types: {pokemon.types}*/}

            <Col md={2}   >
                <img className='Aligner-item' src={pokemon.sprites.front_default} alt="pokemon"/>
            </Col>

            <Col md={6}  mdOffset={3}>
                <Radar data={chartData} width={500} height={500}
                       options={options}
                />
            </Col>


            <Table>
                <tbody condensed hover responsive>
                <tr>
                    <th>ID</th>
                    <td>{pokemon.id}</td>
                </tr>

                <tr>
                    <th>Height</th>
                    <td>{(pokemon.height * 0.1).toFixed(1)} m</td>
                </tr>

                <tr>
                    <th>Weight</th>
                    <td>{(pokemon.weight * 0.1).toFixed(1)} kg</td>
                </tr>

                <tr>
                    <th>Abilities</th>
                    <td>{abilitiesText}</td>
                </tr>

                <tr>
                    <th>Types</th>
                    <td>
                        {types.map(function (type) {
                            return <PokemonType type={type}/>;
                        })}

                    </td>
                </tr>
                </tbody>
            </Table>
        </div>
    )
};
export default PokemonDetail;
