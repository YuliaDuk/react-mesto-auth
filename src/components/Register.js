import { Link } from "react-router-dom";
import {useForm} from '../hooks/useForm'
function Register(props) {
  const { values, handleChange} = useForm({});
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleRegistration(values.email, values.password);
  };
  return (
    <div className="popup popup_type_login popup_opened">
      <div className="popup__container popup__container_theme_dark">
        <h3 className="popup__name popup__name_type_login">Регистрация</h3>
        <form
          onSubmit={handleSubmit}
          className={`popup__form`}
          name="login-form"
          noValidate
        >
          <input
            id="email-input"
            type="email"
            name="email"
            value={values.email || ""}
            onChange={handleChange}
            className="popup__item popup__item_theme_dark popup__item_el_email"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="email-input-error popup__item-error"></span>
          <input
            id="password-input"
            type="password"
            name="password"
            value={values.password || ""}
            onChange={handleChange}
            className="popup__item popup__item_theme_dark popup__item_el_password"
            placeholder="Пароль"
            minLength="2"
            required
          />
          <span className="password-input-error popup__item-error"></span>
          <button
            type="submit"
            className="popup__button popup__button_type_login"
          >
            Зарегистрироваться
          </button>
          <p className="popup__text">
            Уже зарегистрированы?{" "}
            <Link className="popup__link" to="/sign-in">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Register;
