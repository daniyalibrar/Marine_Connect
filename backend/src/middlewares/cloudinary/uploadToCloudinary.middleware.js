const cloudinary = require("../../config/cloudinary.config");

// Upload Course Image to Cloudinary
const uploadCourseImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      folder: "course_images",
      transformation: [
        { width: 500 },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    });
    return result;
  } catch (error) {
    return null;
  }
};

// Upload Course Topic PDF to Cloudinary
const uploadTopicPDF = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      format: "pdf",
      folder: "course_topic_files",
    });
    return result;
  } catch (error) {
    return null;
  }
};

// Upload Course Topic Video to Cloudinary
const uploadTopicVideo = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      folder: "course_topic_videos",
      transformation: [{ quality: "auto", format: "f_auto" }],
    });
    return result;
  } catch (error) {
    return null;
  }
};

// Upload profile picture/logo to Cloudinary
const uploadProfilePicture = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      folder: "profile_pictures",
      transformation: [
        { width: 200 },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    });
    return result;
  } catch (error) {
    return null;
  }
};

// Upload Job Seeker Resume(PDF) to Cloudinary
const uploadJobSeekerResume = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      format: "pdf",
      folder: "job_seeker_resumes",
    });
    return result;
  } catch (error) {
    return null;
  }
};

module.exports = {
  uploadCourseImage,
  uploadTopicPDF,
  uploadTopicVideo,
  uploadProfilePicture,
  uploadJobSeekerResume,
};
