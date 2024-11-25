

import Grid from '@mui/material/Grid2' 
import './App.css'
import IndicatorWeather from './components/IndicatorWeather'

function App() {
  

  return (
    <Grid container spacing={5}>

        {/* Indicadores */}
        <Grid size={{xs : 12, md : 3}}>
          <IndicatorWeather />
        </Grid>

        <Grid size={{xs : 12, md : 3}}>
          <IndicatorWeather />
        </Grid>

        <Grid size={{xs : 12, md : 3}}>
          <IndicatorWeather />
        </Grid>

        <Grid size={{xs : 12, md : 3}}>
          <IndicatorWeather />
        </Grid>
       
        {/* Tabla */}
        <Grid size={{xs : 12, md : 8}}>
          Elemento: Tabla
        </Grid>
       
        {/* Gráfico */}
        <Grid size={{xs : 12, md : 4}}>
          Elemento: Gráfico 1
        </Grid>
   
    </Grid>
  )
}

export default App
