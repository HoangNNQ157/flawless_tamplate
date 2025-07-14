import ReviewList from "../components/ReviewList";
import SearchFilterBar from "../components/SearchFilterBar";

export default function ReviewPage() {
	return (
		<>
      <SearchFilterBar context="reviews"/>
      <ReviewList />
		</>
	);
}