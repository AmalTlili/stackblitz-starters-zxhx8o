export const blobToBase64 = (blob: Blob): Promise<string> => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64 = base64String.split(',')[1]; // Extract the Base64 data from the result
        resolve(base64);
      };
    });
  };
  