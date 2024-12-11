

import Grid from '@mui/material/Grid2' 
import './App.css'
import IndicatorWeather from './components/IndicatorWeather'
import TableWeather from './components/TableWeather'
import ControlWeather from './components/ControlWeather'
import LineChartWeather from './components/LineChartWeather'
import {useEffect, useState} from "react"
import Item from "./interface/item"

interface Indicator{
  title?: String;
  subtitle?: String;
  value?: String;
}

function App() {

  let[indicators, setIndicators] = useState<Indicator[]>([]) //Preguntar
  let[owm, setOWM] = useState(localStorage.getItem("openWeatherMap"))
  let[items, setItems] = useState<Item[]>([]);

  useEffect( ()=> {
    let request = async () => {
      //Referencias a las claves LocalSotrage: openWeatherMap y expirinTime
    let savedTextHTML = localStorage.getItem("openWeatherMap") || "";
    let expiringTime = localStorage.getItem("expiringTime");

    //Obtengo la estampa del tiempo actual
    let nowTime = (new Date()).getTime();

    //VErifico si no existe la clave expiringTime o si la estampa de tiempo actual es mayor al tiempo de expiracion para realizar la petición asíncronca
    if(expiringTime === null || nowTime > parseInt(expiringTime)){
    
      //Request
      
      let API_KEY = "6fec23be38b0af8df6ccd3c5ee447c6e"
      let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
      let savedTextHTML = await response.text();

      //Tiempo de expiración
      let hours = 0.01
      let delay = hours * 3600000
      let expiringTime = nowTime + delay

      //Almaceno en el local storage el texto en la clave openWeatherMap, estampa actual y estampa de tiempo de expiración
      localStorage.setItem("openWeatherMap", savedTextHTML)
      localStorage.setItem("exporingTime", expiringTime.toString())
      localStorage.setItem("notTime", nowTime.toString())

      //Date time
      localStorage.setItem("expiringDateTime", new Date(expiringTime).toString())
      localStorage.setItem("nowDateTime", new Date(nowTime).toString())

      setOWM(savedTextHTML)
    }

    if(savedTextHTML){
      //XML parser
      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextHTML, "application/xml")
      const itemArray = Array.from(xml.getElementsByTagName("time")) //Para obtener los elementos de tipo time

      const dataToItems: Item[] = itemArray.slice(0, 7).map((tiempo) => {
        const fullDateStart = tiempo.getAttribute("from") || "";
        const fullDateEnd = tiempo.getAttribute("to") || "";
        const dateStart = fullDateStart.split("T")[1]?.slice(0, 5) || ""; // Obtiene solo la hora
        const dateEnd = fullDateEnd.split("T")[1]?.slice(0, 5) || ""; // Obtengo solo la hora 

         // Combina las horas de inicio y fin en un intervalo
        const intervaloHorario = `${dateStart} - ${dateEnd}`;

        return{
          intervaloHorario,
          precipitation: tiempo.getElementsByTagName("precipitation")[0]?.getAttribute("probability") || "",
          humidity: tiempo.getElementsByTagName("humidity")[0]?.getAttribute("value") || "",
          clouds: tiempo.getElementsByTagName("clouds")[0]?.getAttribute("all") || ""
        }
      })

      setItems(dataToItems)
      console.log(dataToItems)



      //Areglo para agregar los resultados
      let dataToIndicators : Indicator[] = new Array<Indicator>();

       {/* Análisis, extracción y almacenamiento del contenido del XML en el arreglo de resultados*/}

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

    }

      request();  

    }, [owm])

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
                         <TableWeather itemsln={items}/>
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
