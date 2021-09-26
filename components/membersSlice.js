import {createSlice} from "@reduxjs/toolkit";
import {nanoid} from 'nanoid';

const membersSlice = createSlice({
    name: "members",
    initialState: {
        isValid: false,
        validationMessage: "Add at-least two members",
        members: []
    },
    reducers: {
        add(state, action) {
            let {members} = state;
            members.push({
                id: nanoid(),
                name: action.payload,
                isPaused: false,
                isSkippedOnce: false,
                isActive: false,
            });
            validate(state);
        },
        skipOnce(state, action) {
            let {members} = state;
            let memberIndex = getMemberIndex(members, memberSelectorById(action.payload));
           if(members[memberIndex].isActive) {
               let nextMember = getNextNonSkippedMember(members, memberIndex);
               members[memberIndex].isActive = false;
               nextMember.isActive = true;
           }
            validate(state);
        },
        unSkip(state, action) {
            let {members} = state;
            let memberIndex = getMemberIndex(members, memberSelectorById(action.payload));
            members[memberIndex].isSkippedOnce = false;
            validate(state);
        },
        pause(state, action) {
            let {members} = state;
            let memberIndex = getMemberIndex(members, memberSelectorById(action.payload));
            members[memberIndex].isPaused = true;
            validate(state);
        },
        unPause(state, action) {
            let {members} = state;
            let memberIndex = getMemberIndex(members, memberSelectorById(action.payload));
            members[memberIndex].isPaused = false;
            validate(state);
        },
        remove(state, action) {
            let {members} = state;
            let memberIndex = getMemberIndex(members, memberSelectorById(action.payload));
            members.splice(memberIndex, 1);
            validate(state);
        },
        reset(state) {
            state.members = [];
            validate(state);
        },
        shuffle(state) {
            let {members} = state;
            //credits: https://stackoverflow.com/a/2450976
            let currentIndex = members.length, randomIndex;
            // While there remain elements to shuffle...
            while (currentIndex !== 0) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                // And swap it with the current element.
                [members[currentIndex], members[randomIndex]] = [
                    members[randomIndex], members[currentIndex]];
            }
        },
        loadState(state, action) {
            const {isValid, validationMessage, members} = action.payload;
            state.isValid = isValid;
            state.validationMessage = validationMessage;
            state.members = members;
        }
    },
    extraReducers: {
        "timer/finished": (state) => {
            let {members} = state;
            let memberIndex = getMemberIndex(members, memberSelectorByActiveStatus(true));
            members[memberIndex].isActive = false;
            let nextMember = getNextNonSkippedMember(members, memberIndex);
            if (nextMember === null) {
                state.isValid = false;
                state.validationMessage = "Cannot find any member to make active";
            } else {
                nextMember.isActive = true;
            }
        }
    }
});

function getNextNonSkippedMember(members, currentMemberIndex) {
    let i = (currentMemberIndex + 1) % members.length;
    let visitedAllMembers = false;
    while ((members[i].isSkippedOnce || members[i].isPaused) && !visitedAllMembers) {
        if (members[i].isSkippedOnce) members[i].isSkippedOnce = false;
        if (i === currentMemberIndex) {
            visitedAllMembers = true;
        }
        i = (i + 1) % members.length;
    }
    if (!members[i].isSkippedOnce && !members[i].isPaused) return members[i];
    else return null;
}

function memberSelectorById(id) {
    return (member) => member.id === id;
}

function memberSelectorByActiveStatus(isActive) {
    return (member) => member.isActive === isActive;
}

function getMemberIndex(members, memberSelector) {
    for (let i = 0; i < members.length; i++) {
        if (memberSelector(members[i])) return i;
    }
    return -1; //This is ideally not possible
}

function validate(state) {
    if(state.members < 2) {
        state.isValid = false;
        state.validationMessage = "Add at-least two members";
    } else if(getMemberIndex(state.members, (member) => !member.isPaused) === -1) {
        state.isValid = false;
        state.validationMessage = "Atleast one member shall be un-paused";
    } else {
        state.isValid = true;
        state.validationMessage = null;
    }
}

export const membersReducer = membersSlice.reducer;
export const membersActions = membersSlice.actions;