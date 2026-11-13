import axios from "axios";
import {useEffect, useState} from "react";

function DataCard() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const [sentQuery, setSentQuery] = useState("");
    const[error, setError] = useState("");
    const [gamePage, setGamePage] = useState(1);
    const [gamePagination, setGamePagination] = useState({});

    // Fetch normal games table, If you adjust the page size here adjust it in server.js too (or else I don't know what happens)
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const result = await axios.get(
                    `http://localhost:3000/data/${sentQuery}`,
                    {
                        params: {
                            page: gamePage,
                            pageSize: 5
                        }
                    }
                );

                setData(result.data.rows);
                setGamePagination(result.data.pagination);

            } catch (error) {
                setError(error.response?.data?.sqlMessage || "Something went wrong");
            }
        };

        fetchGames();
    }, [gamePage, sentQuery]);

    const handleOnSubmit = async () => {
        setError("");
        setGamePage(1);
        setSentQuery(query)
    }

    const handleOnChange = (e) => {
        setQuery(e.target.value)
    }

    return (
        <div className="allGameDiv">
            <h1>Make your own Query</h1>
            {error && <h3 className="sqlError" >{error}</h3>}
            <label htmlFor="queryInput">Enter Query: </label>
            <span><input name="queryInput" onChange={handleOnChange} type="text"/><button onClick={handleOnSubmit}>Submit</button></span>
            <table className="allGameTable">
                <thead>
                <tr>
                    {data.length > 0 && Object.keys(data[0]).map((column) => (
                        <th className="allGameHead" key={column}>
                            {column}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {Object.values(row).map((value, index) => (
                            <td key={index}>
                                {typeof value === "string" && !isNaN(Date.parse(value))
                                && /^\d{4}-\d{2}-\d{2}T/.test(value)
                                ? value.split("T")[0]
                                : value}
                            </td>
                        ))}
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