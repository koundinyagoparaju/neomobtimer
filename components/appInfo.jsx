import {Icon} from "@chakra-ui/icons";
import {GrCircleInformation} from "react-icons/gr";
import {
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay, UnorderedList, useDisclosure
} from "@chakra-ui/react";


export default function AppInfo() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Icon as={GrCircleInformation} onClick={onOpen} boxSize={8} alignSelf="flex-end" cursor="pointer">Open Modal</Icon>

            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Usage:</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <UnorderedList spacing={3}>
                            <ListItem>
                                Members can be added to the timer either through entering each username or pasting a list of comma seperated users
                            </ListItem>
                            <ListItem>
                                Ability to add the time in the timer
                            </ListItem>
                            <ListItem>
                                Once the time is present and users are present, it should be possible to start the timer
                            </ListItem>
                            <ListItem>
                                Once the timer times out, it shall make a sound and show the name of the next person in the list
                            </ListItem>
                            <ListItem>
                                The timer can be restarted
                            </ListItem>
                            <ListItem>
                                The timer can be paused at any time
                            </ListItem>
                            <ListItem>
                                Members can be skipped once or paused until they are explicitly un-paused later
                            </ListItem>
                            <ListItem>
                                Shuffle the order of the users
                            </ListItem>
                            <ListItem>
                                Delete a user from the list
                            </ListItem>
                            <ListItem>
                                Get a shareable url to start the app from the current state
                            </ListItem>
                        </UnorderedList>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )

}