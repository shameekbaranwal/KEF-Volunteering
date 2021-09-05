import React from 'react'

import { View, StyleSheet, ScrollView } from 'react-native'
import Colors from '../constants/Colors'
import Card from '../components/TestimonialCard'

const TestimonialScreen = (props) => {
	return (
		<ScrollView>
			<View style={styles.screen}>
				<Card
					title='- Dilip Lala'
					quote='“Satisfaction is to bring positive change in someone’s life!”'
					description='Volunteering'
					subTitle='I believe volunteering at KEF is a continuous process of unravelling the hidden treasures of achievement and contentment where one can sense how small efforts have the potential to make a huge impact in the lives of others.'
					image={require('../assets/Dilip-Lala.png')}
				/>

				<Card
					title='- Savita John'
					quote='“Volunteering...a way of life!”'
					description='Excel'
					subTitle='Though I am associated with at least a dozen NGOs across Mumbai but, I have developed the deepest connection with Kotak Education Foundation. The dedicated team— be it coordination amongst the students, their follow-up work, their alert presence in the class, their proactive and caring nature—has also motivated me to continue volunteering.'
					image={require('../assets/Savita.png')}
				/>
				<Card
					title='- Sejal M Patani'
					quote='“Volunteering, a gift to myself!”'
					description='Excel, Umang'
					subTitle='I would like to thank Kotak Education Foundation and its team members for providing me with opportunities to volunteer, learn and explore the different facets of the KEF. My experience at KEF has helped me in understanding myself and in assessing my capabilities. I started volunteering under the SEP with guidance from KEF teachers. While it was a challenge and I learnt a lot while communicating with the students to make myself understood.'
					image={require('../assets/Sejal.png')}
				/>
				<Card
					title='- Priti Thakkar'
					quote='“My way to show gratitude to the society and the people!”'
					description='Unnati, Excel'
					subTitle='I am extremely honoured and happy to be a small part of an amazing NGO— Kotak Education Foundation and its volunteering team. Volunteering with KEF has been a great learning experience. The passion to serve the underprivileged has unified everyone in the team breaking the barriers of caste, creed and social status. At KEF I have also learnt how a small contribution of each individual can positively impact the lives of those around us. I would like to thank my mentors for giving me the amazing opportunity to be a part of the volunteering team. I wish KEF all the luck for their commendable efforts in making the world a better place.'
					image={require('../assets/priti.png')}
				/>
				<Card
					title='- Susmeeta Birla'
					quote='“A volunteer helps build a community!”'
					description='Excel, Unnati, Core Member of TSEP'
					subTitle='I started volunteering for Kotak Education Foundation’s Unnati programme, where I engaged in conducting Telephonic Spoken English Programme sessions, where I was involved in enhancing the speaking skills of the students, to help them gain confidence and enable them to freely express themselves. I am extremely happy with the impact that these sessions had, because my students worked ceaselessly with me, and today they have got jobs with good future prospects. I am extremely grateful to KEF for giving me this opportunity to help build a community. I look forward to working with KEF in their future projects.'
					image={require('../assets/Susmeeta.png')}
					marginBottom={'-5%'}
				/>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.primary,
		padding: '8%',
		paddingTop: '4%',
	},
})

export default TestimonialScreen
