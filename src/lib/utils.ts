import type { IEmployee } from './types';

function onOffToBoolean(onOff: string) {
	return onOff === 'on';
}

const serializeNonPOJOs = (value: object | null) => {
	return structuredClone(value);
};

export { onOffToBoolean, serializeNonPOJOs };
