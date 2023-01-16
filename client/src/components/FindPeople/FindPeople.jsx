import { useState, useEffect } from "react";
import "./FindPeople.css";

const FindPeople = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers()
            .then((data) => {
                setUsers(data.users);
                console.log("RES(DATA) Users from DB:", data); // data = fetched data from server
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        fetchMatchingUsers(search)
            .then((res) => setUsers(res))
            .catch((err) => console.log(err));
    }, [search]);

    const handleSearchChange = (event) => {
        console.log(event.target.value);
        setSearch(event.target.value);
    };

    return (
        <div className="find-people">
            <input
                type="text"
                onChange={handleSearchChange}
                placeholder="Pick new cherries 🍒 ... "
            />

            <ul>
                {users.map((user) => (
                    <li key={user?.id}>
                        {/* {user?.id} - {user?.firstname} - {user?.lastname} */}
                    </li>
                ))}
            </ul>
        </div>
    );

    async function fetchUsers() {
        const response = await fetch("/users");
        const data = await response.json();
        return data;
    }

    async function fetchMatchingUsers(search) {
        // Make API call to get users whose names match the search query
        const res = await fetch(`/users/search/?search=${search}`);
        const data = await res.json();
        return data;
    }
};

export default FindPeople;
