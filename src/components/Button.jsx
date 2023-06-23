import '../assets/styles/button.css'

const Button = ( { text, color } ) => {
    return (
        <button className={`button_component ${color}`}>
            {text}
        </button>
    )
}

export default Button;