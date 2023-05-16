import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import { useState, useEffect } from 'react'
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
    const [cards, setCards] = useState([])
    const [currentUser, setCurrentUser] = useState({});
    useEffect(()=>{
        api.getProfileInfo()
        .then((res)=>{
            setCurrentUser(res)
        })
        .catch((err)=>console.log(err))
        api.getCards()
        .then((res)=>{
            setCards(res)
        })
        .catch((err)=>console.log(err))
    },[])
    
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})
    function handleEditAvatarClick (){
        setEditAvatarPopupOpen(true)
    }
    function handleEditProfileClick(){
        setEditProfilePopupOpen(true)
    }
    function handleAddPlaceClick (){
        setAddPlacePopupOpen(true)
    }
    function handleCardClick (card){
        setSelectedCard(card)
    }
    function closeAllPopups(){
        setEditAvatarPopupOpen(false)
        setEditProfilePopupOpen(false)
        setAddPlacePopupOpen(false)
        setSelectedCard({})
    }
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.toggleApiLikes(card._id, isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err)=>console.log(err))
    }
    function handleCardDelete(card){
        api.deleteCard(card._id)
        .then(()=>{
            setCards(cards.filter((c)=> c._id !== card._id));
        })
        .catch((err)=>console.log(err))
    }
    function handleUpdateUser(data){
        api.redProfile(data)
        .then((res)=>{
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch((err)=>console.log(err))
    }
    function handleUpdateAvatar(data){
        api.redImgProfile(data)
        .then((res)=>{
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch((err)=>console.log(err))
    }
    function handleAddPlaceSubmit(data){
        api.addNewCard(data)
        .then((res)=>{
            setCards([res, ...cards]); 
            closeAllPopups();
        })
    }
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="background">
        <div className="page">
            <Header />
            <Main cards={cards} onCardDelete={handleCardDelete} onCardLike={handleCardLike} handleCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}/>
            <Footer />
            <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
            <AddPlacePopup onUpdatePlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
            <PopupWithForm buttonText='Да' onClose={closeAllPopups} title="Вы уверены?" name="confirm"></PopupWithForm>
            
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
    </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
