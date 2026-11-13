import axios from "axios";
import {useEffect, useState} from "react";

function DataCard() {
    const [data, setData] = useState([]);
    const [favData, setFavData] = useState([]);

    const handleOnLoad = async () => {
        try {
            const result = await axios.get("http://localhost:3000/data");
            setData(result.data);

            const favResult = await axios.get("http://localhost:3000/favouritegames");
            setFavData(favResult.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        handleOnLoad();
    }, [])

    return (
        <div className="allGameDiv">
            <h1>All Games Table</h1>
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
            <h1>Favourite Games Table</h1>
            <table className="allGameTable">
                <thead>
                    <tr>
                        <th className="allGameHead">Person Name</th>
                        <th className="allGameHead">Favourite Game</th>
                        <th className="allGameHead">Hours Played</th>
                    </tr>
                </thead>
                <tbody>
                {favData.map((favourites) => (
                    <tr key={favourites.game_id}>
                        <td>{favourites.full_name}</td>
                        <td>{favourites.game_name}</td>
                        <td>{favourites.hours_played}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default DataCard