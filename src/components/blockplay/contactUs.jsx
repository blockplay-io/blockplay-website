import React from "react";

const Contact = ({ lang }) => {
  return (
    <section
      className="mbr-section form1 cid-rw64fHa2QM mbr-parallax-background"
      id="form1-8"
    >
      <div
        className="mbr-overlay"
        style={{ opacity: "0.8", backgroundColor: "rgb(193, 193, 193)" }}
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="title col-12 col-lg-8">
            <h2 className="mbr-section-title align-center pb-3 mbr-fonts-style display-4">
              <strong>{lang === "eng" ? "CONTACT US" : "联系我们"}</strong>
            </h2>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="media-container-column col-lg-8"
            data-form-type="formoid"
          >
            {/*<!---Formbuilder Form--->*/}
            <form
              action="https://mobirise.com/"
              method="POST"
              className="mbr-form form-with-styler"
              data-form-title="Mobirise Form"
            >
              <input
                type="hidden"
                name="email"
                data-form-email="true"
                value="TbB3CEtQERHF6wojTX/gov4GAcuZWER1oZIKma2cUjlhRxyzIYvIS4q8I98Hcqq9BmEvpA4PW1X3uGQ3EdYaGzy8DKsTy5mwf+c3AUXC11qzQDH8gSdW+sw9uyJaLsKR"
              />
              <div className="row">
                <div
                  hidden="hidden"
                  data-form-alert=""
                  className="alert alert-success col-12"
                >
                  Thanks for filling out the form!
                </div>
                <div
                  hidden="hidden"
                  data-form-alert-danger=""
                  className="alert alert-danger col-12"
                />
              </div>
              <div className="dragArea row">
                <div className="col-md-4  form-group" data-for="name">
                  <label
                    htmlFor="name-form1-8"
                    className="form-control-label mbr-fonts-style display-7"
                  >
                    {lang === "eng" ? "Name" : "姓名"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    data-form-field="Name"
                    required="required"
                    className="form-control display-7"
                    id="name-form1-8"
                  />
                </div>
                <div className="col-md-4  form-group" data-for="email">
                  <label
                    htmlFor="email-form1-8"
                    className="form-control-label mbr-fonts-style display-7"
                  >
                    {lang === "eng" ? "Email" : "邮箱"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    data-form-field="Email"
                    required="required"
                    className="form-control display-7"
                    id="email-form1-8"
                  />
                </div>

                <div data-for="message" className="col-md-12 form-group">
                  <label
                    htmlFor="message-form1-8"
                    className="form-control-label mbr-fonts-style display-7"
                  >
                    {lang === "eng" ? "Message" : "信息"}
                  </label>
                  <textarea
                    name="message"
                    data-form-field="Message"
                    className="form-control display-7"
                    id="message-form1-8"
                  />
                </div>
                <div className="col-md-12 input-group-btn align-center">
                  <button
                    type="submit"
                    className="btn btn-form btn-black display-4"
                  >
                    {lang === "eng" ? "SEND FORM" : "发送表格"}
                  </button>
                </div>
              </div>
            </form>
            {/*<!---Formbuilder Form--->*/}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
