import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import API from "../../api";
import ProfilePic from "../../assets/profile.png";

function JobSeekerProfile() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});

  const [profilePic, setProfilePic] = useState(null);
  const handleImage = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const profilePicRef = useRef(null);
  const genderRef = useRef("");
  const dobRef = useRef("");
  const countryRef = useRef("");
  const stateRef = useRef("");
  const cityRef = useRef("");
  const addressRef = useRef("");
  const phoneNoRef = useRef("");
  const degreeNameRef = useRef("");
  const collegeNameRef = useRef("");
  const completionDateRef = useRef("");

  useEffect(() => {
    const fetchJobSeekerProfile = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${user.token}`,
        };
        const response = await API.get(`/job-seeker/profile/${user.user_id}`, {
          headers,
        });
        if (response.status === 200) {
          setProfile(response.data.jobSeekerProfile);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobSeekerProfile();
  }, []);

  const getProfilePic = async () => {
    if (profilePicRef.current.files[0]) {
      return profilePicRef.current.files[0];
    } else {
      const img = document.getElementById("jobSeekerProfilePic");
      const response = await fetch(img.src);
      const blob = await response.blob();
      return new File([blob], "profile.png", {
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
      formData.append("profilePicture", await getProfilePic());
      formData.append("dateOfBirth", dobRef.current.value);
      formData.append("gender", genderRef.current.value);
      formData.append("country", countryRef.current.value);
      formData.append("state", stateRef.current.value);
      formData.append("city", cityRef.current.value);
      formData.append("address", addressRef.current.value);
      formData.append("phoneNo", phoneNoRef.current.value);
      formData.append("degreeName", degreeNameRef.current.value);
      formData.append("collegeName", collegeNameRef.current.value);
      formData.append("completionDate", completionDateRef.current.value);

      const headers = {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "multipart/form-data",
      };
      const response = await API.put(
        `/job-seeker/profile/${user.user_id}`,
        formData,
        { headers }
      );
      if (response.status === 201) {
        toast.success("Profile Updated Successfully!");
        console.log(response.data);
        navigate("/job-seeker");
      }
    } catch (error) {
      toast.error("Unable to Update Profile");
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 space-y-2 pb-24">
      <h3 className="text-lg font-semibold text-gray-900">Job Seeker Profile</h3>
      <p className="text-sm text-gray-500">
        Edit the form below to update your profile details
      </p>

      <h3 className="font-bold py-4">Profile Picture</h3>
      <div className="flex space-x-4">
        <div className="flex items-center justify-center w-32 h-32 rounded-lg overflow-hidden">
          <img
            id="jobSeekerProfilePic"
            className="w-full h-full object-cover"
            src={
              profilePic
                ? profilePic
                : profile?.profilePicture
                ? profile.profilePicture
                : ProfilePic
            }
            alt="profile_image"
          />
        </div>
        <div className="flex flex-col justify-end space-y-2">
          <label className="block text-sm/6 font-medium text-gray-900">
            Change Picture
          </label>
          <input
            ref={profilePicRef}
            onChange={handleImage}
            type="file"
            accept="image/*"
            className="text-sm"
          />
        </div>
      </div>

      <div className="max-w-[548px]">
        <form onSubmit={handleUpdate} className="space-y-3">
          <h3 className="font-bold pt-4">Personal Details</h3>
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

          <div className="flex gap-x-4">
            <div className="flex-1">
              <label className="block text-sm/6 font-medium text-gray-900">
                Gender
              </label>
              <div className="mt-2">
                <select
                  ref={genderRef}
                  name="gender"
                  defaultValue={profile?.gender ? profile.gender : "Male"}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm/6 font-medium text-gray-900">
                Date of Birth
              </label>
              <div className="mt-2">
                <input
                  ref={dobRef}
                  defaultValue={
                    profile?.dateOfBirth ? profile.dateOfBirth : null
                  }
                  name="dob"
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
                  defaultValue={profile?.country ? profile.country : ""}
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
                  defaultValue={profile?.state ? profile.state : ""}
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
                  defaultValue={profile?.city ? profile.city : ""}
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
                defaultValue={profile?.address ? profile.address : ""}
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
                defaultValue={profile?.phoneNo ? profile.phoneNo : null}
                name="phoneNumber"
                type="number"
                required
                className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <h3 className="font-bold pt-4">Education Details</h3>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Degree/Certificate Name
            </label>
            <div className="mt-2">
              <input
                ref={degreeNameRef}
                defaultValue={profile?.degreeName ? profile.degreeName : ""}
                name="degreeName"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label className="block w-full text-sm/6 font-medium text-gray-900">
              College/University Name
            </label>
            <div className="mt-2">
              <input
                ref={collegeNameRef}
                defaultValue={profile?.collegeName ? profile.collegeName : ""}
                name="collegeName"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Completion Date/Expected Completion Date
            </label>
            <div className="mt-2">
              <input
                ref={completionDateRef}
                defaultValue={
                  profile?.completionDate ? profile.completionDate : null
                }
                name="completionDate"
                type="date"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
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

export default JobSeekerProfile;
