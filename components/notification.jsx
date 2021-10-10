import React, {useEffect} from 'react';
import {sendNotification} from "../helpers/notificationManager";
import {useSelector} from "react-redux";

export default function Notification() {
    const { activeMember } = useSelector((state) => state.members);
    useEffect(() => {
        if(activeMember) {
            playSound();
            sendNotification(activeMember);
        }
    }, [activeMember]);


    return null;

    function playSound() {
        const audio = new Audio('/notification.mp3');
        audio.play().catch(err => console.log(err));
    }
}