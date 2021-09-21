import {
    Button, Divider, Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay, Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import ListItem from "./ListItem";
import {uuid} from "uuidv4";

function MainPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [data, setData] = useState([])

    const getData = () => {
        let localStorageData = JSON.parse(localStorage.getItem("books"))
        if (localStorageData != null) {
            setData(localStorageData)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(data))
    }, [data])

    const addBook = (book) => {
        setData(prev => prev.concat(book))
    }

    const applyClickHandler = (book) => {
        addBook(book)
        onClose()
    }

    const removeBook = (id) => {
        setData(prev => prev.filter(item => item.id !== id))
    }

    const editField = (id, value, field) => {
        let newData = data.map(e => e)
        let index = newData.findIndex(o => o.id === id)

        switch (field) {
            case "name": newData[index].name = value; break;
            case "author": newData[index].author = value; break;
            case "genre": newData[index].genre = value; break;
            case "year": newData[index].year = value; break;
        }
        setData(newData)
    }

    return (
        <VStack>
            <StateModal onApply={applyClickHandler}/>
            <Button mt="16px" ms={"16px"} alignSelf={"start"} onClick={onOpen}>Add</Button>
            <List/>
        </VStack>
    )

    function StateModal(props) {

        const [name, setName] = useState("")
        const [author, setAuthor] = useState("")
        const [genre, setGenre] = useState("")
        const [year, setYear] = useState("")
        const [cover, setCover] = useState("")

        const handleModalFieldChange = (e) => {
            console.log(e.target.name)
            switch (e.target.name) {
                case "name": setName(e.target.value); break;
                case "author": setAuthor(e.target.value); break;
                case "genre":  setGenre(e.target.value); break;
                case "year":  setYear(e.target.value); break;
            }
        }

        const handleImageChange = (e) => {
            let file = e.target.files[0]

            if (!file.name.match(/.(jpg|jpeg|png)$/i)) {
                alert("File is not an image")
            } else {
                getBase64(file, (res) => {
                    console.log(res)
                    setCover(res)
                })
            }
        }

        const getBase64 = (file, callback) => {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                callback(reader.result)
            }
            reader.onerror = (error) => {
                console.log(error)
            }
        }

        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Add</ModalHeader>
                    <ModalBody>
                        <Input name="name" value={name} onChange={handleModalFieldChange} mt="4" placeholder="Name"/>
                        <Input name="author" value={author} onChange={handleModalFieldChange} mt="4" placeholder="Author"/>
                        <Input name="genre" value={genre} onChange={handleModalFieldChange} mt="4" placeholder="Genre"/>
                        <Input name="year" value={year} onChange={handleModalFieldChange} mt="4" placeholder="Year"/>
                        <input
                            type="file"
                            name="Cover"
                            onChange={e => {
                                handleImageChange(e)
                            }}
                        />
                        <Button onClick={() => props.onApply({id: uuid(), name: name, author: author, genre: genre, year: year, cover: cover})} marginY="4">Apply</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }

    function List() {
        return (
            data.length !== null ? (
                data.map(e => {
                    return <VStack w="100%">
                        <Divider/>
                        <ListItem id={e.id} name={e.name} author={e.author} genre={e.genre} year={e.year} cover={e.cover} onDelete={removeBook} onSubmit={editField}/>
                    </VStack>
                })
            ) : (
                <Text>No data</Text>
            )
        )
    }

}

export default MainPage