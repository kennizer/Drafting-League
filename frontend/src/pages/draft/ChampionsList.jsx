import names from "../../assets/names"
import { imageLink } from "../../assets/links"
import {useState, useEffect} from 'react';
import './championsList.css';
export default function ChampionsList (props) {
    let [selectIndex, setSelectIndex] = useState(-1); 
    let selectChampion = (index) => {
        setSelectIndex(index===selectIndex ? -1 : index); 
    }
    useEffect(()=>{
        if (props.resetChampion) {
            setSelectIndex(-1);
        }
        props.setResetChampion(false)
    }, [props.resetChampion])
    useEffect(()=>{
        props.selecting(selectIndex!== -1 ? names[selectIndex] : '')
    }, [props, selectIndex])
    return (<div id="championsList">
        {names.filter((name)=>{
            return name.toLowerCase().includes(props.name.toLowerCase())
        }).map((name, index)=>{
            return (
            <img
            style={{
                filter: `grayscale(${props.alreadyPicked.includes(name) ? '100%': '0%'})`
            }}
            key={"champion"+index}
            className={`champion_image ${selectIndex>=0 && names[selectIndex]===name ? 'champion_selected' : ''}`}
            alt={name}
            onClick={()=>{
                if (!props.alreadyPicked.includes(name)) {
                    selectChampion(names.indexOf(name))
                }
            }}
            
            src={`${imageLink}${name.length>0 ? name : 'NoChampion'}.png`}/>)
        })}
    </div>)}