import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Members from "../components/members";
import Timer from "../components/timer";
import {membersActions} from "../components/membersSlice";
import {useDispatch} from "react-redux";
import {timerActions} from "../components/timerSlice";
import {getState, hasState} from "../helpers/storage";
import {useState} from "react";
import ShareableLink from "../components/shareableLink";
import {Stack, StackDivider} from "@chakra-ui/react";

export default function Home({query}) {
    const loadMembersState = membersActions.loadState;
    const loadTimerState = timerActions.loadState;
    const dispatch = useDispatch();
    const [initialStateLoaded, setInitialStateLoaded] = useState(false);
    if (!initialStateLoaded) {
        setInitialStateLoaded(true);
        buildInitialState();
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="A timer which can be used in mob programming"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Mob timer
                </h1>

                <Stack>
                    <Timer/>
                    <Members/>
                    <StackDivider/>
                    <StackDivider/>
                    <StackDivider/>
                    <StackDivider/>
                    <ShareableLink/>
                </Stack>
            </main>
        </div>
    );

    function buildInitialState() {
        let state;
        if (query && query["loadFrom"]) {
            try {
                const stateString = atob(query["loadFrom"]);
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

Home.getInitialProps = ({query}) => {
    return {query}
}
