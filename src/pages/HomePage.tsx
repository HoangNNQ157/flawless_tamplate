import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import {
	FaSearch,
	FaClock,
	FaMapMarkerAlt,
	FaShieldAlt,
	FaStar,
	FaStarHalfAlt,
} from "react-icons/fa";

const backgrounds = [
	"/img/home2.webp",
	"/img/home3.webp",
	"/img/home4.webp",
	"/img/home5.webp",
	"/img/home6.webp",
	"/img/home7.webp",
];
const testimonials = [
	{
		name: "Mrs. Adhars",
		role: "Aesthetician",
		image: "/testimonials/adhars.jpg",
		rating: 4.5,
		content:
			"“ Lobortis feugiat vivamus at augue eget arcu. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Praesent. “",
	},
	{
		name: "Mrs. Nishriya",
		role: "Skin Therapist",
		image: "/testimonials/nishriya.jpg",
		rating: 4,
		content:
			"“ Velit scelerisque in dictum non consectetur a erat nam at. Fermentum iaculis eu non diam phasellus. Mollis aliquam ut porttitor leo. “",
	},
	{
		name: "Mrs. Jenifer",
		role: "Skin Specialist",
		image: "/testimonials/jenifer.jpg",
		rating: 5,
		content:
			"“ Tincidunt vitae semper quis lectus nulla. Urna et pharetra pharetra massa massa ultricies mi. Dolor sed viverra ipsum nunc aliquet bibendum. “",
	},
	{
		name: "Mrs. Jenifer",
		role: "Skin Specialist",
		image: "/testimonials/jenifer.jpg",
		rating: 5,
		content:
			"“ Tincidunt vitae semper quis lectus nulla. Urna et pharetra pharetra massa massa ultricies mi. Dolor sed viverra ipsum nunc aliquet bibendum. “",
	},
	{
		name: "Mrs. Jenifer",
		role: "Skin Specialist",
		image: "/testimonials/jenifer.jpg",
		rating: 5,
		content:
			"“ Tincidunt vitae semper quis lectus nulla. Urna et pharetra pharetra massa massa ultricies mi. Dolor sed viverra ipsum nunc aliquet bibendum. “",
	},
	{
		name: "Mrs. Jenifer",
		role: "Skin Specialist",
		image: "/testimonials/jenifer.jpg",
		rating: 5,
		content:
			"“ Tincidunt vitae semper quis lectus nulla. Urna et pharetra pharetra massa massa ultricies mi. Dolor sed viverra ipsum nunc aliquet bibendum. “",
	},
];
const renderStars = (rating: number) => {
	const fullStars = Math.floor(rating);
	const halfStar = rating % 1 !== 0;

	return (
		<div className="flex text-yellow-500 mt-2">
			{[...Array(fullStars)].map((_, i) => (
				<FaStar key={i} />
			))}
			{halfStar && <FaStarHalfAlt />}
		</div>
	);
};

