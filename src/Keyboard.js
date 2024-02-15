function Keyboard(prop) {
	const signs = [
			"Rad", "Deg", "!", "(", ")", "%", "CE",
			"Inv", "sin", "ln", "7", "8", "9", "÷", 
			"π", "cos", "log", "4", "5", "6", "×", "e",
			"tan", "√", "1", "2", "3", "-", "Ans", "EXP",
			"^", "0", ".", "=", "+",
	];

	function getMarkup(sign) {
		return (
		<button
			onClick={(event) => prop.handleClick(event)}
			className={
				`keyboard__button` +
				` ${(!isNaN(sign) || sign === ".") && "keyboard__button--numeric"}` +
				` ${sign === "=" && "keyboard__button--blue"}` +
				` ${
					String(sign).toLowerCase() === prop.angleFormat &&
					"keyboard__button--blue"
				}` +
				` ${(sign === "AC" || sign === "CE") && "keyboard__button--blue"}`
			}
			value={sign}>
			{sign === "CE" ? (prop.answerRdy ? "AC" : sign) : sign}
		</button>
		);
	}
	const buttons = (
		<div className="keyboard">{signs.map((sign) => getMarkup(sign))}</div>
	);

  	return buttons;
}

export default Keyboard;