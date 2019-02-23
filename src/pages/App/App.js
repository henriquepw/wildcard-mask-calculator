import React, { Component } from 'react';

import Input from '../../components/Input/Input';

import GlobalStyle from '../../styles/globalStyle';
import { Container, Header, Text } from './App.style';
import { Box, Cell } from '../../styles/grid';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            addressBin: '',
            mask: '',
            mask255: '',
            maskBin: '',
            Wildcard: ''
        };
    }

    convertIp = (address, base) => {
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
                    <h1>Wildcard Mask Calculator</h1>
                </Header>

                <Box>
                    <Cell rowAll>
                        <Text start='1' end='span 3'>
                            Endereço de Rede
                        </Text>
                    </Cell>
                    <Cell>
                        <Input
                            name='Decimal'
                            input={{
                                type: 'text',
                                placeholder: 'Network address',
                                value: this.state.address,
                                onChange: this.handleAddress
                            }}
                        />
                    </Cell>
                    <Cell>
                        <Text size='3em' margin='0px 15px 0px 15px'>
                            /
                        </Text>
                    </Cell>
                    <Cell>
                        <Input
                            input={{
                                width: '1.8em',
                                type: 'number',
                                min: '8',
                                max: '30',
                                placeholder: '24',
                                value: this.state.mask,
                                onChange: this.handleMask
                            }}
                        />
                        <Input
                            input={{
                                type: 'text',
                                placeholder: '255.255.255.0',
                                value: this.state.mask255,
                                onChange: this.handleMask255
                            }}
                        />
                    </Cell>
                    <Cell>
                        <Input
                            name='Binário'
                            input={{
                                type: 'text',
                                placeholder:
                                    '11111111.11111111.11111111.11111111',
                                value: this.state.addressBin,
                                onChange: this.handleAddressBin
                            }}
                        />
                    </Cell>
                    <Cell right>
                        <Input
                            start='4'
                            input={{
                                type: 'text',
                                placeholder:
                                    '11111111.11111111.11111111.00000000',
                                value: this.state.maskBin,
                                onChange: this.handleMaskBin
                            }}
                        />
                    </Cell>
                    <Cell>7</Cell>
                    <Cell right>8</Cell>
                    <Cell rowAll>9</Cell>
                    <Cell rowAll>
                        <Text start='1' end='span 3'>
                            Wildcard mask
                        </Text></Cell>
                    <Cell>11</Cell>
                    <Cell right>12</Cell>
                </Box>
            </Container>
        );
    }
}

export default App;
