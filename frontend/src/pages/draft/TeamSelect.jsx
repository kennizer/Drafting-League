import './team.css';

import { imageSplashLink, imageIconLink } from "../../assets/links";
export default function TeamSelect (props) {
    return (<div className={`team ${props.team ? 'blue': 'red'}`}>
        {props.players.map((champion,index)=>{
            return (<div
                onContextMenu={(e)=>{
                    e.preventDefault();
                    if (props.mode==='draft') {
                        props.deselect(index, props.team, false);
                    }
                    else {
                        if (props.currentTeam===props.team && props.currentPick===index) {
                            props.deselect();
                        }
                    }
                }}
                onClick={()=>{
                    if (props.select) {
                        props.select(index,props.team, false);
                    }
                }}
                style={{
                backgroundSize: `cover`,
                backgroundRepeat: `no-repeat`,
                backgroundImage: `url(${champion.length===0 ? imageSplashLink+"NoChampion.jpg" : imageSplashLink+champion+".jpg"})`
            }} className={`player ${props.currentTeam===props.team && props.currentPick===index && !props.banning ? 'selecting' : ''} ${props.team? 'blue': 'red'}`} key={`playerPick${props.team ? 'Blue' : 'Red'}${index}`}>
                &nbsp;
            </div>)
        })}
    </div>)
}