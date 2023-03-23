import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [gusses, setGusses] = useState([...Array(6)])
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedkeys] = useState({})


    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedguess = [...currentGuess].map((l) => {
            return { key: l, color: 'grey' }
        })

        //find any green letters
        formattedguess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                formattedguess[i].color = 'green'
                solutionArray[i] = null
            }
        })



        //find any yellow letters
        formattedguess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedguess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })

        return formattedguess
    }

    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }
        setGusses((prevGusses) => {
            let newGusses = [...prevGusses]
            newGusses[turn] = formattedGuess
            return newGusses
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })

        setTurn(turn + 1)

        setUsedkeys((prevUsedKeys) => {
            let newKeys = { ...prevUsedKeys }

            formattedGuess.forEach((l) => {
                const currentColor = newKeys[l.key]

                if (l.color === 'green') {
                    newKeys[l.key] = 'green'
                    return
                }
                if (l.color === 'yellow' && currentColor !== 'green') {
                    newKeys[l.key] = 'yellow'
                    return
                }
                if (l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[l.key] = 'grey'
                    return
                }
            })
            return newKeys
        })

        setCurrentGuess('')
    }

    const handleKeyup = ({ key }) => {

        if (key === "Enter") {
            if (turn > 5) {
                console.log("You used all your gusses")
                return
            }
            if (history.includes(currentGuess)) {
                console.log("You already tried this word")
                return
            }

            if (currentGuess.length !== 5) {
                console.log("word must be 5 char long")
                return
            }

            const formatted = formatGuess()
            addNewGuess(formatted)
        }

        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key
                })
            }
        }
    }


    return { turn, currentGuess, gusses, isCorrect, usedKeys, handleKeyup }
}

export default useWordle