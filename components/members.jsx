import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Member from "./member";
import {
    Button,
    Center,
    Input,
    Stack, StackDivider
} from "@chakra-ui/react";
import {membersActions} from "./membersSlice";

export default function Members() {
    const members = useSelector((state) => state.members.members);
    const [memberNames, setMemberNames] = useState('');
    const dispatch = useDispatch();

    function saveMembers(event) {
        if (event.which === 13) {
            const {add} = membersActions;
            memberNames.split(",")
                .filter(memberName => memberName.trim().length !== 0)
                .forEach(memberName => dispatch(add(memberName)));
            setMemberNames('');
        }
    }

    function onChange(event) {
        setMemberNames(event.target.value);
    }

    function shuffle() {
        let {shuffle} = membersActions;
        dispatch(shuffle());
    }

    return (
        <Stack>
            <Stack align="stretch" alignItems="stretch" overscrollY="true">
                {members.map(member => <Member member={member} key={member.id}/>)}
            </Stack>
            <StackDivider/>
            <Input name="add-members" placeholder="Add members" value={memberNames} onChange={onChange} onKeyPress={saveMembers}/>
            <StackDivider/>
            <Center>
                <Button onClick={shuffle}>
                    Shuffle
                </Button>
            </Center>
        </Stack>

    )
        ;
}