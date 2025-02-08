import { S3Client, PutObjectCommand, HeadObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

interface ThumbnailUrlParams {
  userUrl: string;
}

function extractDomain(userUrl: string): string | null {
  try {
    const { hostname } = new URL(userUrl);
    return hostname;
  } catch (error) {
    console.error("Invalid URL:", userUrl, error);
    return null;
  }
}

async function getThumbnailUrl({ userUrl }: ThumbnailUrlParams): Promise<string> {
  const token = process.env.LOGO_DEV_TOKEN || "";
  if (!token) {
    throw new Error("LOGO_DEV_TOKEN is not set");
  }

  const domain = extractDomain(userUrl);
  if (!domain) {
    throw new Error("Invalid URL");
  }

  // Construct the Logo.dev URL (adjust according to Logo.dev documentation)
  const logoApiUrl = `https://img.logo.dev/${domain}?token=${token}`;

  // Use a deterministic key so that each domain always maps to the same object.
  const key = `thumbnail/${domain}.png`;

  const bucketName = process.env.AWS_BUCKET_NAME;
  const bucketRegion = process.env.AWS_BUCKET_REGION;
  if (!bucketName || !bucketRegion) {
    throw new Error("S3_BUCKET_NAME or AWS_BUCKET_REGION is not set in environment variables");
  }

  // --- Check if the logo already exists in S3 ---
  try {
    await s3Client.send(new HeadObjectCommand({
      Bucket: bucketName,
      Key: key,
    }));
    // If no error is thrown, the object exists.
    const getObjectCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    // Generate a signed URL that expires in 1 hour (3600 seconds)
    const signedUrl = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 });
    return signedUrl;
  } catch (error: any) {
    // Only continue if the object does not exist (404/NotFound error)
    if (error.name !== 'NotFound' && error.$metadata?.httpStatusCode !== 404) {
      console.error('Error checking for existing logo:', error);
      return 'Error checking for existing logo';
    }
  }

  // --- If the logo is not in S3, fetch it from Logo.dev and upload it ---
  try {
    const response = await fetch(logoApiUrl);
    if (!response.ok) {
      return 'Failed to fetch logo image';
    }

    // Retrieve the image as a Buffer.
    const buffer = Buffer.from(await response.arrayBuffer());

    // Upload the image to S3 using the deterministic key.
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: 'image/png',
    });
    await s3Client.send(putCommand);

    // After uploading, generate a signed URL to access the object.
    const getObjectCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    const signedUrl = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 });
    return signedUrl;
  } catch (error) {
    console.error('Error downloading and uploading logo:', error);
    return 'Failed to download and upload logo';
  }
}

export default getThumbnailUrl;
