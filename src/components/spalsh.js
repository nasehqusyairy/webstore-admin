import Image from "next/image";
import logo from "@/img/logo.jpg";

function Splash() {
  return (
    <main>
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ height: '85vh' }}>
          <div className="col-12 col-md-4 text-center">
            <div className="fade-in">
              <Image src={logo} width={100} className="img-fluid rounded-circle mb-3" alt="" priority></Image>
              <h3 className="brand text-white">Weboender Community</h3>
            </div>
            <div className="progress border" role="progressbar">
              <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '100%' }}>Loading, Please wait...</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Splash;