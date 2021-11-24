import styles from '../styles/Home.module.css'
import {membersActions} from "../components/membersSlice";
import {useDispatch} from "react-redux";
import {timerActions} from "../components/timerSlice";
import {getState, hasState} from "../helpers/storage";
import {useState} from "react";
import {HStack, Link, Spacer} from "@chakra-ui/react";
import {askForNotificationPermission} from "../helpers/notificationManager";
import Application from "../components/application";
import AppInfo from "../components/appInfo";

export default function Home() {
    const loadMembersState = membersActions.loadState;
    const loadTimerState = timerActions.loadState;
    const dispatch = useDispatch();
    const [initialStateLoaded, setInitialStateLoaded] = useState(false);
    if (!initialStateLoaded) {
        setInitialStateLoaded(true);
        buildInitialState();
    }
    askForNotificationPermission();
    return (
        <div className={styles.container}>
            <AppInfo/>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Mob timer
                </h1>


                <Application/>

            </main>

            <footer>
                <HStack spacing={6}>
                    <Link href="https://github.com/koundinyagoparaju/neomobtimer">Github</Link>
                    <Link href="https://github.com/koundinyagoparaju/neomobtimer/issues/new">Report Issue</Link>
                </HStack>
            </footer>
        </div>
    );

    function buildInitialState() {
        let state;
        const queryParams = typeof window !== "undefined" && window.location && new URLSearchParams(window.location.search);
        if (queryParams && queryParams.has("loadFrom")) {
            try {
                const stateString = atob(queryParams.get("loadFrom"));
                state = JSON.parse(stateString);
            } catch (e) {
                console.log("unable to load state from url");
            }
        } else if (hasState()) {
            state = getState();
        }
        if (state && state.members) {
            dispatch(loadMembersState(state.members));
        }
        if (state && state.timer) {
            dispatch(loadTimerState(state.timer));
        }
    }
}
