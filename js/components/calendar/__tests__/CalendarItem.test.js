import React from 'react';
import { render } from 'react-native-testing-library';
import * as Calendar from 'expo-calendar';
import Calendars from '../Calendars';

const itemCore = {
	params: {
		"_key": "schoolStarts",
		"dateTimeEnd": undefined,
		"dateTimeStart": undefined,
		"date_start": "2020-08-12",
		"description": undefined,
		"descriptionMyLanguage": "2020/2021 Calendar",
		"location": undefined,
		"order": undefined,
		"photo1": "https://firebasestorage.googleapis.com/v0/b/calendar-app-57e88.appspot.com/o/random%2F202006%2F7a2af15c-093b-4722-af28-a313a76a6676?alt=media&token=16f5257e-ba70-4906-aa28-48b4c16cf0d5",
		"showIconChat": false,
		"source": "calendar",
		"summary": undefined,
		"summaryMyLanguage": "School Starts In 58 Days",
		"time_end_pretty": undefined,
		"time_start_pretty": undefined,
		"visible": true,
		"visibleMore": undefined,
	}
}

const calendars = [
	{
		"allowedAvailabilities": [],
		"allowsModifications": false,
		"color": "#8295AF",
		"entityType": "event",
		"id": "4DF9B6B8-3D4C-443B-8C5F-D238C45AB06F",
		"source": {
			"id": "0B5BD563-2477-48D3-A90B-9F84AD543EA5",
			"name": "Other",
			"type": "birthdays",
		},
		"title": "Siri Suggestions",
		"type": "unknown",
	},
	{
		"allowedAvailabilities": [],
		"allowsModifications": false,
		"color": "#8295AF",
		"entityType": "event",
		"id": "5BFBF7D4-343A-4138-BE03-B4E596E96670",
		"source": {
			"id": "0B5BD563-2477-48D3-A90B-9F84AD543EA5",
			"name": "Other",
			"type": "birthdays",
		},
		"title": "Birthdays",
		"type": "birthdays",
	},
	{
		"allowedAvailabilities": [],
		"allowsModifications": true,
		"color": "#1BADF8",
		"entityType": "event",
		"id": "E613487E-56C2-443C-AB35-1DB66288ED85",
		"source": {
			"id": "B5929C5A-4BE1-4DEB-82A5-2A428DADBA1A",
			"name": "Default",
			"type": "local",
		},
		"title": "Calendar",
		"type": "local",
	},
	{
		"allowedAvailabilities": [],
		"allowsModifications": false,
		"color": "#CC73E1",
		"entityType": "event",
		"id": "5B3228A5-5AC6-4B0F-9B2E-476672EF3BE5",
		"source": {
			"id": "1E5351B5-4790-4961-8D09-474391879D3F",
			"name": "Subscribed Calendars",
			"type": "subscribed",
		},
		"title": "US Holidays",
		"type": "subscribed",
	},
]


test('list of calendars on the device - no calendars', () => {
	const navigation = { navigate: jest.fn() };

	Calendar.requestCalendarPermissionsAsync.mockResolvedValue({ status: "granted" })
	Calendar.getCalendarsAsync.mockResolvedValue(calendars)

	const { toJSON, queryByText } = render(
		<Calendars
			route={itemCore}
			navigation={navigation}

		/>
	);

	expect(toJSON()).toMatchSnapshot();
	expect(queryByText("No Calendars Available")).not.toBeNull();

});


test('list of calendars on the device - with calendars', () => {
	const navigation = { navigate: jest.fn() };

	Calendar.requestCalendarPermissionsAsync.mockResolvedValue({ status: "granted" })
	Calendar.getCalendarsAsync.mockResolvedValue(calendars)

	const { toJSON, queryByText } = render(
		<Calendars
			route={itemCore}
			navigation={navigation}
			calendars={calendars}
		/>
	);

	expect(toJSON()).toMatchSnapshot();
	expect(queryByText("US Holidays")).not.toBeNull();

});



