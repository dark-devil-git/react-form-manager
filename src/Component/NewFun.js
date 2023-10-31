import React, { useState } from "react";

export const Fun=()=>{

    const[a,setA]=useState(false)

    const save=(e)=>{
        console.log(e.target.id,e)
    }

    return(
        <form>
            <label htmlFor="completed">Completed</label>
            <input type="radio" id="completed" name="radio" value={a}  onChange={save}></input>

            <label htmlFor="notcompleted">Not Completed</label>
            <input type="radio" id="notcompleted" name="radio" value="" onChange={save}></input>
        </form>
    )
}