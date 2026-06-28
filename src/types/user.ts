export interface User {
  id: number;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  hasLoan: boolean;
  hasSavings: boolean;
  accountBalance: string;
  accountNumber: string;
  tier: number;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  residenceType: string;
  education: string;
  employmentStatus: string;
  sector: string;
  duration: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  twitter: string;
  facebook: string;
  instagram: string;
  guarantors: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  }[];
}
