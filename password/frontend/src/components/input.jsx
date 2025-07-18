import React from 'react'
import { useState, useEffect } from 'react';
import { FaDatabase } from "react-icons/fa6";
import BatteryIndicator from "./batteryind";
import Card from './card';
import setBodyColor from './setbg';
import Switch from './button';
const Input = () => {
    const [inputValue, setInputValue] = useState("");
    const [inputValue1, setInputValue1] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const [items, setItems] = useState([])
    const [data, setData] = useState([]);

    const [color, setcolr] = useState(true);


    const getPassword = async () => {
        let get = await fetch('http://localhost:3000')
        let pass = await get.json()
        if (pass) {
            setInputValue(pass.site)
            setInputValue1(pass.username)
            setInputValue2(pass.password)
        }
        // console.log(pass)
    }

    useEffect(() => {
        getPassword()

        fetch("http://localhost:3000")
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error(err));
    }, []);


    const addPassword = async () => {
        // Check if any of the input values are empty
        if (!inputValue.trim() || !inputValue1.trim() || !inputValue2.trim()) {
            alert("All fields are required.");
            return;
        }
        try {
            const response = await fetch('http://localhost:3000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    site: inputValue.trim(),
                    username: inputValue1.trim(),
                    password: inputValue2.trim()

                })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log('Success:', responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const removeItem = async (id) => {
        try {

            const response = await fetch(`http://localhost:3000/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })
            })
            if (response.ok) {
                console.log(`Element with ID ${id} deleted successfully`);
            } else {
                console.error(`Error deleting element with ID ${id}:`, response.status, response.statusText);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const handleDeleteClick = (id) => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
        const updatedData = data.filter((item) => item._id !== id);
        setData(updatedData);
        removeItem(id);
    };

    const addItem = () => {
        if (inputValue.trim() === '' || inputValue1.trim() === '' || inputValue2.trim() === '') return;
        const newItem = {
            id: Date.now(),
            site: inputValue.trim(),
            username: inputValue2.trim(),
            password: inputValue1.trim()
        }

        setItems([...items, newItem])
        setInputValue('')
        setInputValue1('')
        setInputValue2('')
    }


    const copyText = (text) => {
        navigator.clipboard.writeText(text)

    }



    const toggel = () => {

        const backgroundColor = color ? '#ffffff' : '#000000';
        const textColor = color ? '#000000' : '#ffffff';
        setBodyColor({ backgroundColor, textColor })
        setcolr(!color)
    }
    useEffect(() => {
        setBodyColor({ backgroundColor: '#000000', textColor: '#ffffff' });
    }, []);

    return (
        <>

            <div className=" pass border border-b-amber-50 h-screen w-full flex flex-col justify-center py-1  
            shadow-md rounded  fixed bg-[#1a1a1a]">
                <BatteryIndicator />

                <div className="flex flex-col text-black items-center h-[30vh] mb-[64vh] ml-[30vw] fixed">

                    <input type="text" id="in" name="text" placeholder="enter the site name" autoComplete='off'
                        className="my-3 w-[40vw] bg-amber-50 p-2 rounded-xl" value={inputValue}
                        onChange={e => setInputValue(e.target.value)} />

                    <input type="text" id="user" name="text" placeholder="enter the username" autoComplete='off'
                        className="my-3 w-[40vw] bg-amber-50 p-2 rounded-xl" value={inputValue1}
                        onChange={e => setInputValue1(e.target.value)} />

                    <input type="password" id="pass" name="password" placeholder="enter the password"
                        className="my-3 w-[40vw] bg-amber-50 p-2 rounded-xl" value={inputValue2}
                        onChange={e => setInputValue2(e.target.value)} />

                    <div className='flex gap-20 items-center pl-16'>

                        <FaDatabase
                            className="database text-blue-500 text-4xl hover:text-blue-700 cursor-pointer"
                            onClick={() => {
                                addItem(),
                                    addPassword(inputValue, inputValue1, inputValue2);
                            }}
                        />
                    </div>
                </div>



                {/* this is div */}
                <div onChange={toggel} className=' bg-black text-white 
                w-1 h-1 ml-[13vw] -mt-[90vh] rounded-s-full pass fixed'>
                    <Switch />
                </div>


                <div className="grid grid-cols-3 gap-8 mt-[35vh] overflow-scroll ">
                    {[...data, ...items].map(item => (
                        <Card
                            key={item._id}
                            item={item}
                            handleDeleteClick={handleDeleteClick}
                            copyText={copyText}

                        />
                    ))}
                </div>

                {/* this end div */}
            </div>
        </>
    )
}

export default Input;


