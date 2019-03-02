import React from 'react';
import { Box, Select, Option } from './Select.style';

export default props => (
	<Box flex={props.flex} right={props.right} disabled={props.disabled}>
		<label>{props.name}</label>
		<Select
			onChange={props.onChange}
			value={props.value}
			disabled={props.disabled}
		>
			{props.values.map(value => (
				<Option value={value} key={value}>
					{value}
				</Option>
			))}
		</Select>
	</Box>
);
