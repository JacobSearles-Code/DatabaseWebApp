import axios from "axios";
import {useEffect, useState} from "react";

function FavDataCard() {
    const [favData, setFavData] = useState([]);
    const [favPage, setFavPage] = useState(1);
    const [favPagination, setFavPagination] = useState({});

    const handleOnLoad = async () => {
        try {
            const favResult = await axios.get("http://localhost:3000/favouritegames");
            setFavData(favResult.data.rows);
        } catch (error) {
            console.log(error);
        }
    }

    // Handle original Loading of data
    useEffect(() => {
        handleOnLoad();
    }, [])

    // Fetch Favourite games table
    useEffect(() => {
        const fetchFavGames = async () => {
            try {
                const result = await axios.get("http://localhost:3000/favouritegames", {
                    params: {
                        page: favPage,
                        pageSize: 15
                    }
                });

                setFavData(result.data.rows);
                setFavPagination(result.data.pagination);

            } catch (error) {
                console.log(error);
            }
        };

        fetchFavGames();
    }, [favPage]);

    return (
        <div>
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
                    {favData.map((favourites, index) => (
                        <tr key={index}>
                            <td>{favourites.full_name}</td>
                            <td>{favourites.title}</td>
                            <td>{favourites.hours_played}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => setFavPage(favPage - 1)} disabled={favPage === 1}>Previous</button>
                <span>Page {favPagination.page} of {favPagination.totalPages}</span>
                <button onClick={() => setFavPage(favPage + 1)} disabled={favPage === favPagination.totalPages}>Next</button>
            </div>
        </div>
    )
}

export default FavDataCard;