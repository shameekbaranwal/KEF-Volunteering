import { BackHandler } from 'react-native'
import { useEffect } from 'react'

import { useFocusEffect } from '@react-navigation/native'

/* useBackButton hook for other components*/
function useBackButton(handler) {
	useFocusEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', handler)

		return () => {
			BackHandler.removeEventListener('hardwareBackPress', handler)
		}
	})
}

export default useBackButton
