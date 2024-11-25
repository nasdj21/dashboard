

import Grid from '@mui/material/Grid2' 
import './App.css'
import IndicatorWeather from './components/IndicatorWeather'
import TableWeather from './components/TableWeather'
import ControlWeather from './components/ControlWeather'
import LineChartWeather from './components/LineChartWeather'

function App() {
  

  return (
    <Grid container spacing={5}>

        {/* Indicadores */}
        <Grid size={{xs : 12, md : 3}}>
          <IndicatorWeather title={"Indicator 1"} subtitle={"Unidad 1"} value={"1.23"}/>
        </Grid>

        <Grid size={{xs : 12, md : 3}}>
          <IndicatorWeather  title={"Indicator 2"} subtitle={"Unidad 2"} value={"3.12"}/>
        </Grid>

        <Grid size={{xs : 12, md : 3}}>
          <IndicatorWeather  title={"Indicator 3"} subtitle={"Unidad 3"} value={"2.31"}/>
        </Grid>

        <Grid size={{xs : 12, md : 3}}>
          <IndicatorWeather  title={"Indicator 4"} subtitle={"Unidad 4"} value={"3.21"}/>
        </Grid>
       
        {/* Tabla */}
        <Grid size={{xs : 12, md : 8}}>
           {/* Grid Anidado */}
           <Grid container spacing={2}>
                     <Grid size={{ xs: 12, md: 3 }}>
                         <ControlWeather/>
                     </Grid>
                     <Grid size={{ xs: 12, md: 9 }}>
                         <TableWeather/>
                     </Grid>
                 </Grid>

           </Grid>
       
        {/* Gráfico */}
        <Grid size={{xs : 12, md : 4}}>
          <LineChartWeather/>
        </Grid>
   
    </Grid>
  )
}

export default App
