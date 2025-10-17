import qrcode from "qrcode";

// Generate QR code in base64 format for a waste request
export const generateQRCode = async (data) => {
  try {
    return await qrcode.toDataURL(data);
  } catch (error) {
    console.error("QR generation failed:", error.message);
    throw new Error("QR code generation failed");
  }
};
