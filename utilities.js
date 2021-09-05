const convertMCQ = (arr) => {
	let str = ''
	arr.forEach((obj) => {
		if (obj.state) str += `${obj.name}; `
	})
	return str
}

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

const days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
]

const getHoursDiff = (date1, date2) => {
	const ms = date2 - date1
	return Math.floor((ms * 24) / 86400000)
}

const convertDate = (dateObj, withDay) => {
	let str = ''
	str += dateObj.getDate()
	str += ' ' + months[dateObj.getMonth()] + ', ' + dateObj.getFullYear()
	if (withDay) str += ' - ' + days[dateObj.getDay()]

	return str
}

const convertDateLogs = (dateObj) => {
	let month = dateObj.getMonth() + 1
	month = month > 9 ? month : '0' + month

	let date = dateObj.getDate()
	date = date > 9 ? date : '0' + date

	return `${dateObj.getFullYear()}-${month}-${date}`
}

const convertTime = (date) => {
	let hours = date.getHours()
	const ampm = hours >= 12 ? 'PM' : 'AM'
	hours = hours % 12 || 12

	let minutes = date.getMinutes()
	minutes = minutes < 10 ? `0${minutes}` : minutes

	return `${hours}:${minutes} ${ampm}`
}

const getBodyDataArray = (inputSpecs, values, bodyData = []) => {
	inputSpecs.forEach((input) => {
		// const value = values.find((v) => v.name === input.name)
		const value = values[input.name]
		// const data = input.type === 'multiple' ? convertMCQ(value) : value
		let data = value

		if (input.type === 'multiple') data = convertMCQ(value)
		if (input.type === 'date') data = convertDate(value)
		if (input.type === 'time') data = convertTime(value)

		bodyData.push(data)
	})
	return bodyData
}

const nameValidation = (name) => {
	return typeof name === 'string' && name.split(' ').length <= 2
}

export default {
	convertMCQ,
	days,
	months,
	convertDate,
	convertDateLogs,
	getHoursDiff,
	convertTime,
	getBodyDataArray,
	nameValidation,
}
