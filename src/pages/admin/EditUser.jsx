import React, { useEffect, useState } from 'react';
import { Container } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import appwrite from '../../appwrite/config';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { GrFormNext } from 'react-icons/gr';
import Animator from '../../components/Animator';
import Loader from '../../components/Loader';
import { setProfileDetails as setSliceProfileDetails } from '../../store/authSlice';

function EditUser() {
  const { userId } = useParams();
  const profileDetailsData = useSelector((state) => state.profileDetails);
  const [profileDetails, setProfileDetails] = useState(profileDetailsData);
  const [profilePicture, setProfilePicture] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [validGithubUrl, setValidGithubUrl] = useState(true);
  const [validLinkedInUrl, setValidLinkedInUrl] = useState(true);
  const [validTwitterUrl, setValidTwitterUrl] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await appwrite.getProfileDetails(userId);
        setProfileDetails(userDetails);
        setProfilePicture(userDetails.profilePicture);
        setName(userDetails.name);
        setEmail(userDetails.email);
        setLinkedInUrl(userDetails.linkedInUrl);
        setTwitterUrl(userDetails.twitterUrl);
        setGithubUrl(userDetails.githubUrl);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching user details:", error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
    appwrite.uploadFile(file).then((res) => {
      setProfilePicture(res.$id);
    }).catch((error) => {
      console.log("Upload Profile Picture Error", error);
    });
  };

  const updateUserProfile = async () => {
    const data = {
      name,
      email,
      linkedInUrl,
      twitterUrl,
      githubUrl,
      profilePicture,
    };

    if (!validateUrls()) return;

    setLoading(true);
    try {
      const updatedUser = await appwrite.updateProfile(userId, data);
      if (updatedUser) {
        const userDetails = await appwrite.getProfileDetails(userId);
        dispatch(setSliceProfileDetails(userDetails));
      }
      setLoading(false);
      alert('User Profile Updated Successfully');
    } catch (error) {
      setLoading(false);
      console.log("Update User Profile Error", error);
    }
  };

  const validateUrls = () => {
    let isValid = true;

    setValidLinkedInUrl(!linkedInUrl || /^(https:\/\/www.linkedin.com\/in\/)([A-Za-z0-9_-]+)(\/)?$/.test(linkedInUrl));
    setValidTwitterUrl(!twitterUrl || /^(https:\/\/twitter.com\/)([A-Za-z0-9_-]+)(\/)?$/.test(twitterUrl));
    setValidGithubUrl(!githubUrl || /^(https:\/\/github.com\/)([A-Za-z0-9_-]+)(\/)?$/.test(githubUrl));
    setIsNameValid(name.trim() !== '');

    if (!validLinkedInUrl || !validTwitterUrl || !validGithubUrl || !isNameValid) {
      isValid = false;
    }

    return isValid;
  };

  const uploadNewImage = () => {
    document.querySelector('input[type="file"]').click();
  };

  return (
    <div>
      <Animator>
        {loading && <div className="w-full h-screen"><Loader /></div>}
        <Container>
          <div className="flex items-center gap-1 text-sm px-4 md:px-12 lg:px-24 py-4">
            <Link to="/">Home</Link>
            <GrFormNext className="text-xs" />
            <Link to="/admin/users">Users</Link>
            <GrFormNext className="text-xs" />
            <Link to={`/admin/users/edit/${userId}`}>Edit User</Link>
          </div>

          {profileDetails && (
            <div className="flex flex-col lg:flex-row gap-10 px-4 sm:px-8 lg:px-24 py-8 items-center lg:items-start">
              {/* Profile Pic + Info */}
              <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/4 flex flex-col items-center gap-4">
                <div className="relative">
                  <img
                    className="w-24 h-24 sm:w-32 sm:h-32 lg:w-44 lg:h-44 rounded-full border-2 dark:border-[#222F3E] shadow-xl object-cover"
                    src={profilePicture ? appwrite.getFilePreviewUrl(profilePicture) : '/image.png'}
                    alt="Profile"
                  />
                  <div onClick={uploadNewImage} className="absolute bottom-0 right-0 bg-white rounded-full p-2 sm:p-3 text-xl sm:text-2xl border shadow cursor-pointer">
                    <AiOutlineCloudUpload className="text-gray-800" />
                  </div>
                </div>
                <input className="hidden" type="file" onChange={handleChange} />
                <div className="text-center">
                  <h1 className="text-base font-medium">{name}</h1>
                  <p className="text-sm text-gray-500">{email}</p>
                </div>
              </div>

              {/* Form */}
              <div className="w-full lg:w-3/4">
                <h1 className="text-lg font-semibold mb-4">Edit User Profile</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="text-xs font-bold">Full Name</label>
                    <input
                      className="w-full border-2 p-2 rounded dark:bg-[#222F3E] dark:border-[#222F3E]"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {!isNameValid && <p className="text-red-500 text-xs">Please enter a valid name</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-bold">Email</label>
                    <input
                      className="w-full border-2 p-2 rounded dark:bg-[#222F3E] dark:border-[#222F3E]"
                      type="text"
                      value={email}
                      readOnly
                    />
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="text-xs font-bold">LinkedIn</label>
                    <input
                      className="w-full border-2 p-2 rounded dark:bg-[#222F3E] dark:border-[#222F3E]"
                      type="text"
                      value={linkedInUrl}
                      onChange={(e) => setLinkedInUrl(e.target.value)}
                    />
                    {!validLinkedInUrl && <p className="text-red-500 text-xs">Invalid LinkedIn URL</p>}
                  </div>

                  {/* Twitter */}
                  <div>
                    <label className="text-xs font-bold">Twitter</label>
                    <input
                      className="w-full border-2 p-2 rounded dark:bg-[#222F3E] dark:border-[#222F3E]"
                      type="text"
                      value={twitterUrl}
                      onChange={(e) => setTwitterUrl(e.target.value)}
                    />
                    {!validTwitterUrl && <p className="text-red-500 text-xs">Invalid Twitter URL</p>}
                  </div>

                  {/* GitHub */}
                  <div>
                    <label className="text-xs font-bold">GitHub</label>
                    <input
                      className="w-full border-2 p-2 rounded dark:bg-[#222F3E] dark:border-[#222F3E]"
                      type="text"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                    />
                    {!validGithubUrl && <p className="text-red-500 text-xs">Invalid GitHub URL</p>}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={updateUserProfile}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                  >
                    Update User Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Animator>
    </div>
  );
}

export default EditUser;
