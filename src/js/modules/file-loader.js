export const fileLoader = {
  getFileAsTxt: (reference) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(reference);
    });
  }
};
