import names from "../../assets/names.jsx"
import ChampionsList from "./ChampionsList.jsx";
import { useState, useEffect } from 'react'
import './draft.css';
import TeamSelect from "./TeamSelect.jsx";
import { emptyBans, emptyTeam } from "../../assets/teams.jsx";
import { defaultPickOrder } from "../../assets/picks.jsx";
import TeamBans from "./TeamBans.jsx";
export default function VersusLayout(props) {
    let [championInput, setChampionInput] = useState("");
    let [currentChampion, setCurrentChampion] = useState("");
    // this keeps track of the picking 
    let [pickPosition, setPickPosition] = useState(0);
    let [currentTeamPick, setCurrentTeamPick] = useState(true);
    let [blueTeam, setBlueTeam] = useState(emptyTeam);
    let [redTeam, setRedTeam] = useState(emptyTeam);
    let [bluePick, setBluePick] = useState(-1);
    let [redPick, setRedPick] = useState(-1);
    let [blueBan, setBlueBan] = useState(emptyBans)
    let [redBan, setRedBan] = useState(emptyBans)
    let [banning, setBanning] = useState(false); 
    let [blueBanIndex, setBlueBanIndex] = useState(-1);
    let [redBanIndex, setRedBanIndex] = useState(-1);
    let [done, setDone] = useState(false);
    let [resetChampion, setResetChampion] = useState(false);
    // champions that already picked
    let [alreadyPicked, setAlreadyPicked] = useState([]);
    let selecting = (champion) => {
        setCurrentChampion(champion);
    }
    let confirmed = (champion) => {
        setPickPosition(pickPosition + 1);
    }
    let deselect = () => {
        setResetChampion(true)
    }
    useEffect(() => {
        // moves along with the pick ban phase
        if (pickPosition < defaultPickOrder.length) {
            switch (defaultPickOrder[pickPosition]) {
                case "B":
                    setBluePick(bluePick + 1)
                    setBanning(false);
                    break;
                case "R":
                    setRedPick(redPick + 1)
                    setBanning(false);
                    break;
                case "b":
                    setBlueBanIndex(blueBanIndex + 1)
                    setBanning(true)
                    break;
                case "r":
                    setRedBanIndex(redBanIndex + 1)
                    setBanning(true)
                    break;
            }
            setCurrentTeamPick(defaultPickOrder[pickPosition].toLocaleUpperCase() === 'B')
        }
        else {
            setDone(true)
            setBluePick(bluePick + 1)
            setRedPick(redPick + 1)
        }
        setAlreadyPicked([...alreadyPicked, currentChampion]);
        setResetChampion(true);
    }, [pickPosition])
    useEffect(() => {
        if (currentTeamPick && !banning) {
            setBlueTeam(blueTeam.map((champ, blueIndex) => {
                return blueIndex !== bluePick ? champ : currentChampion
            }))
        }
        else if (!currentTeamPick && !banning) {
            setRedTeam(redTeam.map((champ, redIndex) => {
                return redIndex !== redPick ? champ : currentChampion
            }))
        }
        else if (currentTeamPick) {
            setBlueBan(blueBan.map((champ, blueIndex) => {
                return blueIndex !== blueBanIndex ? champ : currentChampion
            }))
        }
        else {
            setRedBan(redBan.map((champ, redIndex) => {
                return redIndex !== redBanIndex ? champ : currentChampion
            }))
        }
    }, [currentChampion, banning])
    return (<div id="draftScreen">
        <div id="mainDrafting">
            <div id="leftDraft">
                <TeamSelect deselect={deselect} banning={banning} currentTeam={currentTeamPick} currentPick={bluePick} players={blueTeam} team={true} />
            </div>
            <div id="centerDraft">
                <input id="championDraftInput" type="text" placeholder="Enter in champion..." value={championInput} onChange={(e) => { setChampionInput(e.target.value) }} />
                <ChampionsList mode='versus' alreadyPicked={alreadyPicked} setResetChampion={setResetChampion} resetChampion={resetChampion} selecting={selecting} name={championInput} />
            </div>
            <div id="rightDraft">
                <TeamSelect deselect={deselect} banning={banning} bans={redBan} currentTeam={currentTeamPick} currentPick={redPick} players={redTeam} team={false} />
            </div> 
           
        </div>
        <div id="confirmDrafting">
            <TeamBans team={true} currentTeam={currentTeamPick} currentBan={blueBanIndex} banning={banning} bans={blueBan}/>
            <input id="championConfirm" onClick={confirmed} type="button" disabled={currentChampion.length === 0 || done} value={!done ? "Confirm" : "Done"} />
            <TeamBans team={false} currentTeam={currentTeamPick} currentBan={redBanIndex} banning={banning} bans={redBan}/>
        </div>
    </div>)
}