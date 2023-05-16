import PopupWithForm from "./PopupWithForm"
import { useState, useEffect, useContext } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props){
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
   
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameChange(e){
        setName(e.target.value)
    }
    function handleJobChange(e){
        setDescription(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
          name,
          about: description,
        });
    }
    return (
        <PopupWithForm onSubmit={handleSubmit} buttonText='Сохранить' onClose={props.onClose}  isOpen={props.isOpen} title="Редактировать профиль" name ="red" >
            <input id="name-input" type="text" name="firstname" value={name || ''} onChange={handleNameChange} className="popup__item popup__item_el_name" placeholder="Имя" minLength="2" maxLength="40" required/>
            <span className="name-input-error popup__item-error"></span>
            <input id="job-input" type="text" name="job" value={description || ''} onChange={handleJobChange}  className="popup__item popup__item_el_job" placeholder="О себе" minLength="2" maxLength="200" required/>
            <span className="job-input-error popup__item-error"></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup