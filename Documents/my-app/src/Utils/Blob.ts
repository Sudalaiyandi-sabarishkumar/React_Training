export class Blobs {
    static handleAddPhoto = (
        event: React.ChangeEvent<HTMLInputElement>,
        callback: (base64: string) => void
      ) => {
        const file = event.target.files?.[0];
        if (!file) return;
      
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string; // this is a data URL
          callback(base64);
        };
        reader.readAsDataURL(file); // convert Blob/File to base64
      };
}