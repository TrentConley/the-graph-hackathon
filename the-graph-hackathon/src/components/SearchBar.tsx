import React, { useState } from 'react';
import { getPunkDetails } from './query';


interface SearchBarProps {
    onSearch: (id: string) => void; // Function to handle the search
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSearch = () => {
        console.log('searching');
        getPunkDetails(inputValue).then(data => console.log(data)).catch(error => console.error(error));
         console.log('finished search');
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter CryptoPunk ID"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;