import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UsersTable from "./UsersTable";
import { useSearchStore } from "../../store/useSearchStore";
import type { User } from "../../types/user";

jest.mock("../../store/useSearchStore", () => ({
    useSearchStore: jest.fn(),
}));

jest.mock("../../hooks/useDebounce", () => ({
    useDebounce: (value: string) => value,
}));

const mockUsers: User[] = [
    {
        id: 1,
        organization: "Lendsqr",
        username: "Grace Effiom",
        email: "grace@example.com",
        phoneNumber: "08012345678",
        dateJoined: "May 15, 2020 10:00 AM",
        status: "Active",
        hasLoan: false,
        hasSavings: true,
        accountBalance: "NGN 200,000.00",
        accountNumber: "1234567890",
        tier: 2,
        bvn: "12345678901",
        gender: "Female",
        maritalStatus: "Single",
        children: "None",
        residenceType: "Apartment",
        education: "B.Sc",
        employmentStatus: "Employed",
        sector: "FinTech",
        duration: "2 years",
        officeEmail: "grace@lendsqr.com",
        monthlyIncome: "NGN 100,000 - NGN 200,000",
        loanRepayment: "NGN 20,000",
        twitter: "@grace",
        facebook: "Grace Effiom",
        instagram: "@grace.effiom",
        guarantors: [],
    },
    {
        id: 2,
        organization: "Irorun",
        username: "Irene Chukwu",
        email: "irene@example.com",
        phoneNumber: "08087654321",
        dateJoined: "June 20, 2021 09:30 AM",
        status: "Pending",
        hasLoan: true,
        hasSavings: false,
        accountBalance: "NGN 80,000.00",
        accountNumber: "0987654321",
        tier: 1,
        bvn: "10987654321",
        gender: "Female",
        maritalStatus: "Married",
        children: "Two",
        residenceType: "Owner",
        education: "M.Sc",
        employmentStatus: "Self-employed",
        sector: "Retail",
        duration: "5 years",
        officeEmail: "irene@irorun.com",
        monthlyIncome: "NGN 200,000 - NGN 300,000",
        loanRepayment: "NGN 40,000",
        twitter: "@irene",
        facebook: "Irene Chukwu",
        instagram: "@irene.chukwu",
        guarantors: [],
    },
];

const setSearchQueryMock = jest.fn();
const useSearchStoreMock = useSearchStore as unknown as jest.Mock & {
    getState: jest.Mock;
};

const renderUsersTable = (users = mockUsers) => render(
    <MemoryRouter>
        <UsersTable users={users} />
    </MemoryRouter>,
);

describe("UsersTable", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useSearchStoreMock.mockReturnValue({
            searchQuery: "",
            setSearchQuery: setSearchQueryMock,
        });
        useSearchStoreMock.getState = jest.fn(() => ({
            searchQuery: "",
            setSearchQuery: setSearchQueryMock,
        }));
    });

    it("renders a list of users when data is available", () => {
        renderUsersTable();

        expect(screen.getByText("Grace Effiom")).toBeInTheDocument();
        expect(screen.getByText("Irene Chukwu")).toBeInTheDocument();
        expect(screen.getByText("grace@example.com")).toBeInTheDocument();
        expect(screen.getByText("Irorun")).toBeInTheDocument();
    });

    it("filters users by the search query from the store", () => {
        useSearchStoreMock.mockReturnValue({
            searchQuery: "irene",
            setSearchQuery: setSearchQueryMock,
        });

        renderUsersTable();

        expect(screen.getByText("Irene Chukwu")).toBeInTheDocument();
        expect(screen.queryByText("Grace Effiom")).not.toBeInTheDocument();
    });

    it("shows an empty state when no users match the search query", () => {
        useSearchStoreMock.mockReturnValue({
            searchQuery: "NonExistentUser",
            setSearchQuery: setSearchQueryMock,
        });

        renderUsersTable();

        expect(screen.getByRole("heading", { name: /no users found/i })).toBeInTheDocument();
        expect(screen.getByText(/there are no users matching your search criteria/i)).toBeInTheDocument();
    });

    it("shows an empty state when the users array is empty", () => {
        renderUsersTable([]);

        expect(screen.getByRole("heading", { name: /no users found/i })).toBeInTheDocument();
    });

    it("resets filters and the search query when Clear Filters is clicked", () => {
        useSearchStoreMock.mockReturnValue({
            searchQuery: "NonExistentUser",
            setSearchQuery: setSearchQueryMock,
        });

        renderUsersTable();

        fireEvent.click(screen.getByRole("button", { name: /clear filters/i }));

        expect(setSearchQueryMock).toHaveBeenCalledWith("");
    });
});
