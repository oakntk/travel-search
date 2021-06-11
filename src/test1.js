import React , { useState , useEffect} from 'react';
import ReactDom from "react-dom";
import axios from 'axios';

const App = () => {
const [allData,setAllData] = useState([]);
const [search, setSearch] = useState('');
const [filteredData,setFilteredData] = useState([]);

useEffect (() => {
    axios('http://localhost:9000/trips${search}')
    .then(response => {
        console.log(response.data)
        setAllData(response.data);
        setFilteredData(response.data);
    })
    .catch(error => {
        console.log('Error getting fakedata:' + error);
    })
    }, []);

useEffect (() => {
    setFilteredData(
        allData.filter((data) =>
        allData.title.include(search)
    )
);
},[search, allData]);

return(
    <div className = "App">
        <h1> เที่ยวกันไหม</h1>
        <input type = "text" placeholder = "Search..." onChange = {(e)=>
        setSearch(e.target.value)}
        />
        {filteredData.map((search,eid) => (
            <dataDetail key = {eid} {...allData} />
        ))}
        </div>
);        
}
const dataDetail =  (props) => {
    const {title, photos,} = props;

    return (
        <>
        <p>
            <img src = {photos} alt = '' style = {{width: "20px", height: "20px"}} />
            </p>
            <p> {title}</p>
            </>
    );
};
const rootElement = document.getElementById("root");
ReactDom.render(<App/>,rootElement);

export default App;

