const Cash = props => (
	<div>
		{props.title}
		{props.cash <= 0
			? ""
			: ((props.cash / props.ratio) * props.price).toFixed(2)}
	</div>
);

class ExchangeCounter extends React.Component {
	state = {
		amount: "",
		product: "electricity",
	};

	static defaultProps = {
		currencies: [
			{
				id: 0,
				name: "zloty",
				ratio: 1,
				title: "Wartość w złotówkach: ",
			},
			{
				id: 1,
				name: "dollar",
				ratio: 4.02,
				title: "Wartość w dolarach: ",
			},
			{
				id: 2,
				name: "euro",
				ratio: 4.38,
				title: "Wartość w euro: ",
			},
			{
				id: 3,
				name: "pound",
				ratio: 5.02,
				title: "Wartość w funtach: ",
			},
		],
		prices: {
			electricity: 0.51,
			gas: 7.38,
			oranges: 8.49,
		},
	};

	handleChange = e => {
		this.setState({
			amount: e.target.value,
		});
	};
	handleSelect = e => {
		this.setState({
			product: e.target.value,
			amount: "",
		});
	};
	insertSuffix(select) {
		if (select === "electricity") return <em> kWh</em>;
		else if (select === "gas") return <em> litrów</em>;
		else if (select === "oranges") return <em> kilogramów</em>;
		else return null;
	}
	selectPrice(select) {
		const price = this.props.prices[select];
		return price;
	}

	render() {
		const { amount, product } = this.state;
		const price = this.selectPrice(product);
		const calculators = this.props.currencies.map(currency => (
			<Cash
				key={currency.id}
				ratio={currency.ratio}
				title={currency.title}
				cash={amount}
				price={price}
			/>
		));
		return (
			<div className='app'>
				<label>
					Wybierz produkt:
					<select value={product} onChange={this.handleSelect}>
						<option value='electricity'>Prąd</option>
						<option value='gas'>Benzyna</option>
						<option value='oranges'>Pomarańcze</option>
					</select>
				</label>
				<br />
				<label>
					<input
						type='number'
						value={this.state.amount}
						onChange={this.handleChange}
					/>
					{this.insertSuffix(this.state.product)}
				</label>
				{calculators}
			</div>
		);
	}
}

ReactDOM.render(<ExchangeCounter />, document.getElementById("root"));
