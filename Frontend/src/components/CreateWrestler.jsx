import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { newWrestlers} from "../api/wrestlers";
import { useContext, useState } from 'react';
import { UserContext } from "../Context/UserContext";

export default function CreateWrestler({token}){
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [picture, setPicture] = useState('');
    const [rating, setRating] = useState('');
    const [category, setCategory] = useState('');
    const [accomplishments, setAccomplishments] = useState('');
    

    async function newWrestler(evt) {
        evt.preventDefault();
        console.log('token is', token)
        console.log('new wrestler')

        const WrestlerObj = {
            name: name,
            bio: bio,
            picture: picture,
            rating: rating,
            category: category,
            accomplishments: accomplishments,
        }

        const result = await newWrestlers(WrestlerObj, token);

        console.log('adding wrestler', result);

    }

    return(
        <>
        <form className="form">
        <h1 className="loginh1">Sign-up</h1>
        <div>
                <div className="Login">
                    <Label htmlFor="Name" value="Name" />
                </div>
                    <TextInput id="Name" type="name" value={ name } placeholder="name" required shadow onChange={(evt) => setName(evt.target.value)}/>
            </div>
            <div>
                <div className="Login">
                    <Label htmlFor="bio" value="Bio" />
                </div>
                    <TextInput id="bio" type="name" value={ bio } placeholder="bio" required shadow onChange={(evt) => setBio(evt.target.value)} />
            </div>
            <div>
                <div className="Login">
                    <Label htmlFor="picture" value="Picture" />
                </div>
                    <TextInput id="picture" type="picture" value={ picture } placeholder="Picture" required shadow onChange={(evt) => setPicture(evt.target.value)} />
            </div>
            <div>
                <div className="Login">
                    <Label htmlFor="rating" value="Rating" />
                </div>
                    <TextInput id="rating" type="rating" value= { rating } placeholder="rating" required shadow onChange={(evt) => setRating(evt.target.value)} />
            </div>
            <div>
                <div className="Login">
                    <Label htmlFor="category" value="Category" />
                </div>
                    <TextInput id="category" type="category" value={ category } placeholder="category" required shadow onChange={(evt) => setCategory(evt.target.value)} />
            </div>
            <div>
                <div className="Login">
                    <Label htmlFor="accomplishments" value="Accomplishments" />
                </div>
                    <TextInput id="accomplishments" type="accomplishments" value={ accomplishments } placeholder="accomplishments" required shadow onChange={(evt) => setAccomplishments(evt.target.value)} />
            </div>
                <Button  onClick={ newWrestler }  className="btn2" type="submit">Create new wrestler</Button>
        </form>
        </>
    )
}