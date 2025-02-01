import Logo from "/src/assets/logo1.png";

const Footer = () => {
  return (
    <div className=" bg-[#002a3f] ">
      <footer className="footer max-w-screen-xl m-auto text-neutral-content justify-center items-center p-4">
        <div className="grid-flow-col items-center">
          <img className="max-w-16" src={Logo} alt="Computer Club KYAU" />
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved and
            Developed By{" "}
            <a className="text-[#2ec4b6]" href="https://inforsix.com/">
              Inforsix LTD
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
