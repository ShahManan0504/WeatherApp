import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { blue } from '@mui/material/colors';

export default function ButtonAppBar() {
  const [data,setData]=React.useState("")
  const [weather,setWeather]=React.useState()
  const [isloading,setIsLoading]=React.useState(false)
  const handleChange = (e)=>
  {
    setData(e.target.value)
  }
  const handleClick=()=>{
    let apiKey='bcf71a78f2714a1c84e85029242402'
    setIsLoading(true)
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${data}&aqi=no`)
    
    .then((res)=>{  
      setIsLoading(false)
        console.log(res)  
        let current=res.data.current
        let location=res.data.location    
        setWeather({...weather,
          name:location.name,
          region:location.region,
          feelslike_c:current.feelslike_c,
          feelslike_f:current.feelslike_f,
          humidity:current.humidity,
          temp_c:current.temp_c,
          temp_f:current.temp_f
        })
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           <center> Weather Application By Manan Shah </center>
          </Typography>
        </Toolbar>
      </AppBar>
      <br/>
      <div className='main'>
        <div>
      {/* <TextField
          className='search'
          id="standard-search"
          label="Search City"
          type="search"
          variant="standard"
          onChange={(e)=>{handleChange(e)}}
        /> */}
        <TextField
          className='search'
          id="outlined-password-input"
          label="Search City"
          type="search"
          autoComplete="current-password"
          onChange={(e)=>{handleChange(e)}}
        />
        </div>
        <br/>
        <div>
        <Button variant="contained" onClick={()=>{handleClick()}}>Search</Button>
        </div>
        </div>
        
    </Box>
    <br/><br/><br/><br/><br/><br/>
    <center>
    {isloading?(<div>Loading.....<HourglassEmptyIcon/></div>):(weather && ( <Card sx={{ maxWidth: 500 }}>
       <CardActionArea>
        <CardContent style={{background:"skyblue"}}>
          <Typography gutterBottom variant="h5" component="div" style={{fontSize:"45px"}}>
            {weather.name},{weather.region}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" style={{fontSize:"30px",margin:"30px"}}>
            Feels Like in C<sup>.</sup> {weather.feelslike_c}<br/>
            Feels Like in F<sup>.</sup> {weather.feelslike_f}<br/>
            Humidity {weather.humidity}<br/>
            Temperature in C<sup>.</sup> {weather.temp_c}<br/>
            Temperature in F<sup>.</sup> {weather.temp_f}
          </Typography>
        </CardContent>
        </CardActionArea>
        </Card>))}
        </center>
    </>
  );
}