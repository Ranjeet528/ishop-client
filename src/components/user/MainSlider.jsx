export default function MainSlider() {
  return (
    <div className="relative rounded-[30px] overflow-hidden h-[420px]">
      <img
        src="/images/pexels-pavel-danilyuk-8638305.jpg"
        alt="banner"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/30 flex flex-col justify-center px-10">
        <h1 className="text-4xl lg:text-6xl font-bold text-white max-w-[500px]">
          Don’t miss amazing grocery deals
        </h1>

        <p className="text-white text-lg mt-4">
          Sign up for the daily newsletter
        </p>

        <div className="bg-white rounded-full flex items-center mt-8 overflow-hidden w-full max-w-[450px] h-[55px]">
          <input
            type="text"
            placeholder="Your email address"
            className="w-full px-5 outline-none"
          />

          <button className="bg-[#11b5b0] text-white px-8 h-full">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}