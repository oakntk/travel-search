import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import {ImageList} from '@material-ui/core/ImageList';
import {ImageListItem} from '@material-ui/core/ImageListItem';
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
          <ImageList sx ={{Width:500, height:450}} cols = {2} rowHeight={164}>
           {photos.map((img) => (
            <ImageListItem key = {img.data}>
              <img 
              srcSet={$`{img.img}?w=164&h=164&fit=crop&auto=format 1x, ${img.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              loading="lazy" 
            />
        </ImageListItem>
              ))}
            </ImageList>
      </p>
    </Card>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;