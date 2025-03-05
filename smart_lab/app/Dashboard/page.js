"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/")
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h1>User Dashboard</h1>

            <h1>FastAPI + Next.js</h1>
            {data ? <p>{data.message}</p> : <p>Loading...</p>}
        </div>
    );
}