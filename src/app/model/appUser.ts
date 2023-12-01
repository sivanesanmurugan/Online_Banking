import { Account } from "./account";
import { UserProfile } from "./user-profile";

export interface AppUser {
  id: number;
  username: String;
  password: String;
  role: String;
  userDetail?: UserProfile;
  accounts?: Account[];
  createdAt?: string;
}
