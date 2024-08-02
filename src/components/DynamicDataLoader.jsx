import { useState } from "react"
import useLRUCache from "../hooks/useLRUCache"

const DynamicDataLoader = () => {
    const [data, setData] = useState([])
    const { addToFront, get, moveToFront, removeLast, store } = useLRUCache()
    const loadData = async id => {
        await new Promise(res => setTimeout(res, 1700))
        const loadedData = {
            id,
            text: `Item ${id}`
        }
        store(id, loadedData)
        setData(prev => [...prev, loadedData])
    }
    const buttonClickHandler = id => {
        const cachedContent = get(id)
        if (cachedContent) {
            console.log(`Loaded from cache ${id}`)
            setData(prev => [...prev, cachedContent])
        } else {
            console.log(`Loading ${id}`)
            loadData(id)
        }
    }
    return (
        <div>
            <button onClick={() => buttonClickHandler('1')}>
                Tab 1
            </button>
            <button onClick={() => buttonClickHandler('2')}>
                Tab 2
            </button>
            <button onClick={() => buttonClickHandler('3')}>
                Tab 3
            </button>
            <button onClick={() => buttonClickHandler('4')}>
                Tab 4
            </button>
            <button onClick={() => buttonClickHandler('5')}>
                Tab 5
            </button>
            <div>
                <h3>
                    Loaded Data
                </h3>
                <ul>
                    {data.map(({ id, text }, i) => (
                        <li key={`${id}${i}`}>
                            {text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DynamicDataLoader