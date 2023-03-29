import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api'
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {
    const [places, setPlaces] = useState([]);
    const [coords, setCoords] = useState({});
    const [bounds, setBounds] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [childClicked, setChildClicked] = useState(null);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
          setCoords({ lat: latitude, lng: longitude });
        });
      }, []);

    useEffect(() => {
          setIsLoading(true);
    
          getPlacesData(bounds.sw, bounds.ne)
            .then((data) => {
              setPlaces(data);
              setIsLoading(false);
            });
    }, [bounds, coords]);

    return (
        <>
        <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={places}
                        isLoading={isLoading}
                        childClicked={childClicked}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoords={setCoords}
                        setBounds={setBounds}
                        coords={coords}
                        places={places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;