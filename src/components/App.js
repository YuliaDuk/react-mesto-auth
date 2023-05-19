import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register"
import ProtectedRouteElement from "./ProtectedRoute";
import InfoToolTip from "./InfoTooltip";
import api from "../utils/Api";
import * as auth from '../auth'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate} from 'react-router-dom';
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
    const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
    const [statusInfoTooltip, setStatusInfoTooltip] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [userData, setUserData] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        tokenCheck()
      }, [])
    
    const tokenCheck = () => {
      if (localStorage.getItem('token')){
        const token = localStorage.getItem('token');
        auth.getContent(token).then((res)=>{
            if (res){
                const email=res.data.email;
                setUserData(email)
                setLoggedIn(true);
                navigate("/", {replace: true})
            }
        })
      }
     } 
    function handleLogin() {
        tokenCheck()
        setLoggedIn(true);
    }
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
        setInfoTooltipPopupOpen(false)
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
    function signOut(){
        localStorage.removeItem('token');
        setUserData('')
        setLoggedIn(false)
        navigate("/sign-in", {replace: true})
    }
    function handleRegistration (email, password){
        auth.register(email, password)
        .then(()=>{
            navigate('/sign-in', {replace: true})
            setStatusInfoTooltip(true)
        })
        .catch((err)=>{
            console.log(err)
            setStatusInfoTooltip(false)
        })
        .finally(()=>{
            setInfoTooltipPopupOpen(true)
        })
    }
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="background">
        <div className="page">
            <Header email={userData} signOut={signOut}/>
            <InfoToolTip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} status={statusInfoTooltip}/>
            <Routes>
                <Route path="/"  element={<ProtectedRouteElement loggedIn={loggedIn} element={Main} cards={cards} onCardDelete={handleCardDelete} onCardLike={handleCardLike} handleCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} />} />
                <Route path="/sign-up" element={<Register handleRegistration={handleRegistration} />} />
                <Route path="/sign-in" element={<Login handleLogin={handleLogin}/>} />
            </Routes>
           { loggedIn? <Footer /> : ''}
            <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
            <AddPlacePopup onUpdatePlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
            <PopupWithForm class='popup' buttonText='Да' onClose={closeAllPopups} title="Вы уверены?" name="confirm"></PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
    </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
