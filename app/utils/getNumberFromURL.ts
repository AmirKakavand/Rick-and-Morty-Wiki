// Function to extract the number at the end of the URL
function getNumberFromUrl(url: string) {
  const match = url.match(/\/(\d+)(?:\/)?$/);
  return match ? parseInt(match[1]) : null;
}

export default getNumberFromUrl;