const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Vahan';
    const text = 'Hello';
    const message = generateMessage(from, text);

    expect(message).toInclude({ from, text });
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Vahan';
    const latitude = 39;
    const longitude = 40;
    const url = `https://google.com/maps?q=${latitude},${longitude}`;
    const location = generateLocationMessage(from, latitude, longitude);

    expect(location).toInclude({ from, url });
    expect(location.createdAt).toBeA('number');
  });
});
