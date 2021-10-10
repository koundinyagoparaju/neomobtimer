import React from 'react';
import Timer from "./timer";
import Members from "./members";
import {Stack, StackDivider} from "@chakra-ui/react";
import ShareableLink from "./shareableLink";

export default function Application() {
    return <Stack>
        <Timer/>
        <Members/>
        <StackDivider/>
        <StackDivider/>
        <StackDivider/>
        <StackDivider/>
        <ShareableLink/>
    </Stack>;
}