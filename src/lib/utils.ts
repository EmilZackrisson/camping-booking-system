import jwt from 'jsonwebtoken';

function onOffToBoolean(onOff: string) {
	return onOff === 'on';
}

const serializeNonPOJOs = (value: object | null) => {
	return structuredClone(value);
};

function getInfoFromToken(token: string) {
	const decoded = jwt.decode(token) as { id: string; email: string; iat: number; exp: number };
	return decoded;
}

export { onOffToBoolean, getInfoFromToken, serializeNonPOJOs };
