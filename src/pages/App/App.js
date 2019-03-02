import React, { Component } from 'react';

import Input from '../../components/Input/Input';
import { isIP } from '../../validator';

import GlobalStyle from '../../styles/globalStyle';
import { Container, Header, Text } from './App.style';
import { Box, Cell } from '../../styles/grid';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ip: '',
			mask: '',
			binaryIP: '',
			binaryMask: '',
			Wildcard: '',
			validAddress: false
		};
	}

	convertIp = (address, base = 2) => {
		const convert = block =>
			base === 10 ? parseInt(block, 2) : (+block).toString(2);

		return address
			.split('.')
			.map(block => convert(block))
			.reduce((final, now) => `${final}.${now}`);
	};

	handleAddress = async ({ target }) => {
		if (target) {
			await this.setState({ address: target.value });
			this.handleAddressBin({});
		} else {
			const address = this.convertIp(this.state.addressBin, 10);
			this.setState({ address });
		}
	};

	handleAddressBin = async ({ target }) => {
		if (target) {
			await this.setState({ addressBin: target.value });
			this.handleAddress({});
		} else {
			const addressBin = this.convertIp(this.state.address, 2);
			this.setState({ addressBin });
		}
	};

	handleMask = async ({ target }) => {
		if (target) {
			await this.setState({ mask: target.value });
			this.handleMaskBin({}, 'mask');
		} else {
			const maskBin = this.state.maskBin.split('.').join('');
			const mask = maskBin.length - maskBin.split('1').join('').length;
			await this.setState({ mask });
		}
	};

	handleMaskBin = async ({ target }, origin) => {
		if (target) {
			await this.setState({ maskBin: target.value });
			this.handleMask({});
			this.handleMask255({});
		} else {
			let maskBin;

			if (origin === 'mask255') {
				maskBin = this.convertIp(this.state.mask255, 2);
			} else {
				const { mask } = this.state;
				const bin = `${'1'.repeat(mask)}${'0'.repeat(32 - mask)}`;
				maskBin = `${bin.substr(0, 8)}.${bin.substr(8, 8)}.${bin.substr(
					16,
					8
				)}.${bin.substr(24, 8)}`;
			}

			await this.setState({ maskBin });

			if (origin === 'mask255') this.handleMask({});
			else this.handleMask255({});
		}
	};

	handleMask255 = async ({ target }) => {
		if (target) {
			await this.setState({ mask255: target.value });
			this.handleMaskBin({}, 'mask255');
		} else {
			const mask255 = this.convertIp(this.state.maskBin, 10);
			this.setState({ mask255 });
		}
	};

	render() {
		return (
			<Container>
				<GlobalStyle />

				<Header>
					<h1>{`< Nome de projeto legal aqui >`}</h1>
				</Header>

				<Box>
					<Cell rowAll>
						<Text>Endereço de Rede</Text>
					</Cell>
					<Cell left>
						<Input
							name='Decimal'
							input={{
								type: 'text',
								placeholder: 'Network address',
								value: this.state.ip,
								onChange: this.handleAddress
							}}
						/>
					</Cell>
					<Cell center>
						<Text size='2em'>/</Text>
					</Cell>
					<Cell>
						<Input
							flex='2'
							right='25px'
							input={{
								type: 'number',
								min: '8',
								max: '30',
								placeholder: '24',
								value: this.state.mask,
								onChange: this.handleMask
							}}
						/>
						<Input
							flex='8'
							input={{
								type: 'text',
								placeholder: '255.255.255.0',
								value: this.state.mask,
								onChange: this.handleMask255
							}}
						/>
					</Cell>
					<Cell left>
						<Input
							name='Binário'
							input={{
								type: 'text',
								placeholder:
									'11111111.11111111.11111111.11111111',
								value: this.state.binaryIP,
								onChange: this.handleAddressBin
							}}
						/>
					</Cell>
					<Cell right>
						<Input
							input={{
								type: 'text',
								placeholder:
									'11111111.11111111.11111111.00000000',
								value: this.state.binaryMask,
								onChange: this.handleMaskBin
							}}
						/>
					</Cell>
					<Cell left>
						<Input
							name='Subnets'
							input={{
								type: 'text',
								placeholder: '0'
							}}
						/>
					</Cell>
					<Cell right>
						<Input
							name='Hosts'
							input={{
								type: 'text',
								placeholder: '254'
							}}
						/>
					</Cell>
					<Cell rowAll>
						<Text start='1' end='span 3'>
							Wildcard mask
						</Text>
					</Cell>
					<Cell left>
						<Input
							name='Parametro'
							input={{
								type: 'text',
								placeholder: '0'
							}}
						/>
					</Cell>
					<Cell right>
						<Input
							name='Máscara'
							input={{
								type: 'text',
								placeholder: '0'
							}}
						/>
					</Cell>
				</Box>
			</Container>
		);
	}
}

export default App;
