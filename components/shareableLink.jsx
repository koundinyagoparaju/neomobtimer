import React, {useRef} from "react";
import {
    Button, Input, InputGroup, InputRightAddon, Popover,
    PopoverArrow, PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger
} from "@chakra-ui/react";
import {getState} from "../helpers/storage";


export default function ShareableLink() {
    const shareableLinkRef = useRef(null);
    const shareButtonRef = useRef(null);

    return (<Popover>
        <PopoverTrigger>
            <Button variant="link" onClick={handleClick}>Share</Button>
        </PopoverTrigger>
        <PopoverContent width="20rem">
            <PopoverArrow/>
            <PopoverCloseButton/>
            <PopoverBody>
                <InputGroup>
                    <Input
                        ref={shareableLinkRef}
                        type="text"
                        readOnly={true}
                        value=""
                    />
                    <InputRightAddon width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleCopy} ref={shareButtonRef} _focus="">
                            Copy
                        </Button>
                    </InputRightAddon>
                </InputGroup>
            </PopoverBody>
        </PopoverContent>
    </Popover>);

    function handleClick() {
        shareableLinkRef.current.value = getShareableUrl();
    }

    function handleCopy() {
        shareableLinkRef.current.select();
        document.execCommand("copy");
        shareButtonRef.current.innerText = "Copied!";
        setTimeout(() => {
            shareButtonRef.current.innerText = "Copy";
        }, 1000);
    }

    function getShareableUrl() {
        return `https://mobtimer.crazycoding.tech?loadFrom=${btoa(JSON.stringify(getState()))}`;
    }
}