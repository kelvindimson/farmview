export default async function getAllFarms() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_FARMS_API}`, {
        // next: { revalidate: 3600 },
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      if (!res.ok) {
        const error = new Error("An error occurred while fetching the data.");
        error.cause = { res };
        throw error;
      }
      const farms = await res.json();
      return farms;
    } catch (error: any) {
      const statusCode = error?.cause?.res?.status;
      switch (statusCode) {
        case 400: 
          console.error("Bad Request: The server could not understand the request.");
          break;
        case 401: 
          console.error("Unauthorized: Access is denied due to invalid credentials.");
          break;
        case 404: 
          console.error("Not Found: The requested resource could not be found.");
          break;
        case 500: 
          console.error("Internal Server Error: An error occurred on the server.");
          break;
        default:
          console.error("An unexpected error occurred.");
          break;
      }
      throw error;
    }
}