import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../api";

function ProfilePage() {
  const { admin } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      const result = await API.get("/profile", {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      setProfile(result.data.profile);
    };

    fetchProfileData();
  }, []);

  return (
    <div className="p-6">
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">
          Admin Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
          Admin Personal Details
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">First Name</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.firstName}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Last Name</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.lastName}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Email</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {profile.email}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Created At</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {new Date(profile.createdAt).toUTCString()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default ProfilePage;
