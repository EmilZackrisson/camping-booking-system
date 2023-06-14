import type { IEmployee } from './types';

function onOffToBoolean(onOff: string) {
	return onOff === 'on';
}

export { onOffToBoolean };
