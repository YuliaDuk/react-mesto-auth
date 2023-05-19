import sucsess from '../images/Union.png'
import unsucsess from '../images/unsucsess.png'
function InfoToolTip(props){
    return(
    <div className={`popup popup_type_infotooltip ${props.isOpen ? `popup_opened` : ""}`}>
        <div className="popup__container popup__container_type_infotooltip">
            <button onClick={props.onClose} type="button" className="popup__close-icon" aria-label="Закрыть"></button>
            <img 
            src={props.status? sucsess : unsucsess} 
            className="popup__icon" 
            alt={props.status? "Успешная регистрация" : "Не успешная регистрация"}></img>
            <h3 className="popup__name popup__name_type_infotooltip">{props.status? "Вы успешно зарегистрированы!":"Что-то пошло не так! Попробуйте еще раз"}</h3>
        </div>
    </div>
    )
}
export default InfoToolTip
