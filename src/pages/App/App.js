import React, { Component } from 'react';

import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import { isIP, isMask } from '../../validator';

import GlobalStyle from '../../styles/globalStyle';
import { Container, Header, Text } from './App.style';
import { Box, Cell } from '../../styles/grid';

const NUM_OF_MASK = new Array(23).fill(0).map((_, i) => i + 8);

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ip: '',
			mask: '',
			binaryIP: '',
			binaryMask: '',
			maskPrefix: '',
			subnets: '',
			hosts: '',
			hostParam: '',
			Wildcard: '',
			validAddress: false
		};
	}

	convertIp = (ip, base = 2) => {
		const convert = block => (base === 10 ? parseInt(block, 2) : (+block).toString(2));

		return ip
			.split('.')
			.map(block => convert(block))
			.reduce((final, now) => `${final}.${now}`);
	};

	handleIP = async ({ target }) => {
		if (target) {
			await this.setState({ ip: target.value });
			this.handleBinaryIP({});
		} else {
			const ip = this.convertIp(this.state.binaryIP, 10);
			await this.setState({ ip });
		}

		this.handleValidate();
	};

	handleBinaryIP = async ({ target }) => {
		if (target) {
			await this.setState({ binaryIP: target.value });
			this.handleIP({});
		} else {
			const binaryIP = this.convertIp(this.state.ip, 2);
			await this.setState({ binaryIP });
		}
	};

	handleMask = async ({ target }) => {
		if (target) {
			await this.setState({ mask: target.value });
			this.handleBinaryMask({}, 'mask');
		} else {
			const mask = this.convertIp(this.state.binaryMask, 10);
			this.setState({ mask });
		}

		this.handleValidate();
	};

	handleMaskPrefix = async ({ target }) => {
		if (target) {
			await this.setState({ maskPrefix: target.value });
			this.handleBinaryMask({}, 'maskPrefix');
			this.handleHost({});
		} else {
			const binaryMask = this.state.binaryMask.split('.').join('');
			const maskPrefix = binaryMask.length - binaryMask.split('1').join('').length;
			await this.setState({ maskPrefix });
		}
	};

	handleBinaryMask = async ({ target }, origin) => {
		if (target) {
			await this.setState({ binaryMask: target.value });
			this.handleMaskPrefix({});
			this.handleMask({});
		} else {
			let binaryMask;

			if (origin === 'mask') {
				binaryMask = this.convertIp(this.state.mask, 2);
			} else {
				const { maskPrefix } = this.state;
				const bin = `${'1'.repeat(maskPrefix)}${'0'.repeat(32 - maskPrefix)}`;
				binaryMask =
					`${bin.substr(0, 8)}.${bin.substr(8, 8)}.` +
					`${bin.substr(16, 8)}.${bin.substr(24, 8)}`;
			}

			await this.setState({ binaryMask });

			if (origin === 'mask') this.handleMaskPrefix({});
			else this.handleMask({});
		}
	};

	handleHost = async ({ target }) => {
		if (target) {
			await this.setState({ host: target.value });
		} else {
			const hosts = 2 ** (32 - this.state.maskPrefix) - 2;
			await this.setState({ hosts });
		}
	};

	handleValidate = async () => {
		const { ip, mask } = this.state;
		await this.setState({ validAddress: isIP(ip) && isMask(mask) });
	};

	render() {
		return (
			<Container>
				<GlobalStyle />

				<Header>
					<h1>{`Wildcard Mask Calculator`}</h1>
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
								placeholder: '192.168.0.1',
								value: this.state.ip,
								onChange: this.handleIP
							}}
						/>
					</Cell>
					<Cell center>
						<Text size='2em'>/</Text>
					</Cell>
					<Cell>
						<Select
							flex='2'
							right='25px'
							values={NUM_OF_MASK}
							value={this.state.maskPrefix}
							onChange={this.handleMaskPrefix}
						/>
						<Input
							flex='8'
							input={{
								type: 'text',
								placeholder: '255.255.255.0',
								value: this.state.mask,
								onChange: this.handleMask
							}}
						/>
					</Cell>
					<Cell left>
						<Input
							name='Binário'
							input={{
								type: 'text',
								placeholder: '11111111.11111111.11111111.11111111',
								value: this.state.binaryIP,
								onChange: this.handleBinaryIP
							}}
						/>
					</Cell>
					<Cell right>
						<Input
							input={{
								type: 'text',
								placeholder: '11111111.11111111.11111111.00000000',
								value: this.state.binaryMask,
								onChange: this.handleBinaryMask
							}}
						/>
					</Cell>
					<Cell left>
						<Select
							name='Subnets'
							values={[8, 9]}
							disabled={!this.state.validAddress}
						/>
					</Cell>
					<Cell right>
						<Select
							name='Hosts'
							values={[8, 9, this.state.hosts]}
							value={this.state.hosts}
							right='25px'
							disabled={!this.state.validAddress}
						/>
						<Select
							name='Parametro'
							values={['Todos', 'Apenas pares', 'Apenas inpares']}
							disabled={!this.state.validAddress}
						/>
					</Cell>
					<Cell rowAll>
						<Text start='1' end='span 3'>
							Wildcard maskPrefix
						</Text>
					</Cell>
					<Cell rowAll>
						<Input
							input={{
								type: 'text',
								placeholder: '0.0.0.255',
								disabled: true
							}}
						/>
					</Cell>
				</Box>
			</Container>
		);
	}
}

export default App;
