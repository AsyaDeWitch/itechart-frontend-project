const fromFileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

/* const fromUrlToFile = (fileUrl: string): Promise<File> =>
  new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", fileUrl, true);
    request.responseType = "blob";
    request.onload = () => resolve(request.response);
    request.onerror = (error) => reject(error);
  });

export async function fromUrlToBase64(fileUrl: string): Promise<string> {
  const file = await fromUrlToFile(fileUrl);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  let result = "";
  // eslint-disable-next-line no-return-assign
  reader.onload = () => (result = reader.result as string);
  reader.onerror = (error) => error;

  return result;
} */

export default fromFileToBase64;
