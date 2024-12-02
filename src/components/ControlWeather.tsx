import { Typography, Paper, Box, InputLabel, 
    MenuItem, FormControl, Select, SelectChangeEvent } from "@mui/material";

import { useState, useRef } from 'react';

export default function ControlWeather(){

    let[selected, setSelected] =  useState(-1);
    const descriptionRef = useRef<HTMLDivElement>(null)

     {/* Arreglo de objetos */}
     let items = [
        {"name":"Precipitación", "description":"Cantidad de agua que cae sobre una superficie en un período específico."}, 
        {"name": "Humedad", "description":"Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje."}, 
        {"name":"Nubosidad", "description":"Grado de cobertura del cielo por nubes, afectando la visibilidad y la cantidad de luz solar recibida."}
    ]
 
    //Manejador de evento
    const handleChange = (event: SelectChangeEvent) =>{
        let idx = parseInt(event.target.value)
        setSelected(idx);
    

    //Modificador de la referencia descriptionRef
    if(descriptionRef.current !== null){
        descriptionRef.current.innerHTML = (idx >= 0)?items[idx]["description"] : ""
    }

    };

    let options = items.map((item, key) => <MenuItem key={key} value={key}>{item["name"]}</MenuItem>)

      {/* JSX */}
      return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >

            <Typography ref={descriptionRef} mb={2} component="h3" variant="h6" color="primary"/>
    

            <Box sx={{ minWidth: 120 }}>
                   
                <FormControl fullWidth>
                    <InputLabel id="simple-select-label">Variables</InputLabel>
                    <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        label="Variables"
                        defaultValue='-1'
                        onChange={handleChange}
                    >
                        <MenuItem key="-1" value="-1" disabled>Seleccione una variable</MenuItem>

                        {options}

                    </Select>
                </FormControl>

            </Box>


        </Paper>


    )
}