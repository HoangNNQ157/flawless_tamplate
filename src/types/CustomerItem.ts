export interface CustomerItem {
	idCus: string;
	nameCus: string;
	avatarCus: string;
	artist: {
		// filter theo idCus, những artist mà customer này đã từng booking
		idAr: string;
		nameAr: string;
	}[];
	services: {
		idSer: string;
		nameSer: string;
		description: string;
		paymentStatus: number; //-1(unsuccessful)/0(pending)/1(paid),
		timebooking: string; //"2025-09-12 - 09:00 AM",
	}[];
	status: number; //0(banded)/1(available),
	gender: number; //-1(female)/0(unknown)/1(male),
	phone: number;
	email: string;
	address: string;
	note: string;
}

export interface CustomerListState {
	customerList: CustomerItem[];
	loading: boolean;
	error: string | null;
}
