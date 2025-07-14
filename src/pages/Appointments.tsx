import SearchFilterBar from "../components/SearchFilterBar";
import CustomerTable from "../components/CustomerTable";

export default function Appointments() {
	return (
		<>
			<SearchFilterBar context="appointments"/>
			<CustomerTable />
		</>
	);
}
