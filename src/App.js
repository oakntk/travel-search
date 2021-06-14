import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Card,
    TextField,
    CardMedia,
    CardHeader,
    CardContent,
  } from "@material-ui/core";
  

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 60
    },
    media:{
      paddingTop: '5%',

    },
    cardContent: {
      textAlign: "center"
    },
   // image:{
     // [theme.breakpoints.only('lg')]:{
       // Width:'400',
        //height:'400',
        //ObjectFit:'cover',
      //}
   // }
  }));  

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9000/trips")
      .then((response) => {
        setData(response.data);
        // alert(JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  useEffect(() => {
    setFilter(
      data.filter((data) =>
        data.title.includes(search) || data.tags.includes(search)
      )
    );
  }, [search, data]);

 
  return (
    <Card Width="sm">
      <form>
        <TextField id="outlined-basic" label="Search..." variant= "outlined" onChange = {(e) => setSearch(e.target.value)}/>
      </form>
      {filter.map((place,uid) => (
      <PlaceDetail key={uid} {...place} />
      ))}
    </Card>
  );
}

  const PlaceDetail = (props) => {
    const {title, description, photos, tags} = props;
    const listTags = tags.map((tags) =>
      <li>{tags}</li>
    )
    console.log({tags})
    const classes = useStyles();
  return (
    <Card className = {classes.root}>
      <CardHeader title = {title}/>
        <CardContent>
         <Typography  variant="h5" gutterBottom>
             {listTags}
         </Typography>
         <Typography variant="body2" color="textSecondary" component="p">
             {description}
        </Typography>
       </CardContent>
    <p>
          <CardContent style ={{Width:400, height:600}} cols = {2} rowHeight={164}>
           {photos.map((img) => (
            <img src = {img} style ={{width: "500px", height: "300px"}}>
              </img>
              ))}
            </CardContent>
      </p>
    </Card>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;