import React from "react";
import {useDispatch} from "react-redux";
import {membersActions} from './membersSlice';
import {
    Divider, HStack, IconButton,
    Menu, MenuButton, MenuItem, MenuList, Spacer, Stack, Text
} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {MdMoreVert} from "react-icons/md";
import {GiSteeringWheel, GiPauseButton} from "react-icons/gi";
import {FiSkipForward} from "react-icons/fi";
import {timerActions} from "./timerSlice";

export default function Member({member}) {
    const {id, name, isSkippedOnce, isPaused, isActive} = member;
    const dispatch = useDispatch();

    return (
        <Stack spacing="2">
            <HStack>
                {isActive ? <Icon as={GiSteeringWheel}/> : null}
                {isPaused ? <Icon as={GiPauseButton}/> : null}
                {isSkippedOnce ? <Icon as={FiSkipForward}/> : null}
                <Text fontWeight="bold" fontSize="18">{name}</Text>
                <Spacer/>
                <Menu isLazy={true} lazyBehavior="unmount" matchWidth={true}>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<Icon as={MdMoreVert}/>}
                        variant="simple"
                    />
                    <MenuList width="100%">
                        {skipOnceMenuItem()}
                        {pauseMenuItem()}
                        {removeMenuItem()}
                    </MenuList>
                </Menu>
            </HStack>
            <Divider/>
        </Stack>
    );

    function removeMenuItem() {
        return <MenuItem onClick={remove}>
            Delete
        </MenuItem>;
    }

    function skipOnceMenuItem() {
        return isSkippedOnce ?
            <MenuItem onClick={unSkip}>Un Skip</MenuItem> :
            <MenuItem onClick={skipOnce}>Skip</MenuItem>
    }

    function pauseMenuItem() {
        return isPaused ?
            <MenuItem onClick={unPause}>Un Pause</MenuItem> :
            <MenuItem onClick={pause}>Pause</MenuItem>
    }

    function remove() {
        const {remove} = membersActions;
        dispatch(remove(id));
    }

    function skipOnce() {
        const {skipOnce} = membersActions;
        const {reset} = timerActions;
        if(isActive) {
            dispatch(skipOnce(id));
            dispatch(reset());
        } else {
            dispatch(skipOnce(id));
        }
    }

    function unSkip() {
        const {unSkip} = membersActions;
        dispatch(unSkip(id));
    }

    function unPause() {
        const {unPause} = membersActions;
        dispatch(unPause(id));
    }

    function pause() {
        const {pause} = membersActions;
        dispatch(pause(id));
    }
}