import SearchFilterBar from "../components/SearchFilterBar";
import ArtistList from "../components/ArtistList";

export default function Appointments() {
	return (
		<>
			<SearchFilterBar context="artists"/>
			<ArtistList />
		</>
	);
}