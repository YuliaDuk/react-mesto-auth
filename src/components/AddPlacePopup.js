import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";
function AddPlacePopup(props){
    const [name, setName] = useState('')
    const [link, setLink] = useState('')
   
    useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    function handleNameChange(e){
        setName(e.target.value)
    }
    function handleLinkChange(e){
        setLink(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdatePlace({
          name,
          link,
        });
    }
return (
    <PopupWithForm onSubmit={handleSubmit} buttonText='Создать' onClose={props.onClose} isOpen={props.isOpen} title="Новое место" name="add">
        <input value={name || ''} onChange={handleNameChange} id="placename-input" type="text" name="name" className="popup__item popup__item_type_add popup__item_el_place" minLength="2" maxLength="30" placeholder="Название" required/>
        <span className="placename-input-error popup__item-error"></span>
        <input value={link || ''} onChange={handleLinkChange} id="src-input" type="url" name="link" className="popup__item popup__item_type_add popup__item_el_src" placeholder="Ссылка на картинку" required />
        <span className="src-input-error popup__item-error"></span>
    </PopupWithForm>
)
}
export default AddPlacePopup