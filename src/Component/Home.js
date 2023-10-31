import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { updateArr } from "./Reducer";
import { useNavigate } from "react-router-dom";
import "../Scss/Style.scss"

export const Home=()=>{
    const state=useSelector(
        ({data})=>data
    ) 
    const dispatch=useDispatch()
    const pageRender=useNavigate()


    const gotoform=()=>{
        pageRender(`/form`) 
    }


    const editt=(i)=>{
        pageRender(`/form?ind=${i}`)
    }


    const del=(i)=>{ 
        var deletedobj=[...state.arr]
        // console.log(deletedobj[i])
        deletedobj.splice(i,1)

        var updation=[...state.arr]
        var len=deletedobj.length
        var array=[]
        for(var i=0;i<len;i++){
            var b=updation[i]
            var obj={...b,sno:i+1}
            array[array.length]=obj
        } 

        if(array.length>=0){
            dispatch(updateArr(array))
        }
    }
    

    const clearData=()=>{
        dispatch(updateArr([]))
    }
    return(
        <section className="home-background">
            <div className="home-container">
                <div className="col-12 row justify-content-center vh-100 align-items-center">
                    <div className="col-7 row home-backdrop">
                        <table className="col-12">
                            <caption>Task-manager</caption>
                            <thead>
                                <tr className="text-center">
                                    <th>S.no</th>
                                    <th>Task name</th>
                                    <th>Task description</th>
                                    <th>Status</th>
                                    <th>Submitted time</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.arr.map((v,i)=>{
                                    return(
                                        <tr className="text-center" key={i}>
                                            <td>{v.sno}</td>
                                            <td>{v.taskname}</td>
                                            <td>{v.taskdesc}</td>
                                            <td style={{color: v.torf? "greenyellow":"orange"}}>{v.taskradio}</td>
                                            <td>{v.date}</td>
                                            <td onClick={()=>editt(i)}><BiEditAlt/></td>
                                            <td onClick={()=>del(i)}><MdOutlineDeleteOutline/></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        <div className="col-12 row justify-content-center table-button">
                            <div className="col-6 text-center">
                                <button onClick={gotoform}>Form</button>
                            </div>
                            <div className="col-6 text-center">
                                <button onClick={clearData}>Clear data</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}