const HomePage = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % backgrounds.length);
		}, 4000); // 4s đổi ảnh

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="font-sans text-gray-800">
			{/* 1. Header */}
			<section className="relative h-[82vh] overflow-hidden text-white">
				{/* Background Slideshow */}
				{backgrounds.map((bg, i) => (
					<div
						key={i}
						className={`absolute inset-0 bg-center bg-contain transition-opacity duration-1000 ease-in-out ${
							i === index ? "opacity-100 z-10" : "opacity-0 z-0"
						}`}
						style={{ backgroundImage: `url(${bg})` }}
					/>
				))}
				{/* Overlay gradient */}
				<div className="absolute inset-0 bg-black bg-opacity-20 z-10" />
				{/* Header line */}
				<header className="relative z-20 bg-transparent w-full">
					<div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
						{/* Logo */}
						<div className="flex items-center gap-1 text-white font-semibold tracking-widest text-sm md:text-sm leading-snug">
							<h1 style={{ fontFamily: "'Allura', cursive" }}>FLAW</h1>
							{/* <img src="/public/logo-flawless.png" alt="logo" className="w-7 h-7" /> */}
							<h1 style={{ fontFamily: "'Allura', cursive" }}>LESS</h1>
						</div>

						{/* Desktop Menu */}
						<nav className="hidden md:flex gap-6 text-lg">
							<Link to="/services" className="text-white hover:text-pink-500">
								Service
							</Link>
							<Link to="/about" className="text-white hover:text-pink-500">
								About Us
							</Link>
							<Link to="/blog" className="text-white hover:text-pink-500">
								Blog
							</Link>
							<Link to="/contact" className="text-white hover:text-pink-500">
								Contact
							</Link>
						</nav>

						{/* Auth Buttons */}
						<div className="hidden md:flex items-center gap-3 text-sm">
							<Link
								to="/signin"
								className="px-5 py-3 rounded-full border text-white shadow-xl 
  hover:bg-orange-100 hover:text-orange-400 hover:border-orange-300 
  transition-all duration-200 ease-in-out hover:shadow-2xl hover:z-[999] hover:ring hover:ring-offset-1 hover:ring-orange-300"
							>
								SIGN IN
							</Link>
							<Link
								to="/signup"
								className="px-5 py-3 rounded-full border border-orange-300 bg-orange-100 text-orange-400 shadow-xl 
  hover:bg-orange-300 hover:text-orange-500 hover:border-orange-800 
  transition-all duration-200 ease-in-out hover:shadow-2xl hover:z-[999] hover:ring hover:ring-offset-1 hover:ring-orange-300"
							>
								SIGN UP
							</Link>
						</div>

						{/* Mobile Menu Toggle */}
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="md:hidden text-gray-700 text-2xl"
						>
							{mobileMenuOpen ? <HiX /> : <HiMenu />}
						</button>
					</div>

					{/* Mobile Menu Dropdown */}
					{mobileMenuOpen && (
						<div className="md:hidden bg-white px-4 py-3 space-y-3 text-sm border-t border-gray-200">
							<Link
								to="/services"
								onClick={() => setMobileMenuOpen(false)}
								className="block hover:text-pink-500"
							>
								Service
							</Link>
							<Link
								to="/about"
								onClick={() => setMobileMenuOpen(false)}
								className="block hover:text-pink-500"
							>
								About Us
							</Link>
							<Link
								to="/blog"
								onClick={() => setMobileMenuOpen(false)}
								className="block hover:text-pink-500"
							>
								Blog
							</Link>
							<Link
								to="/contact"
								onClick={() => setMobileMenuOpen(false)}
								className="block hover:text-pink-500"
							>
								Contact
							</Link>
							<div className="flex gap-2 pt-2">
								<Link
									to="/signin"
									className="flex-1 border border-gray-400 rounded-full py-1 text-center"
								>
									SIGN IN
								</Link>
								<Link
									to="/signup"
									className="flex-1 bg-purple-300 text-white rounded-full py-1 text-center"
								>
									SIGN UP
								</Link>
							</div>
						</div>
					)}
				</header>
				{/* Overlay content */}
				<div className="relative z-20 flex items-center justify-center h-full px-4 text-center">
					<div>
						<h1 className="text-4xl md:text-5xl font-light">
							Bringing the most <br />
							<span className="text-purple-300 font-semibold italic">
								Wonderful Experiences
							</span>
							<br />
							right to you
						</h1>
						<button className="mt-6 px-6 py-2 bg-orange-100 text-orange-300 rounded-full hover:bg-gray-800 transition">
							BOOK NOW
						</button>
					</div>
				</div>
			</section>

			{/* 2. Social Bar */}
			<div className="relative overflow-hidden py-8 mt-3 group">
				<div className="marquee-track animate-marquee whitespace-nowrap flex gap-28 text-orange-800 text-2xl font-semibold uppercase">
					{/* Nhân đôi nội dung để tạo hiệu ứng vòng lặp */}
					{[...Array(2)].map((_, i) => (
						<div key={i} className="flex gap-32 ml-4 ">
							<span className="flex items-center p-3 gap-2 text-orange-800 hover:text-3xl hover:shadow-lg hover:bg-orange-100 hover:text-orange-900 hover:rounded-2xl">
								As seen in
							</span>
							<a
								href="#"
								className="flex items-center p-3 gap-2 text-orange-800 hover:text-3xl hover:shadow-lg hover:bg-orange-100 hover:text-orange-900 hover:rounded-2xl"
							>
								<i className="fab fa-facebook-f" /> Facebook
							</a>
							<a
								href="#"
								className="flex items-center p-3 gap-2 text-orange-800 hover:text-3xl hover:shadow-lg hover:bg-orange-100 hover:text-orange-900 hover:rounded-2xl"
							>
								<i className="fab fa-instagram" /> Instagram
							</a>
							<a
								href="#"
								className="flex items-center p-3 gap-2 text-orange-800 hover:text-3xl hover:shadow-lg hover:bg-orange-100 hover:text-orange-900 hover:rounded-2xl"
							>
								<i className="fab fa-tiktok" /> Tiktok
							</a>
						</div>
					))}
				</div>

				{/* CSS tạm dừng animation khi hover */}
				<style>
					{`
      .group:hover .marquee-track {
        animation-play-state: paused;
      }
    `}
				</style>
			</div>

			{/* 3. Booking Steps */}
			<section className="py-12 px-6 text-center">
				<h2 className="text-3xl font-serif font-semibold tracking-wide text-orange-800 inline-block pb-2">
					YOUR SPOT. YOUR DAY. OUR CARE
				</h2>
				<div className="grid md:grid-cols-3 gap-6">
					<div>
						<h3 className="text-orange-700 text-3xl font-bold mb-2 animate-bounce">
							01
						</h3>
						<p className="font-semibold animate-pulse">Choose a location</p>
						<p className="text-sm text-gray-600">Select your service area</p>
					</div>
					<div>
						<h3 className="text-orange-700 text-3xl font-bold mb-2 animate-bounce">
							02
						</h3>
						<p className="font-semibold animate-pulse">Select day + time</p>
						<p className="text-sm text-gray-600">
							Pick a time that works for you
						</p>
					</div>
					<div>
						<h3 className="text-orange-700 text-3xl font-bold mb-2 animate-bounce">
							03
						</h3>
						<p className="font-semibold animate-pulse">
							Choose your makeup artist
						</p>
						<p className="text-sm text-gray-600">
							Choose the perfect artist for your needs
						</p>
					</div>
				</div>
			</section>

			{/* 4. Why Book Section */}
			<section
				className="py-12 px-4 md:px-16"
				style={{ backgroundImage: `url(img/bg-why.webp)` }}
			>
				<div className="text-center mb-10">
					<h2 className="text-3xl font-serif font-semibold tracking-wide text-orange-800 inline-block pb-2">
						WHY BOOK WITH FLAWLESS
					</h2>
				</div>

				<div className="grid md:grid-cols-2 gap-8 items-center">
					{/* Left: Features Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-orange-700">
						{/* Feature 1 */}
						<div className="flex flex-col items-center text-center px-2">
							<FaSearch className="text-3xl mb-2 animate-ping" />
							<h4 className="font-bold mb-1">Searching</h4>
							<p className="text-sm text-gray-600">
								Fast, diverse and quality search of makeup artists on the
								system. Public prices.
							</p>
						</div>

						{/* Feature 2 */}
						<div className="flex flex-col items-center text-center px-2">
							<FaClock className="text-3xl mb-2 animate-spin" />
							<h4 className="font-bold mb-1">Flexible Time</h4>
							<p className="text-sm text-gray-600">
								Providing services covering all business hours, meeting the
								needs of many customers.
							</p>
						</div>

						{/* Feature 3 */}
						<div className="flex flex-col items-center text-center px-2">
							<FaMapMarkerAlt className="text-3xl mb-2 animate-bounce" />
							<h4 className="font-bold mb-1">Flexible location</h4>
							<p className="text-sm text-gray-600">
								Available at any location within the city provided by the
								customer.
							</p>
						</div>

						{/* Feature 4 */}
						<div className="flex flex-col items-center text-center px-2">
							<FaShieldAlt className="text-3xl mb-2 animate-pulse" />
							<h4 className="font-bold mb-1">Security and Safety</h4>
							<p className="text-sm text-gray-600">
								Secure payment, personal information security, ensuring safety
								for customers and experts.
							</p>
						</div>
					</div>
					{/* Right: Image */}
					<div className="w-full">
						<img
							src="/public/img/why.webp"
							alt="Makeup Session"
							className="w-full h-full object-cover rounded-md shadow-md"
						/>
					</div>
				</div>
			</section>

			{/* Signature Services */}
			{/* <section className="text-white py-12 px-6">
				<h2 className="text-center text-3xl font-serif font-semibold tracking-wide text-orange-800 pb-2 mb-6">
					OUR SIGNATURE SERVICES
				</h2> */}
			{/* <div className="grid md:grid-cols-3 gap-4">
					<div className="bg-gray-700 h-48 rounded-md"></div>
					<div className="bg-gray-700 h-48 rounded-md"></div>
					<div className="bg-gray-700 h-48 rounded-md"></div>
					<div className="bg-gray-700 h-48 rounded-md"></div>
					<div className="bg-gray-700 h-48 rounded-md"></div>
					<div className="bg-gray-700 h-48 rounded-md"></div>
				</div> */}

			{/* <div className="grid md:grid-cols-3 gap-4">

  <div className="bg-gray-700 h-48 rounded-md">
    <img
      src="https://tse4.mm.bing.net/th?id=OIP.HNFwgcujd-rXTBPZ7ergaQHaEK&pid=Api"
      alt="Makeup đi tiệc"
      className="w-full h-full object-cover rounded-md"
    />
  </div>


  <div className="bg-gray-700 h-48 rounded-md">
    <img
      src="https://tse3.mm.bing.net/th?id=OIP.lE6x7cQIPBzZlVfw6DIxtQHaHa&r=0&pid=Api"
      alt="Makeup kỷ yếu"
      className="w-full h-full object-cover rounded-md"
    />
  </div>


  <div className="bg-gray-700 h-48 rounded-md">
    <img
      src="https://tse3.mm.bing.net/th?id=OIP.yubdQ5OKMFrV_bhVHwEW9QHaJ4&pid=Api"
      alt="Makeup cô dâu"
      className="w-full h-full object-cover rounded-md"
    />
  </div>

  <div className="bg-gray-700 h-48 rounded-md">
    <img
      src="https://tse3.mm.bing.net/th?id=OIP.ZIUhxIqF2FLTgDBe55JEjAHaJM&r=0&pid=Api"
      alt="Makeup Halloween 1"
      className="w-full h-full object-cover rounded-md"
    />
  </div>

  <div className="bg-gray-700 h-48 rounded-md">
    <img
      src="https://i.pinimg.com/564x/aa/e1/f2/aae1f2b9f1f367a7d206e8efc48279c0.jpg"
      alt="Makeup Halloween 2"
      className="w-full h-full object-cover rounded-md"
    />
  </div>


  <div className="bg-gray-700 h-48 rounded-md">
    <img
      src="https://static.wixstatic.com/media/ea1efb_53f2e3d23eaf4db2bbf92c9a40e151a4~mv2.jpg/v1/fill/w_560,h_373,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/ea1efb_53f2e3d23eaf4db2bbf92c9a40e151a4~mv2.jpg"
      alt="Makeup dự tiệc sang trọng"
      className="w-full h-full object-cover rounded-md"
    />
  </div>
</div> */}

			{/* </section> */}

			{/* Expanded Locations */}
			<section className="py-12 px-6">
				<h2 className="text-center text-3xl font-serif font-semibold tracking-wide text-orange-800 pb-2 mb-6 uppercase">
					Collaborate with KOLs
				</h2>
				<div
					className="overflow-hidden py-6"
					style={{ backgroundImage: `url(img/bg-why.webp)` }}
				>
					<div className="flex gap-6 animate-scroll-x whitespace-nowrap">
						{[
							"kol1",
							"kol2",
							"kol3",
							"kol4",
							"kol5",
							"kol6",
							"kol7",
							"kol8",
							"kol9",
							"kol10",
							"kol1",
							"kol2",
							"kol3",
							"kol4",
							"kol5",
							"kol6",
							"kol7",
							"kol8",
							"kol9",
							"kol10",
						].map((img, i) => (
							<div
								key={i}
								className="h-64 w-40 flex-shrink-0 rounded-md overflow-hidden shadow-md bg-white"
							>
								<img
									src={`/img/${img}.jpg`}
									alt=""
									className="w-full h-full object-cover"
								/>
							</div>
						))}
					</div>

					{/* Pause on hover */}
					<style>
						{`
      .animate-scroll-x {
        animation: scroll-x 20s linear infinite;
      }
      .animate-scroll-x:hover {
        animation-play-state: paused;
      }
      @keyframes scroll-x {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-50%);
        }
      }
    `}
					</style>
				</div>
			</section>

			{/* 5. Review */}
			<section
				className="py-16 px-6"
				style={{ backgroundImage: `url(img/bg-review.webp)` }}
			>
				<div className="max-w-screen-xl mx-auto grid md:grid-cols-4 gap-8 items-start">
					{/* Left Title */}
					<div className="md:col-span-1 space-y-4">
						<h5 className="text-sm tracking-wide text-orange-900 uppercase font-bold">
							Testimonials
						</h5>
						<h2 className="text-4xl font-light text-orange-800">
							Happy{" "}
							<span className="italic text-orange-900 font-normal">
								Customers
							</span>
							<br />
							<span className="font-semibold text-brown-900">Thoughts</span>
						</h2>
						<p className="text-sm text-gray-600 leading-relaxed italic">
							"Elit scelerisque mauris pellentesque pulvinar pellentesque
							habitant morbi tristique senectus."
						</p>
					</div>

					{/* Testimonials Cards */}
					{testimonials.map((t, index) => (
						<div
							key={index}
							className="bg-orange-50 p-6 rounded-xl shadow-xl text-center space-y-4 animate-marquee"
						>
							<p className="text-sm text-orange-800 italic">{t.content}</p>
							<div className="flex flex-col items-center">
								<img
									src={t.image}
									alt={t.name}
									className="w-14 h-14 rounded-full object-cover border-2"
								/>
								<h4 className="mt-2 font-semibold text-orange-900">{t.name}</h4>
								<p className="text-sm text-orange-700">{t.role}</p>
								{renderStars(t.rating)}
							</div>
						</div>
					))}
				</div>
			</section>
			{/* Footer */}
			<footer
				className="py-8 px-4"
				style={{ backgroundImage: `url(img/bg-why.webp)` }}
			>
				<div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
					{/* Brand Info */}
					<div>
						<p className="text-2xl text-orange-900 mb-1">
							Platform booking services
						</p>
						<h1 className="text-4xl text-orange-800 font-serif font-bold px-6">
							FLAWLESS
						</h1>
						<p className="text-xs mt-1 text-orange-600">@copyringt 2025</p>
					</div>

					{/* Contact Info */}
					<div className="text-orange-800">
						<p className="text-2xl text-orange-900 mb-1 font-semibold">
							Contact
						</p>
						<p>flawless@gmail.com</p>
						<p>(091) 123-6789</p>
						<p>123 Ngo Quyen Street</p>
					</div>

					{/* Payment Methods */}
					<div className="flex flex-wrap items-center gap-4 text-orange-800">
						<img src="/public/img/visa.jpg" alt="Visa" className="h-6" />
						<img
							src="/public/img/applepay.png"
							alt="Apple Pay"
							className="h-6"
						/>
						<img src="/public/img/momowebp.webp" alt="Momo" className="h-6" />
						<img src="/public/img/vnpay.jpg" alt="VnPay" className="h-6" />
						<p className="text-xs italic">#GOFLAWLESS</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default HomePage;
