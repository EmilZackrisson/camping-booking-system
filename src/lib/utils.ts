import jwt from 'jsonwebtoken';

function onOffToBoolean(onOff: string) {
	return onOff === 'on';
}

function getInfoFromToken(token: string) {
	const decoded = jwt.decode(token) as { id: string; email: string; iat: number; exp: number };
	return decoded;
}

export { onOffToBoolean, getInfoFromToken };
