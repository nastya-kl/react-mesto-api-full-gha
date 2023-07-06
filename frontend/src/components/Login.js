import React from "react";
import useForm from "../hooks/useForm";

function Login(props) {
  const { values, handleChange } = useForm({});
  const { email, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin(email, password)
  };

  return (
    <div className="auth">
      <form
        onSubmit={handleSubmit}
        className="auth__form">
        <h2 className="auth__heading">{props.title}</h2>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="auth__imput"
          value={email || ''}
          onChange={handleChange}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          className="auth__imput"
          value={password || ''}
          onChange={handleChange}
        />
          <button
            type="submit"
            className="auth__button"
          >
            {props.buttonText}
          </button>
      </form>
    </div>
  );
}

export default Login;