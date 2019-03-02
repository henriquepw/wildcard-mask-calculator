import React, { Component } from 'react';

import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import { isIP, isMask } from '../../validator';

import GlobalStyle from '../../styles/globalStyle';
import { Container, Header, Text } from './App.style';
import { Box, Cell } from '../../styles/grid';

const range = (start, end, step) =>
	new Array(end - start + 1)
		.fill(0)
		.map((_, i) => (step ? step(i) : i + start));

const NUM_OF_MASK = range(8, 30);
const NUM_OF_SUBNETS = range(0, 7, i => 2 ** i);
//const NUM_OF_HOSTS = range(2, 16777214);

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ip: '',
			mask: '',
			binaryIP: '',
			binaryMask: '',
			maskPrefix: '8',
			subnets: '1',
			hosts: '254',
			hostParam: 'Todos',
			Wildcard: '',
			validAddress: false
		};
	}

	convertIp = (ip, base = 2) => {
		const convert = block =>
			base === 10 ? parseInt(block, 2) : (+block).toString(2);

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

	handleMaskPrefix = async ({ target }, origin) => {
		if (target) {
			await this.setState({ maskPrefix: target.value });
			this.handleBinaryMask({}, 'maskPrefix');
			this.handleHost({}, 'maskPrefix');
		} else {
			if (origin === 'binaryMask') {
				const binaryMask = this.state.binaryMask.split('.').join('');
				const maskPrefix =
					binaryMask.length - binaryMask.split('1').join('').length;
				await this.setState({ maskPrefix });
			} else {
			}
		}
	};

	handleBinaryMask = async ({ target }, origin) => {
		if (target) {
			await this.setState({ binaryMask: target.value });
			this.handleMaskPrefix({}, 'binaryMask');
			this.handleMask({});
		} else {
			let binaryMask;

			if (origin === 'mask') {
				binaryMask = this.convertIp(this.state.mask, 2);
			} else {
				const { maskPrefix } = this.state;
				const bin = `${'1'.repeat(maskPrefix)}${'0'.repeat(
					32 - maskPrefix
				)}`;
				binaryMask =
					`${bin.substr(0, 8)}.${bin.substr(8, 8)}.` +
					`${bin.substr(16, 8)}.${bin.substr(24, 8)}`;
			}

			await this.setState({ binaryMask });

			if (origin === 'mask') this.handleMaskPrefix({});
			else this.handleMask({});
		}
	};

	handleHost = async ({ target }, origin) => {
		if (target) {
			await this.setState({ hosts: target.value });
			this.handleSubnet({});
		} else {
			if (origin === 'maskPrefix') {
				const hosts = 2 ** (32 - this.state.maskPrefix) - 2;
				await this.setState({ hosts });
				this.handleSubnet({});
			} else {
				this.handleMaskPrefix({}, 'hosts');
			}
		}
	};

	handleSubnet = async ({ target }) => {
		if (target) {
			await this.setState({ subnets: target.value });
			this.handleHost({}, 'subnet');
		} else {
			const subnets = 2 ** (this.state.maskPrefix % 8);
			await this.setState({ subnets });
		}
	};

	handleWildcard = () => {
		const { mask, hostParam } = this.state;

		const Wildcard = mask
			.split('.')
			.map(block => parseInt(block))
			.map(
				(block, i) =>
					(hostParam !== 'Todos' && i === 3 ? 254 : 255) - block
			)
			.reduce((final, now) => `${final}.${now}`);

		this.setState({ Wildcard });
	};

	handleValidate = async () => {
		const { ip, mask } = this.state;
		const validAddress = isIP(ip) && isMask(mask);
		if (validAddress) this.handleWildcard();
		await this.setState({ validAddress });
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
								placeholder:
									'11111111.11111111.11111111.11111111',
								value: this.state.binaryIP,
								onChange: this.handleBinaryIP
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
								onChange: this.handleBinaryMask
							}}
						/>
					</Cell>
					<Cell left>
						<Select
							name='Subnets'
							values={NUM_OF_SUBNETS}
							value={this.state.subnets}
							onChange={this.handleSubnet}
							disabled={true} //{!this.state.validAddress}
						/>
					</Cell>
					<Cell right>
						<Select
							right='25px'
							name='Hosts'
							values={[8, 9, this.state.hosts]}
							value={this.state.hosts}
							onChange={this.handleHost}
							disabled={true} //{!this.state.validAddress}
						/>
						<Select
							name='Parametro'
							values={['Todos', 'Apenas pares', 'Apenas inpares']}
							value={this.state.hostParam}
							onChange={async ({ target }) => {
								await this.setState({
									hostParam: target.value
								});
								this.handleValidate();
							}}
							//disabled={!this.state.validAddress}
						/>
					</Cell>
					<Cell rowAll>
						<Text start='1' end='span 3'>
							Wildcard mask
						</Text>
					</Cell>
					<Cell rowAll>
						<Input
							input={{
								type: 'text',
								placeholder: '0.0.0.255',
								value: this.state.Wildcard,
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
