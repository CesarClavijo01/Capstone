import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { newWrestlers} from "../api/wrestlers";
import { newChampionships } from "../api/championshiops";
import { useContext, useState, useEffect } from 'react';
import { newBrands } from "../api/brands";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { getMe } from "../api/users";




export default function CreateWrestler(){
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [picture, setPicture] = useState('');
    const [rating, setRating] = useState('');
    const [category, setCategory] = useState('');
    const [accomplishments, setAccomplishments] = useState('');

    const [championshipname, setChampionshipname] = useState('');
    const [ cpicture, setCpicture] = useState('');
    const [ display_picture, setDisplay_picture] = useState('');
    const [ info, setInfo ] = useState('');

    const [bname, setBname] = useState('');
    const [show_time, setShow_time] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState('');

    const [user, setUser] = useState(null);

    const {token} = useAuthStatus();

    useEffect(() => {
        (async function () {
          const loggedUser = await getMe(token);
          setUser(loggedUser);
          console.log(setUser)
        })();
      }, [token]);
    
    

    async function newBrand(evt) {
        evt.preventDefault();
        
        const BrandObj = {
            name: bname,
            show_time: show_time,
            description: description,
            logo: logo,
        }

        const result = await newBrands(BrandObj, token);
        console.log('result', result.error)
        if(result.error){
            alert(result.message)
        }
        else{
            alert('Brand Created')
        }
    }
    

    async function newWrestler(evt) {
        evt.preventDefault();
        
        const WrestlerObj = {
            name: name,
            bio: bio,
            picture: picture,
            rating: rating,
            category: category,
            accomplishments: accomplishments,
        }

        const result = await newWrestlers(WrestlerObj, token);
        console.log('result', result.error)
        if(result.error){
            alert(result.message)
        }
        else{
            alert('Wrestler Created')
        }

    }

    async function newChampionship(evt) {
        evt.preventDefault();

        const ChampionshipObj = {
            name: championshipname,
            picture: cpicture,
            display_picture: display_picture,
            info: info,
        }

        const result = await newChampionships(ChampionshipObj, token);

        console.log('result', result.error)
        if(result.error){
            alert(result.message)
        }
        else{
            alert('Wrestler Created')
        }

        console.log('adding championship', result);
    }

    return(
        <>
        <div>
            <div>
            <form className="createform">
        <h1 className="loginh1">New Wrestler</h1>
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
            </div>
                <div>
            <form className="createform">
        <h1 className="loginh1">New Championship</h1>
        <div>
                <div className="Login">
                    <Label htmlFor="Name" value="Name" />
                </div>
                    <TextInput id="Name" type="name" value={ championshipname } placeholder="name" required shadow onChange={(evt) => setChampionshipname(evt.target.value)}/>
            </div>
            
            <div>
                <div className="Login">
                    <Label htmlFor="picture" value="Picture" />
                </div>
                    <TextInput id="picture" type="picture" value={ cpicture } placeholder="Picture" required shadow onChange={(evt) => setCpicture(evt.target.value)} />
            </div>
            <div>
                <div className="Login">
                    <Label htmlFor="display" value="Display" />
                </div>
                    <TextInput id="display" type="display" value= { display_picture } placeholder="display" required shadow onChange={(evt) => setDisplay_picture(evt.target.value)} />
            </div>
            <div>
                <div className="Login">
                    <Label htmlFor="info" value="Info" />
                </div>
                    <TextInput id="info" type="info" value={ info } placeholder="info" required shadow onChange={(evt) => setInfo(evt.target.value)} />
            </div>
                <Button  onClick={ newChampionship }  className="btn2" type="submit">Create new wrestler</Button>
        </form>
            </div>
            <div>
            <form className="createform">
        <h1 className="loginh1">New Brand</h1>
        <div>
                <div className="Login">
                    <Label htmlFor="Name" value="Name" />
                </div>
                    <TextInput id="Name" type="name" value={ bname } placeholder="name" required shadow onChange={(evt) => setBname(evt.target.value)}/>
            </div>
            
            <div>
                <div className="Login">
                    <Label htmlFor="show_time" value="Show Time" />
                </div>
                    <TextInput id="show_time" type="show_time" value={ show_time } placeholder="show day" required shadow onChange={(evt) => setShow_time(evt.target.value)} />
            </div>
            <div>
                <div className="Login">
                    <Label htmlFor="description" value="Description" />
                </div>
                    <TextInput id="description" type="description" value= { description } placeholder="description" required shadow onChange={(evt) => setDescription(evt.target.value)} />
            </div>
            <div>
                <div className="Login">
                    <Label htmlFor="logo" value="Logo" />
                </div>
                    <TextInput id="logo" type="logo" value={ logo } placeholder="logo" required shadow onChange={(evt) => setLogo(evt.target.value)} />
            </div>
                <Button  onClick={ newBrand }  className="btn2" type="submit">Create brand</Button>
        </form>
            </div>
                            
        </div>
        </>
    )
}