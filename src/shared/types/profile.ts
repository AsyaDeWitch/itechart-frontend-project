import Address from "./address";

type Profile = {
  id: number;
  name: string;
  email: string;
  defaultDeliveryAddress: Address;
  image: string;
  description: string;
  phoneNumber: string;
};

export default Profile;
