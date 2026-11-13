import axios from "axios";
import {useEffect, useState} from "react";

function DataCard() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");

    const handleOnLoad = async () => {
        try {
            const result = await axios.get("http://localhost:3000/data");
            setData(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnSubmit = async () => {
        try {
            const result = await axios.get(`http://localhost:3000/data/${query}`);
            setData(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnChange = (e) => {
        setQuery(e.target.value)
    }

    useEffect( () => {
        handleOnLoad();
    }, [])

    useEffect(() => {

    }, [handleOnSubmit]);

    return (
        <div className="allGameDiv">
            <h1>Make your own Query</h1>
            <label htmlFor="queryInput">Enter Query: </label>
            <span><input name="queryInput" onChange={handleOnChange} type="text"/><button onClick={handleOnSubmit}>Submit</button></span>
            <table className="allGameTable">
                <thead>
                <tr>
                    <th className="allGameHead">Game Name</th>
                    <th className="allGameHead">Type</th>
                    <th className="allGameHead">Game Description</th>
                </tr>
                </thead>
                <tbody>
                {data.map((game) => (
                    <tr key={game.game_id}>
                        <td>{game.game_name}</td>
                        <td>{game.game_type}</td>
                        <td>{game.game_info}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default DataCard