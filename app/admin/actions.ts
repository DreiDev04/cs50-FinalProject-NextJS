import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

if (!process.env.NEXT_AWS_S3_REGION) {
  throw new Error("NEXT_AWS_S3_REGION is not defined");
}
if (!process.env.NEXT_AWS_S3_ACCESS_KEY_ID) {
  throw new Error("NEXT_AWS_S3_ACCESS_KEY_ID is not defined");
}
if (!process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY) {
  throw new Error("NEXT_AWS_S3_SECRET_ACCESS_KEY is not defined");
}
const s3AccessKeyId: string = process.env.NEXT_AWS_S3_ACCESS_KEY_ID as string;
const s3SecretAccessKey: string = process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY as string;

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: s3AccessKeyId,
    secretAccessKey: s3SecretAccessKey,
  },
});

// Upload file to S3
const uploadFileToS3 = async (
  buffer: Buffer,
  contentType: string,
  imageName: string
): Promise<string | undefined> => {
  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME || "cs50-tinadaahan",
    Key: `${contentType}/${imageName}-${Date.now()}`,
    Body: buffer,
    ContentType: contentType,
  };

  const command = new PutObjectCommand(params);
  try {
    const response = await s3Client.send(command);
    console.log("Successfully uploaded file to S3", response);
    const objectUrl = `https://cs50-tindahan.s3.ap-southeast-2.amazonaws.com/${params.Key}`;
    return objectUrl;
  } catch (error) {
    console.error("Failed to upload file to S3", error);
  }
};

// Upload product
export async function uploadProduct(prevState: any, formData: FormData) {
  try {
    const image = formData.get("image") as File;

    if (!image || image.size === 0) {
      return { status: "failed", message: "Please select an image" };
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const imgName = image.name.replace(/\./g, "_").replace(/ /g, "-");
    const objectUrl = await uploadFileToS3(buffer, image.type, imgName);

    if (!objectUrl) {
      return { status: "failed", message: "Failed to upload image" };
    }

    return { status: "success", message: objectUrl };
  } catch (error) {
    console.error("Failed to upload product: ", error);
    return { status: "failed", message: "Failed to add product" };
  }
}
