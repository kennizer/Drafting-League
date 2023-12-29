import names from "../../assets/names.jsx"
import ChampionsList from "./ChampionsList.jsx";
import { useState, useEffect } from 'react'
import './draft.css';
import TeamSelect from "./TeamSelect.jsx";
import { emptyBans, emptyTeam } from "../../assets/teams.jsx";
import { defaultPickOrder } from "../../assets/picks.jsx";
import TeamBans from "./TeamBans.jsx";
import DraftToolkit from "../misc/DraftToolkit.jsx";
export default function DraftLayout(props) {
    let [championInput, setChampionInput] = useState("");
    let [currentChampion, setCurrentChampion] = useState("");
    let [layouts,setLayouts] = useState([{}, {},{},{},{},{}, {}, {}, {}, {}])
    let [loadIndex, setLoadIndex] = useState(0);
    // this keeps track of the picking 
    let [pickPosition, setPickPosition] = useState(0);
    let [currentTeamPick, setCurrentTeamPick] = useState(true);
    let [blueTeam, setBlueTeam] = useState(emptyTeam);
    let [redTeam, setRedTeam] = useState(emptyTeam);
    let [blueBan, setBlueBan] = useState(emptyBans)
    let [redBan, setRedBan] = useState(emptyBans)
    let [banning, setBanning] = useState(false);
    let [index, setIndex] = useState(-1);
    let [previousPick, setPreviousPick] = useState(null);
    let [lastPick, setLastPick] = useState(-1)
    let [done, setDone] = useState(false);
    let [resetChampion, setResetChampion] = useState(false);
    // champions that already picked
    let [alreadyPicked, setAlreadyPicked] = useState([]);
    let selecting = (champion) => {
        setCurrentChampion(champion);
    }
    let deselect = (deselectIndex, team, ban) => {
        let championDeselect = '';
        if (team && !ban) {
            championDeselect = blueTeam[deselectIndex]
            setBlueTeam(blueTeam.map((champ, blueIndex) => {
                return blueIndex !== deselectIndex ? champ : ''
            }))
        }
        else if (!team && !ban) {
            championDeselect = redTeam[deselectIndex]
            setRedTeam(redTeam.map((champ, redIndex) => {
                return redIndex !== deselectIndex ? champ : ''
            }))
        }
        else if (team) {
            championDeselect = blueBan[deselectIndex]
            setBlueBan(blueBan.map((champ, blueIndex) => {
                return blueIndex !== deselectIndex ? champ : ''
            }))
        }
        else {
            championDeselect = redBan[deselectIndex]
            setRedBan(redBan.map((champ, redIndex) => {
                return redIndex !== deselectIndex ? champ : ''
            }))
        }
        let picked = alreadyPicked; 
        picked.splice(picked.indexOf(championDeselect),1);
        setAlreadyPicked(picked)
    }
    useEffect(() => {
        let previousChampion = ''; 
        // identify what was the last binding was previously
        if (previousPick!==null) {
            if (previousPick.team) {
                if (previousPick.banning) {
                    previousChampion = blueBan[previousPick.index]
                }
                else {
                    previousChampion = blueTeam[previousPick.index]
                }
            }
            else {
                if (previousPick.banning) {
                    previousChampion = redBan[previousPick.index]
                }
                else {
                    previousChampion = redTeam[previousPick.index]
                }
            }
            if (previousPick.team !== currentTeamPick || previousPick.banning!==banning || previousPick.index!==index) {
                setAlreadyPicked(alreadyPicked.includes(previousChampion) ? alreadyPicked : [...alreadyPicked, previousChampion])
            }
        }
        if (previousChampion !== currentChampion) {
            if (currentTeamPick && !banning) {
                setBlueTeam(blueTeam.map((champ, blueIndex) => {
                    return blueIndex !== index ? champ : currentChampion
                }))
            }
            else if (!currentTeamPick && !banning) {
                setRedTeam(redTeam.map((champ, redIndex) => {
                    return redIndex !== index ? champ : currentChampion
                }))
            }
            else if (currentTeamPick) {
                setBlueBan(blueBan.map((champ, blueIndex) => {
                    return blueIndex !== index ? champ : currentChampion
                }))
            }
            else {
                setRedBan(redBan.map((champ, redIndex) => {
                    return redIndex !== index ? champ : currentChampion
                }))
            }
            setPreviousPick({
                team: currentTeamPick, 
                banning: banning, 
                index: index
            })
        }
        
    }, [currentChampion, banning, currentTeamPick, index])
    let bindPick = (index, team, banning) => {
        setCurrentTeamPick(team)
        setBanning(banning)
        setIndex(index)
    }
    return (<div id="draftLayout">
        <div id="toolkit">
                <DraftToolkit layouts={layouts}/>
        </div>
        <div id="draftScreen">
            <div id="mainDrafting">
                <div id="leftDraft">
                    <TeamSelect mode='draft' deselect={deselect} select={bindPick} banning={banning} currentTeam={currentTeamPick} currentPick={index} players={blueTeam} team={true} />
                </div>
                <div id="centerDraft">
                    <input id="championDraftInput" type="text" placeholder="Enter in champion..." value={championInput} onChange={(e) => { setChampionInput(e.target.value) }} />
                    <ChampionsList mode='draft' alreadyPicked={alreadyPicked} setResetChampion={setResetChampion} resetChampion={resetChampion} selecting={selecting} name={championInput} />
                </div>
                <div id="rightDraft">
                    <TeamSelect mode='draft' deselect={deselect} select={bindPick} banning={banning} bans={redBan} currentTeam={currentTeamPick} currentPick={index} players={redTeam} team={false} />
                </div>

            </div>
            <div id="confirmDrafting">
                <TeamBans mode='draft' deselect={deselect} select={bindPick} team={true} currentTeam={currentTeamPick} currentBan={index} banning={banning} bans={blueBan} />
                <div id="banGap">&nbsp;</div>
                <TeamBans mode='draft' deselect={deselect} select={bindPick} team={false} currentTeam={currentTeamPick} currentBan={index} banning={banning} bans={redBan} />
            </div>
        </div>
       
    </div>)
}