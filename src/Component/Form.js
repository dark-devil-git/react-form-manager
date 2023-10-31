import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateArr } from "./Reducer";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../Scss/Style.scss" 

export const Form=()=>{
    const state=useSelector(
        ({data})=>data
    )

    const[tname,setTname]=useState("")
    const[tdesc,setTdesc]=useState("")
    const[tradio,setTradio]=useState("")
    const[fromind,setFormind]=useState(false)
    const[formIndvalue,setFormindValue]=useState(0)
    const[err,setErr]=useState(false)
    const[show,setShow]=useState(true)
    const[hide,setHide]=useState(false) 
    const[radioShow,setradioShow]=useState(true) 


    const[param]=useSearchParams()

//input onchange function
    const run=(e)=>{
        if(e.target.name==="taskName"){
            setTname(e.target.value)
        }
        else if(e.target.name==="taskDescription"){
            setTdesc(e.target.value)
        }
        else{
            if(e.target.value==="completed"){
                setradioShow(!radioShow)
                setTradio(e.target.value)
            }
            else{
                setradioShow(!radioShow)
                setTradio(e.target.value)
            }
        }
    } 
//form edit passing param value
    const formvalue=()=>{
        var getparamIndex=param.get("ind")
        var initialarr=state.arr.length
        if(getparamIndex && initialarr>0){
            setTname(state.arr[getparamIndex].taskname)
            setTdesc(state.arr[getparamIndex].taskdesc) 
            setFormind(true)
            setFormindValue(getparamIndex)

            var idd=document.getElementById(state.arr[getparamIndex].taskradio)
            idd.setAttribute("checked","") 
        }
    }
    useEffect(()=>{
        formvalue()
    },[])


//submit button function
    const dispatch=useDispatch()
    const access=(e)=>{
        e.preventDefault()
        if(tname==="" || tdesc==="" || tradio===""){
            setErr(true)
        }
        else{
            var gettingdate=new Date()
            var date=gettingdate.getDate()
            var month=gettingdate.getMonth()
            var year=gettingdate.getFullYear()
            var hours=gettingdate.getHours()
            var minutes=gettingdate.getMinutes()
            var seconds=gettingdate.getSeconds()
            var updateDate=`${date}-${month}-${year} ${hours}:${minutes}:${seconds}`

            if(fromind===true){
                var update=[...state.arr] 
                var editingobj_SNO=state.arr[formIndvalue].sno
                var colorr 
                if(tradio==="completed"){
                    colorr=true
                }
                else{
                    colorr=false
                }
                console.log(update)

                let obj={sno:editingobj_SNO,taskname:tname,taskdesc:tdesc,taskradio:tradio,torf:colorr,date:updateDate}
                update.splice(formIndvalue,1,obj)
                dispatch(updateArr(update))
                setFormind(false)
                setHide(true)
                setShow(false)
            }
            else{
                var update=[...state.arr]
                var colorr 
                if(tradio==="completed"){
                    colorr=true
                }
                else{
                    colorr=false
                }

                let obj={sno:update.length+1,taskname:tname,taskdesc:tdesc,taskradio:tradio,torf:colorr,date:updateDate}
                update[update.length]=obj
                dispatch(updateArr(update))
                setHide(true)
                setShow(false)
            }
        }
    } 

//move to home button
    var pageRender=useNavigate()
    const home=()=>{
        pageRender("/")
    }       

//submit anoother response button
    const backtoform=(e)=>{
        e.preventDefault()
        setTname("")
        setTdesc("")
        setTradio("")

        pageRender("/form")
        setHide(false)
        setShow(true)
    }

//move to home button
    const movetohome=(e)=>{
        e.preventDefault()
        pageRender("/")
    }

    return(
        <section className="form-background">
            <div className="form-container">
                <div className="col-12 row justify-content-center vh-100 align-items-center">
                    {show &&
                    (<form className="col-5 form-bdr">
                        <div className="col-12">
                            <input type="text" placeholder="Task name" name="taskName" value={tname} onChange={run}></input>
                            {err && tname==="" ? <p>Task name required</p>:""}
                        </div>
                        
                        <div className="col-12">
                            <textarea type="text" cols="50" rows="5" placeholder="Task description" name="taskDescription" value={tdesc} onChange={run}></textarea>
                            {err && tdesc==="" ? <p>Task description required</p>:""}
                        </div>

                        <div className="col-12 row radio justify-content-center">
                            <div className="col-5 text-center">
                                <label htmlFor="completed">Completed</label>
                                <input type="radio" id="completed" name="radio" value="completed" onChange={run}></input>
                            </div>
                            <div className="col-5 text-center">
                                <label htmlFor="notcompleted">Not Completed</label>
                                <input type="radio" id="notcompleted" name="radio" value="notcompleted" onChange={run}></input>
                            </div>
                            {err && tradio==="" ? <p>Task status required</p>:""}
                        </div>

                        <div className="col-12 row justify-content-center">
                            <div className="col-5 text-center">
                                <button type="submit" onClick={access}>Submit</button>
                            </div>
                            <div className="col-5 text-center">
                                <button type="submit" onClick={home}>Home</button>
                            </div>
                        </div>
                    </form>
                    )}

                    {hide && (
                        <div className="col-6 form-div2">
                            <div className="col-12">
                                <img src="https://cdn.pixabay.com/photo/2020/06/07/11/34/good-luck-5269978_1280.png" width="100%" height="200px"/>
                            </div>
                            <form className="col-12 row justify-content-between form-div2-btn">
                                <div className="col-6 text-center">
                                    <button type="submit" onClick={backtoform}>Submit another response</button>
                                </div>  
                                <div className="col-6 text-center">
                                    <button type="submit" onClick={movetohome}>Move to home</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}