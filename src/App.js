import "./App.css";
import { useState } from "react";
import { evaluate } from "mathjs";
import Keyboard from "./Keyboard";
import Display from "./Display";

function App() {
	return <Calculator />
}

function Calculator() {
	const [tokens, setTokens] = useState([]);
	const [expression, setExpression] = useState("");
	const [answerRdy, setAnswerRdy] = useState(false);
	const [prevAns, setPrevAns] = useState("");
	const [history, setHistory] = useState([]);
	const [displayList, setDisplayList] = useState(false);

    function handleImgClick() {
        setDisplayList(!displayList);
    }

	function handlePrevEntryClick(event) {
		const exp = event.target.innerHTML;
		let val = "";
		let copy = false;
		for (let character of exp) {
			if (copy === true) val += character;
			if (character === "=") copy = true;
		}
		setDisplayList(false);
		setExpression(val);
		setTokens([val]);
		setAnswerRdy(true);
	}

	function correct(expr) {
		let correct = "";
		for (let c of expr) {
			switch (c) {
				case "π":
					correct += "pi";
				break;
				case "×":
					correct += "*";
				break;
				case "√":
					correct += "sqrt";
				break;
				case "÷":
					correct += "/";
					break;
				default:
					correct += c;
				break;
			}
		}
		return correct.replace(/Ans/g, prevAns);
	}

	function handleClick(event) {
		const curr = event.target.value;
		setAnswerRdy(false);

		if (curr === "=") {
			let fullEval = expression;
			const correctExpression = correct(expression);
			let ans = "";
			try {
				ans = String(evaluate(correctExpression));
			} catch (error) {
				console.log(error.message);
				ans = "ERROR";
			}
			fullEval += " = " + ans;
			setHistory(prev => [fullEval, ...prev]);
			setExpression(ans);
			setTokens([...ans]);
			setAnswerRdy(true);
			ans !== "ERROR" && setPrevAns(ans);
			return;
		}
		if (curr === "CE") {
			if (expression.length === 0) return;
			if (answerRdy) {
				setExpression("");
				setTokens([]);
				setAnswerRdy(false);
				return;
			}
			setExpression(
				[...expression].slice(0,
					expression.length - tokens[tokens.length - 1].length));
				setTokens(tokens.slice(0, -1));
			return;
		}

		setTokens((prev) => [...prev, curr]);
		setExpression([...expression, curr].join(""));
	}

	return (
		<div className="container">
			<Display expression={expression} 
					 prevAns={prevAns} 
					 history={history} 
					 displayList={displayList}
					 handlePrevEntryClick={handlePrevEntryClick}
					 handleImgClick={handleImgClick}/>
			<Keyboard
				handleClick={handleClick}
				answerRdy={answerRdy}
			/>
		</div>
	);
}

export default App;
