import Address from "./address";

type Profile = {
  id: number;
  name: string;
  email: string;
  defaultDeliveryAddress: Address;
  image: string;
  description: string;
  phoneNumber: string;
  balance: number;
  role: string;
};

export default Profile;
