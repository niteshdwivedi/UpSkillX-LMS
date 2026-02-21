// FILE: frontend/src/utils/youtubeHelpers.js

export const getEmbedUrl = (url) => {
  if (!url) return "";

  if (url.includes("watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes("playlist?list=")) {
    const listId = url.split("list=")[1];
    return `https://www.youtube.com/embed/videoseries?list=${listId}`;
  }

  return "";
};

export const getThumbnail = (url) => {
  if (!url) return null;

  if (url.includes("watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  return "https://i.imgur.com/8Km9tLL.png";
};