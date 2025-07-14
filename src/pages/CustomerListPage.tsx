import SearchFilterBar from "../components/SearchFilterBar";
import CustomerListTable from "../components/CustomerListTable";

export default function CustomerListPage() {
	return (
		<>
			<SearchFilterBar context="artists"/>
			<CustomerListTable />
		</>
	);
}
