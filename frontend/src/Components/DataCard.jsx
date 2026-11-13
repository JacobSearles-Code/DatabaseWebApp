import axios from "axios";
import {useEffect, useState} from "react";

function DataCard() {
    const [data, setData] = useState([]);
    const [gamePage, setGamePage] = useState(1);
    const [gamePagination, setGamePagination] = useState({});

    const handleOnLoad = async () => {
        try {
            const result = await axios.get("http://localhost:3000/data");
            setData(result.data.rows);
        } catch (error) {
            console.log(error);
        }
    }

    // Handle original Loading of data
    useEffect( () => {
        handleOnLoad();
    }, [])

    // Fetch normal games table
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const result = await axios.get("http://localhost:3000/data", {
                    params: {
                        page: gamePage,
                        pageSize: 5
                    }
                });

                setData(result.data.rows);
                setGamePagination(result.data.pagination);

            } catch (error) {
                console.log(error);
            }
        };

        fetchGames();
    }, [gamePage]);

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
                    <td>{game.title}</td>
                    <td>{game.type_name}</td>
                    <td>{game.about}</td>
                </tr>
            ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => setGamePage(gamePage - 1)} disabled={gamePage === 1}>Previous</button>
                <span>Page {gamePagination.page} of {gamePagination.totalPages}</span>
                <button onClick={() => setGamePage(gamePage + 1)} disabled={gamePage === gamePagination.totalPages}>Next</button>
            </div>
        </div>
    )
}

export default DataCard