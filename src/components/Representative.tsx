import React, { useEffect, useState } from "react";

const Representative = ({ name }: { name: string }) => {
    // State to store data from the backend
    const [representativeData, setRepresentativeData] = useState<any>(null);

    // Function to request data from the backend
    const fetchData = async () => {
        try {
            // Make an API request to your backend with the 'name' parameter
            const response = await fetch(`/api/rep`);
            if (response.ok) {
                const data = response.json();
                console.log(data);
                setRepresentativeData(data);
            } else {
                console.error("Failed to fetch data", response);
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
        }
    };

    useEffect(() => {
        // Fetch data when the component mounts or when the 'name' prop changes
        void fetchData();
    }, [name]);

    return (
        <div>
            <div>
                {/* Display the data from the backend */}
                {representativeData ? (
                    <div>
                        {/* Display the data properties here */}
                        <h2>{representativeData.name}</h2>
                        <p>{representativeData.description}</p>
                        {/* Add more elements to display other data properties */}
                    </div>
                ) : (
                    <p>Loading data...</p>
                )}
            </div>
        </div>
    );
};

export default Representative;
