export interface ScheduleItem {
	id: string;
	customer: {
		id: string;
		name: string;
		avatar: string;
		phone: string;
		note: string;
		address: string;
	};
	service: string;
	date: string;
	time: string;
	duration: string;
	status: number;
}
