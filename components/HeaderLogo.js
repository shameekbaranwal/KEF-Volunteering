import React from 'react';
import { scale } from 'react-native-size-matters';

import { View, Image } from 'react-native';

const HeaderLogo = () => {
	return (
		<View style={{ flexDirection: 'row' }}>
			<Image
				source={require('../assets/KEF_Header_logo.png')}
				style={{
					resizeMode: 'contain',
					width: scale(180),
					height: scale(45),
				}}
			/>
		</View>
	);
};

export default HeaderLogo;
