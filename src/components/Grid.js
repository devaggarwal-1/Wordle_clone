import React from 'react'
import Row from './Row'

export default function Grid({ gusses, currentGuess, turn }) {
    return (
        <div>
            {gusses.map((g, i) => {
                if (turn === i) {
                    return <Row key={i} currentGuess={currentGuess} />
                }
                return <Row key={i} guess={g} />
            })}
        </div>
    )
}
