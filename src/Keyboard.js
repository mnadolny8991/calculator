function Keyboard(prop) {
	const basic = [
		"(", ")", "%", "CE", 
		"7", "8", "9", "÷", "4", "5", "6","×",
		"1", "2", "3", "-", "0", ".", "=", "+"];
	const advanced = [
		"deg", "!", "Inv", "sin", "ln", "π", 
		"cos", "log", "e", "tan", "√",  "^",
		"Ans"
	];

	function getMarkup(sign) {
		return (
		<button
			onClick={(event) => prop.handleClick(event)}
			className={
				`keyboard__button` +
				` ${(!isNaN(sign) || sign === ".") && "keyboard__button--numeric"}` +
				` ${(sign === "=" || sign === "AC" || sign === "CE") && "keyboard__button--blue"}`
			}
			value={sign}>
			{sign === "CE" ? (prop.answerRdy ? "AC" : sign) : sign}
		</button>
		);
	}
	const buttons = (
		// <div className="keyboard">{signs.map((sign) => getMarkup(sign))}</div>
		<div className="keyboard">
			<section className="keyboard__advanced">
				{advanced.map(key => getMarkup(key))}
			</section>
			<section className="keyboard__basic">
				{basic.map(key => getMarkup(key))}
			</section>	
		</div>
	);

  	return buttons;
}

export default Keyboard;