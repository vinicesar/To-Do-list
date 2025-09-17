import {  Box, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { green, pink, yellow } from "@mui/material/colors"
import { Controller } from "react-hook-form"




function RadiosField({control}: {control:any}){
    return(
        <>
            <p style={{
                position:"absolute",
                left:"65%",
                top:"7%",
            }}
                >Priority</p>
            <Box sx={{
                position:"absolute",
                left:"43%",
                top:"14%",
                height:"1.8rem",
                borderRadius:"20px",
                padding:".6rem",
                bgcolor:"#322d3d",
                border: "solid white 1.5px",
                alignItems: "center",
                justifyContent:"center",
                display:"flex",
                }}>

                <Controller
                    name={"priority"}
                    control={control}
                    render={({field}) => (
                        <RadioGroup {...field} row value={field.value} onChange={(e) => field.onChange(e.target.value)}>    
                    <FormControlLabel
                        value={"Max"}
                        control={
                            <Radio sx={{
                                color: pink[800], '&.Mui-checked': {
                                    color:pink[800]
                                }
                            }}/>
                        } 
                        label={"Max"}
                        />
                    <FormControlLabel
                        value={"Medium"}
                        control={
                            <Radio sx={{
                                color: yellow[800], '&.Mui-checked': {
                                    color:yellow[800]
                                }
                            }}/>
                        } 
                        label={"Medium"}/>
                    <FormControlLabel
                        value={"Low"}
                        control={
                            <Radio 
                            sx={{
                                color: green[800], '&.Mui-checked': {
                                    color:green[800]
                                }
                            }}/>
                        
                        } 
                        label={"Low"}/>
                </RadioGroup>
                    )}/>
            </Box>
        </>
    )
}

export default RadiosField