

import Grid from '@mui/material/Grid2' 
import './App.css'
import IndicatorWeather from './components/IndicatorWeather'
import TableWeather from './components/TableWeather'
import ControlWeather from './components/ControlWeather'
import LineChartWeather from './components/LineChartWeather'
import {useEffect, useState} from "react"

interface Indicator{
  title?: String;
  subtitle?: String;
  value?: String;
}

function App() {

  let[indicators, setIndicators] = useState<Indicator[]>([])

  useEffect( ()=> {
    let request = async () => {

      //Request
      
      let API_KEY = "6fec23be38b0af8df6ccd3c5ee447c6e"
      let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
      let saveTextHTML = await response.text();


      //XML parser
      const parser = new DOMParser();
      const xml = parser.parseFromString(saveTextHTML, "application/xml")

      //Areglo para agregar los resultados
      let dataToIndicators : Indicator[] = new Array<Indicator>();

       {/* 
                 Análisis, extracción y almacenamiento del contenido del XML 
                 en el arreglo de resultados
             */}

             let name = xml.getElementsByTagName("name")[0].innerHTML || ""
             dataToIndicators.push({"title":"Location", "subtitle": "City", "value": name})

             let location = xml.getElementsByTagName("location")[1]

             let latitude = location.getAttribute("latitude") || ""
             dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude })

             let longitude = location.getAttribute("longitude") || ""
             dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })

             let altitude = location.getAttribute("altitude") || ""
             dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })

             console.log( dataToIndicators )

              {/* Modificación de la variable de estado mediante la función de actualización */}
              setIndicators( dataToIndicators )

    }

      request();  

    }, [])

    let renderIndicators = () => {
      return indicators.map(
        (indicator, idx) => (
          <Grid key={idx} size={{ xs: 12, xl: 3 }}>
          <IndicatorWeather 
              title={indicator["title"]} 
              subtitle={indicator["subtitle"]} 
              value={indicator["value"]} />
          </Grid>
        )
      )
    }

  
  

  return (
    <Grid container spacing={5}>

        {renderIndicators()}
       
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
