export function readFileDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
    fileReader.onerror = (ex) => reject(ex);
    fileReader.readAsDataURL(blob);
  });
}
