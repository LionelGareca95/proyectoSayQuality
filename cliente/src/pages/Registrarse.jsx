import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logoColor from '../assets/logoColor.png'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import Swal from 'sweetalert2'
import { Loader } from '../components/Loader'
import createHeader from '../utils/createHeader'

export const Registrarse = () => {
	const [name, setName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [password2, setPassword2] = useState('')
	const [passwordType, setPasswordType] = useState(true)
	const [passwordType2, setPasswordType2] = useState(true)
	const [loading, setLoading] = useState(true)

	const navigate = useNavigate()

	useEffect(() => {
		const url = import.meta.env.VITE_URL_USER

		fetch(url, {
			method: 'GET',
			headers: createHeader(),
		}).then(response => {
			if (!!response.ok) {
				navigate('/')
			}
			setLoading(false)
		})
	}, [])

	const borrarFormulario = () => {
		setName('')
		setLastName('')
		setEmail('')
		setPassword('')
		setPassword2('')
	}

	const enviarFormulario = async () => {
		const data = {
			username: name.trim() + ' ' + lastName.trim(),
			email: email.trim(),
			password: password.trim(),
			// password2: password2.trim(),
		}

		const url = import.meta.env.VITE_URL_REGISTRARSE

		await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: createHeader(),
		})
			.then(response => response.json())
			.then(result => {
				if (!result.data) {
					return Swal.fire({
						icon: 'error',
						title: result.error.message,
						confirmButtonColor: '#0083bb',
					})
				}

				borrarFormulario()

				Swal.fire({
					icon: 'success',
					title: result.data.message,
					confirmButtonColor: '#0083bb',
				})
			})
	}

	function validarName() {
		const nameRegEx = /^[A-Za-z\ ]{3,20}$/

		if (name.length !== 0) {
			if (nameRegEx.test(name)) {
				const input = document.getElementById('name')
				input.classList.remove('invalid')
				const mensaje = document.getElementById('error-name-input')
				mensaje.style.display = 'none'
				return true
			} else {
				const input = document.getElementById('name')
				input.classList.add('invalid')
				const mensaje = document.getElementById('error-name-input')
				mensaje.style.display = 'block'
				return false
			}
		}
	}

	useEffect(() => {
		validarName()
	}, [name])

	function validarLastName() {
		const lastNameRegEx = /^[A-Za-z\ ]{3,20}$/

		if (lastName.length !== 0) {
			if (lastNameRegEx.test(lastName)) {
				const input = document.getElementById('lastName')
				input.classList.remove('invalid')
				const mensaje = document.getElementById('error-lastName-input')
				mensaje.style.display = 'none'
				return true
			} else {
				const input = document.getElementById('lastName')
				input.classList.add('invalid')
				const mensaje = document.getElementById('error-lastName-input')
				mensaje.style.display = 'block'
				return false
			}
		}
	}

	useEffect(() => {
		validarLastName()
	}, [lastName])

	function validarEmail() {
		const emailRegEx =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

		if (email.length !== 0) {
			if (emailRegEx.test(email)) {
				const input = document.getElementById('email')
				input.classList.remove('invalid')
				const mensaje = document.getElementById('error-email-input')
				mensaje.style.display = 'none'
				return true
			} else {
				const input = document.getElementById('email')
				input.classList.add('invalid')
				const mensaje = document.getElementById('error-email-input')
				mensaje.style.display = 'block'
				return false
			}
		}
	}

	useEffect(() => {
		validarEmail()
	}, [email])

	function validarPassword() {
		const passwordRegEx = /^.{5,50}$/

		if (password.length !== 0) {
			if (passwordRegEx.test(password)) {
				const input = document.getElementById('password')
				input.classList.remove('invalid')
				const mensaje = document.getElementById('error-password-input')
				mensaje.style.display = 'none'
				return true
			} else {
				const input = document.getElementById('password')
				input.classList.add('invalid')
				const mensaje = document.getElementById('error-password-input')
				mensaje.style.display = 'block'
				return false
			}
		}
	}

	useEffect(() => {
		validarPassword()
	}, [password])

	function validarPassword2() {
		if (password2.length !== 0) {
			if (password2 === password) {
				const input = document.getElementById('password2')
				input.classList.remove('invalid')
				const mensaje = document.getElementById('error-password2-input')
				mensaje.style.display = 'none'
				return true
			} else {
				const input = document.getElementById('password2')
				input.classList.add('invalid')
				const mensaje = document.getElementById('error-password2-input')
				mensaje.style.display = 'block'
				return false
			}
		}
	}

	useEffect(() => {
		validarPassword2()
	}, [password2])

	function validarFormulario() {
		if (
			validarName() &&
			validarLastName() &&
			validarEmail() &&
			validarPassword() &&
			validarPassword2()
		) {
			return true
		}

		return false
	}

	function handleSubmit(e) {
		e.preventDefault()

		if (!validarFormulario()) {
			return Swal.fire({
				icon: 'error',
				title: 'Por favor, complete el formulario correctamente',
				confirmButtonColor: '#0083bb',
			})
		}

		enviarFormulario()
	}

	function mostrarContrasena() {
		let passwd = document.getElementById('password')

		if (passwd.type === 'password') {
			passwd.type = 'text'
			setPasswordType(false)
		} else {
			passwd.type = 'password'
			setPasswordType(true)
		}
	}

	function mostrarContrasena2() {
		let passwd2 = document.getElementById('password2')

		if (passwd2.type === 'password') {
			passwd2.type = 'text'
			setPasswordType2(false)
		} else {
			passwd2.type = 'password'
			setPasswordType2(true)
		}
	}

	if (loading) {
		return <Loader />
	}

	return (
		<section className='acceder'>
			<div className='logo-acceder'>
				<img src={logoColor} alt='logo' />
			</div>
			<div className='iniciar-sesion'>
				<div className='acceder-google'>
					<p>Crea una cuenta</p>
				</div>
				<span id='error-name-input'>El nombre que ingreso es invalido</span>
				<span id='error-lastName-input'>El apellido que ingreso es invalido</span>
				<span id='error-email-input'>El email que ingreso es invalido</span>
				<span id='error-password-input'>
					La contrase??a que ingreso es invalida, debe tener al menos 5 caracteres
				</span>
				<span id='error-password2-input'>
					La contrase??a que ingreso no coincide con la anterior
				</span>
				<form onSubmit={e => handleSubmit(e)}>
					<input
						id='name'
						type='text'
						name='name'
						placeholder='Nombres'
						onChange={e => setName(e.target.value)}
						value={name}
					/>
					<input
						id='lastName'
						type='text'
						name='lastname'
						placeholder='Apellidos'
						onChange={e => setLastName(e.target.value)}
						value={lastName}
					/>
					<input
						id='email'
						type='email'
						name='email'
						placeholder='Correo Electr??nico'
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
					<div className='passwordContainer'>
						<input
							id='password'
							type='password'
							name='password'
							placeholder='Contrase??a'
							onChange={e => setPassword(e.target.value)}
							value={password}
							onPaste={e => {
								e.preventDefault()
								return false
							}}
							onCopy={e => {
								e.preventDefault()
								return false
							}}
						/>
						{passwordType === true ? (
							<BsEyeSlash onClick={mostrarContrasena} className='mostrarContrase??a' />
						) : (
							<BsEye onClick={mostrarContrasena} className='mostrarContrase??a' />
						)}
					</div>
					<div className='passwordContainer'>
						<input
							id='password2'
							type='password'
							placeholder='Repetir Contrase??a'
							onChange={e => setPassword2(e.target.value)}
							value={password2}
							onPaste={e => {
								e.preventDefault()
								return false
							}}
							onCopy={e => {
								e.preventDefault()
								return false
							}}
						/>
						{passwordType2 === true ? (
							<BsEyeSlash onClick={mostrarContrasena2} className='mostrarContrase??a' />
						) : (
							<BsEye onClick={mostrarContrasena2} className='mostrarContrase??a' />
						)}
					</div>
					<button>Registrate</button>
				</form>
			</div>
		</section>
	)
}
