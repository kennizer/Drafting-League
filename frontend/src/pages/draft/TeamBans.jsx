import { imageIconLink } from "../../assets/links"
import './bans.css'
export default function TeamBans(props) {
    return (<div className={`banContainer ${props.team ? 'blue' : 'red'}`}>
        {props.bans.slice(0,3).map((ban,index)=>{
            return (
                <img src={`${ban.length===0 ? imageIconLink+"NoChampion.jpg" : imageIconLink+ban+".jpg"}`}
                onClick={()=>{
                    props.select(index, props.team, true)
                }}
                onContextMenu={(e)=>{
                    e.preventDefault();
                    if (props.mode==='draft') {
                        props.deselect(index, props.team, true);
                    }
                    else {
                        if (props.currentTeam===props.team && props.currentPick===index) {
                            props.deselect();
                        }
                    }
                }}
                className={`ban ${props.currentTeam===props.team && props.currentBan===index && props.banning ? 'selecting' : ''} ${props.team? 'blue': 'red'}`} key={`playerPick${props.team ? 'Blue' : 'Red'}${index}`}/>
            )
        })}
        {
            props.bans.slice(3).map((ban,index)=>{
                return (
                    <img src={`${ban.length===0 ? imageIconLink+"NoChampion.jpg" : imageIconLink+ban+".jpg"}`}
                    onClick={()=>{
                        if (props.select) {
                            props.select(index+3, props.team, true)
                        }
                    }}
                    onContextMenu={(e)=>{
                        e.preventDefault();
                        if (props.mode==='draft') {
                            props.deselect(index+3, props.team, true);
                        }
                        else {
                            if (props.currentTeam===props.team && props.currentPick===index) {
                                props.deselect();
                            }
                        }
                    }}
                    alt={`ban${props.team ? 'Blue': 'Red'}`}
                    className={`ban ${props.currentTeam===props.team && props.currentBan===index+3 && props.banning ? 'selecting' : ''} ${props.team? 'blue': 'red'}`} key={`playerPick${props.team ? 'Blue' : 'Red'}${index}`}/>
                )
            })
        }
    </div>)
}