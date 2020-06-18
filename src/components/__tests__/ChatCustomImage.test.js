import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import CustomImage from '../ChatCustomImage';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

const item = {
	_id: "7be35242-957e-4af3-aa63-881124a79ed0",
	chatroom: "dLyDZVfkOZ2XDVk49jHF",
	createdAt: "2020-06-18T05:45:30.528Z",
	image: "https://firebasestorage.googleapis.com/v0/b/calendar-app-57e88.appspot.com/o/chatimage%2FdLyDZVfkOZ2XDVk49jHF%2F202006%2F73891c7b-5960-4b7f-a7e3-b8975ee9fecc?alt=media&token=f76974de-d8d2-4b1f-a980-a83265bdcf10",
	quickReplies: undefined,
	system: false,
	timestamp: "2020-06-18T05:45:30.528Z",
	user: {
		_id: "g1goqmCShIT54ZP3nKkjHZGo1hu1",
		email: undefined,
		name: "",
	},
	video: undefined,
}


test('show photo in chat thread', () => {
	const { toJSON, getByTestId } = render(
		<CustomImage currentMessage={item} />
	);

	expect(toJSON()).toMatchSnapshot();
	expect(getByTestId('customImage.image').props).toEqual(
		expect.objectContaining({
			uri: "https://firebasestorage.googleapis.com/v0/b/calendar-app-57e88.appspot.com/o/chatimage%2FdLyDZVfkOZ2XDVk49jHF%2F202006%2F73891c7b-5960-4b7f-a7e3-b8975ee9fecc?alt=media&token=f76974de-d8d2-4b1f-a980-a83265bdcf10",
		})
	);

	fireEvent.press(getByTestId('customImage.showImage'));
	fireEvent.press(getByTestId('customImage.save'));
});




