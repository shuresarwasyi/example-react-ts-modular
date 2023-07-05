import { Member } from "../entities/Member";
import { sendRequest } from "../utils/apiRequest";

/**
 * Fetches the list of members.
 * @returns A promise that resolves to an array of Member objects.
 * @throws Error if the API request fails.
 */
export async function getMemberList(): Promise<Member[]> {
  try {
    const response = await sendRequest("provider2", "GET", "user.json");

    const members = response.data.data;

    const output: Member[] = members.map((member: any) => {
      return {
        id: member.id,
        email: member.email,
        name: member.full_name,
        age: member.age,
      };
    });

    return output;
  } catch (error) {
    throw new Error("Failed to fetch user data.");
  }
}
