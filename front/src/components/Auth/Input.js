import React from 'react'
import { TextField,Grid ,InputAdornment,IconButton } from '@mui/material'
import {RxEyeClosed,RxEyeOpen} from 'react-icons/rx'
const Input = ({half,name,handleChange,label,autoFocus,type,handleShowpassword}) => {

  return (
    <div>
      <Grid item xs={12} sm={half ? 6:12}>
        <TextField
            name={name}
            fullWidth
            variant="outlined"
            size="small"
            required 
            onChange={handleChange}
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password'&&{
                endAdornment :(
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowpassword}>
                            {type==='password'? <RxEyeClosed /> : <RxEyeOpen />}

                        </IconButton>
                    </InputAdornment>
                )
             }}
        />
      </Grid>
    </div>
  )
}

export default Input
