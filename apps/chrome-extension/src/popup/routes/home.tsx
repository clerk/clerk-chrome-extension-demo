import heroIamge from "data-base64:~assets/light-logo.png"

export const Home = () => {
  return (
    <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-justify-center plasmo-h-full plasmo-bg-black plasmo-text-white">
      <img className="plasmo-h-auto plasmo-mb-8" src={heroIamge} alt="Clerk Chrome Extension SDK 2.0" />
      <h1 className="plasmo-text-2xl plasmo-font-semibold">Clerk Chrome Extension Demo</h1>
    </div>
  );
};
