import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import API from "../../api";
import companyDefaultLogo from "../../assets/companyDefaultLogo.png";

function EmployerProfile() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [companyProfile, setCompanyProfile] = useState({});

  const [companyLogo, setCompanyLogo] = useState(null);
  const handleImage = (e) => {
    setCompanyLogo(URL.createObjectURL(e.target.files[0]));
  };

  const companyLogoRef = useRef(null);
  const websiteRef = useRef("");
  const emailRef = useRef("");
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const industryRef = useRef("");
  const foundedDateRef = useRef(null);
  const numberOfEmployeesRef = useRef("");
  const countryRef = useRef("");
  const stateRef = useRef("");
  const cityRef = useRef("");
  const addressRef = useRef("");
  const phoneNoRef = useRef("");

  useEffect(() => {
    const fetchEmployerProfile = async () => {
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      try {
        const response = await API.get(`/employer/profile/${user.user_id}`, {
          headers,
        });
        if (response.status === 200) {
          setCompanyProfile(response.data.employerProfile);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployerProfile();
  }, []);

  const getLogo = async () => {
    if (companyLogoRef.current.files[0]) {
      return companyLogoRef.current.files[0];
    } else {
      const img = document.getElementById("companyLogo");
      const response = await fetch(img.src);
      const blob = await response.blob();
      return new File([blob], "logo.png", {
        type: "image/png",
        lastModified: new Date().getTime(),
      });
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("logo", await getLogo());
      formData.append("website", websiteRef.current.value);
      formData.append("email", emailRef.current.value);
      formData.append("name", nameRef.current.value);
      formData.append("description", descriptionRef.current.value);
      formData.append("industry", industryRef.current.value);
      formData.append("foundedDate", foundedDateRef.current.value);
      formData.append("numberOfEmployees", numberOfEmployeesRef.current.value);
      formData.append("country", countryRef.current.value);
      formData.append("state", stateRef.current.value);
      formData.append("city", cityRef.current.value);
      formData.append("address", addressRef.current.value);
      formData.append("phoneNo", phoneNoRef.current.value);

      const headers = {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      };
      const response = await API.put(
        `/employer/profile/${user.user_id}`,
        formData,
        { headers }
      );
      if (response.status === 201) {
        toast.success("Profile Updated Successfully!");
        console.log(response.data);
        navigate("/employer");
      }
    } catch (error) {
      toast.error("Unable to Update Profile");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-2 pb-24">
      <h3 className="text-lg font-semibold text-gray-900">Employer Profile</h3>
      <p className="text-sm text-gray-500">
        Edit the form below to update your company details
      </p>

      <div className="w-[548px]">
        <form onSubmit={handleUpdate} className="space-y-3">
        <h3 className="font-bold pt-4">Employer Personal Details</h3>
          <div className="flex gap-x-4">
            <div className="flex-1">
              <label className="block text-sm/6 font-medium text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  name="firstName"
                  type="text"
                  value={user.firstName}
                  disabled={true}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 disabled:bg-indigo-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm/6 font-medium text-gray-900">
                Last Name
              </label>
              <div className="mt-2">
                <input
                  name="lastName"
                  type="text"
                  value={user.lastName}
                  disabled={true}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 disabled:bg-indigo-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                name="email"
                type="email"
                value={user.email}
                disabled={true}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 disabled:bg-indigo-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <h3 className="font-bold pt-4">Company Details</h3>
          <div className="flex space-x-4">
            <div className="flex items-center justify-center w-32 h-32 rounded-lg overflow-hidden">
              <img
                className="w-full h-full object-cover"
                id="companyLogo"
                src={
                  companyLogo
                    ? companyLogo
                    : companyProfile?.logo
                    ? companyProfile?.logo
                    : companyDefaultLogo
                }
                alt="profile_image"
              />
            </div>
            <div className="flex flex-col justify-end space-y-2">
              <label className="block text-sm/6 font-medium text-gray-900">
                Company Logo
              </label>
              <input
                ref={companyLogoRef}
                onChange={handleImage}
                type="file"
                accept="image/*"
                className="text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Company Website URL
            </label>
            <div className="mt-2">
              <input
                ref={websiteRef}
                defaultValue={
                  companyProfile?.website ? companyProfile.website : ""
                }
                name="website"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Company Email
            </label>
            <div className="mt-2">
              <input
                ref={emailRef}
                defaultValue={
                  companyProfile?.email ? companyProfile.email : ""
                }
                name="email"
                type="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Company Name
            </label>
            <div className="mt-2">
              <input
                ref={nameRef}
                defaultValue={companyProfile?.name ? companyProfile.name : ""}
                name="name"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Company Description
            </label>
            <div className="mt-2">
              <textarea
                ref={descriptionRef}
                defaultValue={
                  companyProfile?.description ? companyProfile.description : ""
                }
                name="description"
                required
                rows="5"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 resize-y"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Industry
            </label>
            <div className="mt-2">
              <input
                ref={industryRef}
                defaultValue={
                  companyProfile?.industry ? companyProfile.industry : ""
                }
                name="industry"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="flex gap-x-4">
            <div className="flex-1">
              <label className="block text-sm/6 font-medium text-gray-900">
                Number of Employees
              </label>
              <div className="mt-2">
                <select
                  ref={numberOfEmployeesRef}
                  name="numberOfEmployees"
                  defaultValue={
                    companyProfile?.numberOfEmployees
                      ? companyProfile.numberOfEmployees
                      : "1-10"
                  }
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                >
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm/6 font-medium text-gray-900">
                Founded Date
              </label>
              <div className="mt-2">
                <input
                  ref={foundedDateRef}
                  defaultValue={
                    companyProfile?.foundedDate
                      ? companyProfile.foundedDate
                      : null
                  }
                  name="foundedDate"
                  type="date"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-x-4">
            <div className="flex-1">
              <label className="block text-sm/6 font-medium text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <input
                  ref={countryRef}
                  defaultValue={
                    companyProfile?.country ? companyProfile.country : ""
                  }
                  name="country"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm/6 font-medium text-gray-900">
                State/Province
              </label>
              <div className="mt-2">
                <input
                  ref={stateRef}
                  defaultValue={
                    companyProfile?.state ? companyProfile.state : ""
                  }
                  name="state"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm/6 font-medium text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  ref={cityRef}
                  defaultValue={companyProfile?.city ? companyProfile.city : ""}
                  name="city"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Address
            </label>
            <div className="mt-2">
              <textarea
                ref={addressRef}
                defaultValue={
                  companyProfile?.address ? companyProfile.address : ""
                }
                name="address"
                rows="3"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Phone Number
            </label>
            <div className="mt-2">
              <input
                ref={phoneNoRef}
                defaultValue={
                  companyProfile?.phoneNo ? companyProfile.phoneNo : null
                }
                name="phoneNumber"
                type="number"
                required
                className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <input
              value={loading ? "Submitting..." : "Update Profile"}
              disabled={loading}
              type="submit"
              className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployerProfile;
