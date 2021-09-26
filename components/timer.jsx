import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    Button, HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper, Spacer, Stack, StackDivider,
    Text
} from "@chakra-ui/react";
import {timerActions} from "./timerSlice";
import {tickerActions} from "./tickerSlice";
import {membersActions} from "./membersSlice";

export default function Timer() {
    const {remainingSeconds, isRunning, isStarted} = useSelector((state) => state.timer);
    const {tickerId} = useSelector((state) => state.ticker);
    const dispatch = useDispatch();
    const [timeInSecs, setTimeInSecs] = useState(20 * 60);
    useEffect(() => {
        if(isRunning && tickerId < 0) {
            let {tickerCreated} = tickerActions;
            let createdTickerId = setInterval(() => {
                let {tick} = timerActions;
                dispatch(tick());
            }, 1000);
            dispatch(tickerCreated(createdTickerId));
        }
    },  [isRunning, tickerId, dispatch]);

    if(remainingSeconds <= 0) {
        let {finished} = timerActions;
        playSound();
        dispatch(finished());
    }

    return (<Stack alignItems="center">
        <Text fontWeight="bold" fontSize="40"
              fontFamily="Arial,Helvetica,sans-serif">{formatTime(remainingSeconds)}</Text>
        <StackDivider/>
        <HStack>
            <NumberInput defaultValue={20} min={1} value={timeInSecs / 60} onChange={onChange} width="5rem">
                <NumberInputField/>
                <NumberInputStepper>
                    <NumberIncrementStepper/>
                    <NumberDecrementStepper/>
                </NumberInputStepper>
            </NumberInput>
            {isStarted ? (isRunning ?
                <Button name="pauseTimer" onClick={pauseTimer}>Pause</Button> :
                    <Button name="resumeTimer" onClick={resume}>Resume</Button>):
                <Button name="startTimer" onClick={startTimer}>Start</Button>}
            <Button name="resetTimer" onClick={resetTimer}>Reset</Button>
        </HStack>
    </Stack>);

    function onChange(event) {
        setTimeInSecs(parseInt(event) * 60);
    }

    function resetTimer() {
        let {reset} = timerActions;
        dispatch(reset());
    }

    function pauseTimer() {
        let {pause} = timerActions;
        dispatch(pause());
    }

    function startTimer() {
        let {setTime, start} = timerActions;
        let startMembers = membersActions.start;
        dispatch(setTime(timeInSecs));
        dispatch(start());
        dispatch(startMembers())
    }

    function resume() {
        let {resume} = timerActions;
        dispatch(resume());
    }

    function formatTime(numOfSeconds) {
        let minutes= Math.floor(numOfSeconds / 60), seconds = numOfSeconds % 60;

        return `${minutes}:${String(seconds).padStart(2, "0")}`;
    }

    function playSound() {
        const audio = new Audio('/notification.mp3');
        audio.play().catch(err => console.log(err));
    }
}