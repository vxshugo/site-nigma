import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice/apiCalls";
import Joi from "joi";
import TextField from "../../components/Inputs/TextField";
import Checkbox from "../../components/Inputs/Checkbox";
import Button from "../../components/Button";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../../images/black.svg";
import styles from "./styles.module.scss";
import {useTranslation} from "react-i18next";

const Login = () => {
	const {t} = useTranslation()
	const [data, setData] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState({});
	const { isFetching } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleInputState = (name, value) => {
		setData({ ...data, [name]: value });
	};

	const handleErrorState = (name, value) => {
		value === ""
			? delete errors[name]
			: setErrors({ ...errors, [name]: value });
	};

	const schema = {
		email: Joi.string().email({ tlds: false }).required().label("Email"),
		password: Joi.string().required().label("Password"),
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length === 0) {
			login(data, dispatch);
		} else {
			console.log("please fill out properly");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.logo_container}>
				<Link to="/">
					<img src={logo} alt="logo" />
				</Link>
			</div>
			<main className={styles.main}>
				<form onSubmit={handleSubmit} className={styles.form_container}>
					<div className={styles.input_container}>
						<TextField
							label={t("mainApp.login.email")}
							placeholder="Enter your email"
							name="email"
							handleInputState={handleInputState}
							schema={schema.email}
							handleErrorState={handleErrorState}
							value={data.email}
							error={errors.email}
							required={true}
						/>
					</div>
					<div className={styles.input_container}>
						<TextField
							label={t("mainApp.login.password")}
							placeholder="Password"
							name="password"
							handleInputState={handleInputState}
							schema={schema.password}
							handleErrorState={handleErrorState}
							value={data.password}
							error={errors.password}
							type="password"
							required={true}
						/>
					</div>
					<Link to="/help">
						<p className={styles.forgot_password}>
							{t("mainApp.login.help")}
						</p>
					</Link>
					<div className={styles.form_bottom}>
						<Checkbox label={t("mainApp.login.remember")} />
						<Button
							type="submit"
							label={t("mainApp.login.login")}
							isFetching={isFetching}
							style={{ color: "white", background: "#15883e", width: "20rem" }}
						/>
					</div>
				</form>
				<h1 className={styles.dont_have_account}>{t("mainApp.login.dontHave")}</h1>
				<Link to="/signup">
					<button className={styles.outline_btn}>{t("mainApp.login.singUp")}</button>
				</Link>
			</main>
		</div>
	);
};

export default Login;