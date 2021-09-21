import {
    Editable, EditableInput,
    EditablePreview,
    Flex,
    IconButton,
    Image,
} from "@chakra-ui/react";
import {RiDeleteBin6Line} from "react-icons/all";

function ListItem(props) {

    return (
        <Flex direction="row" justify="space-between" align="center" h="225px" w="100%">
            <Flex me="8" direction="row" justify="space-around" align="center" h="225px" w="100%">
                <Image sx={{zIndex: "-1"}} src={props.cover} w="145px" h="205px"/>
                <Editable textAlign="start" defaultValue={props.name} onSubmit={(val) => props.onSubmit(props.id, val, "name")}>
                    <EditablePreview/>
                    <EditableInput/>
                </Editable>
                <Editable textAlign="start" defaultValue={props.author} onSubmit={(val) => props.onSubmit(props.id, val, "author")}>
                    <EditablePreview/>
                    <EditableInput/>
                </Editable>
                <Editable textAlign="start" defaultValue={props.genre} onSubmit={(val) => props.onSubmit(props.id, val, "genre")}>
                    <EditablePreview/>
                    <EditableInput/>
                </Editable>
                <Editable textAlign="start" defaultValue={props.year} onSubmit={(val) => props.onSubmit(props.id, val, "year")}>
                    <EditablePreview/>
                    <EditableInput/>
                </Editable>
            </Flex>
            <IconButton me="8" onClick={() => props.onDelete(props.id)} aria-label="Delete" icon={<RiDeleteBin6Line/>} />
        </Flex>
    )
}

export default ListItem