export interface ArtistList {
	idArtist: string;
	nameArtist: string;
	avatar: string;
	role: string;
	specialty: string;
	status: number;
	gender: number;
	phone: string;
	email: string;
	dob: string;
	bankAccount: {
		bank: string;
		stk: string;
		name: string;
	};
	address: string;
	areaBook: string;
	note: string;
	aboutArtist: string;
	timeJoin: string;
	services: {
			id: string;
			name: string;
			price: number;
			description: string;
			status: number;
		}[];
	certificateImg: string[];
	reviewCount: number;
	rating: number;
	experience: string;
	schedule: {
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
		}[];
	totalIncome: number;
	totalBooked: number;
	totalCancel: number;
	totalCustomer: number;
	productUsed: string[];
}