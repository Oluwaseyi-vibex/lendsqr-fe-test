import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import UserDetails from "./UserDetails";
import { getUserFromDB, saveUserToDB } from "../../utils/db";
import type { User } from "../../types/user";

jest.mock("../../utils/db");

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

const mockUser: User = {
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
    guarantors: [
        {
            fullName: "Irene Chukwu",
            phoneNumber: "08087654321",
            email: "irene@example.com",
            relationship: "Sister",
        },
    ],
};

const renderUserDetails = (
    initialEntries = ["/users/1"],
    initialIndex?: number,
) => render(
    <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
        <Routes>
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/dashboard/users" element={<h1>Users dashboard</h1>} />
        </Routes>
    </MemoryRouter>,
);

describe("UserDetails", () => {
    const getUserFromDBMock = getUserFromDB as jest.MockedFunction<typeof getUserFromDB>;
    const saveUserToDBMock = saveUserToDB as jest.MockedFunction<typeof saveUserToDB>;
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();
        consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it("shows a spinner and loading message while user details load", () => {
        getUserFromDBMock.mockReturnValue(new Promise(() => undefined));
        const { container } = renderUserDetails();

        expect(screen.getByText(/loading user details/i)).toBeInTheDocument();
        expect(container.querySelector(".spinner")).toBeInTheDocument();
    });

    it("displays user details when the user is cached in IndexedDB", async () => {
        getUserFromDBMock.mockResolvedValue(mockUser);

        renderUserDetails();

        expect(await screen.findByRole("heading", { name: mockUser.username })).toBeInTheDocument();
        expect(screen.getByText(mockUser.accountNumber)).toBeInTheDocument();
        expect(screen.getByText(mockUser.email)).toBeInTheDocument();
        expect(mockFetch).not.toHaveBeenCalled();
    });

    it("fetches user details from JSON and caches them when IndexedDB misses", async () => {
        getUserFromDBMock.mockResolvedValue(undefined);
        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => [mockUser],
        });

        renderUserDetails();

        expect(await screen.findByRole("heading", { name: mockUser.username })).toBeInTheDocument();
        expect(mockFetch).toHaveBeenCalledWith("/users_data.json");
        expect(saveUserToDBMock).toHaveBeenCalledWith(mockUser);
    });

    it("shows a User Not Found empty state when the user does not exist", async () => {
        getUserFromDBMock.mockResolvedValue(undefined);
        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => [],
        });

        renderUserDetails(["/users/999"]);

        expect(await screen.findByRole("heading", { name: /user not found/i })).toBeInTheDocument();
        expect(screen.getByText(/the user you are looking for does not exist/i)).toBeInTheDocument();
        expect(saveUserToDBMock).not.toHaveBeenCalled();
    });

    it("shows a failed load error when the network request fails", async () => {
        getUserFromDBMock.mockResolvedValue(undefined);
        mockFetch.mockRejectedValue(new Error("Network failure"));

        renderUserDetails();

        expect(await screen.findByText(/failed to load user data/i)).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /user not found/i })).toBeInTheDocument();
    });

    it("shows an invalid data format error for malformed JSON data", async () => {
        getUserFromDBMock.mockResolvedValue(undefined);
        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => ({ id: 1 }),
        });

        renderUserDetails();

        expect(await screen.findByText(/invalid data format/i)).toBeInTheDocument();
        expect(saveUserToDBMock).not.toHaveBeenCalled();
    });

    it("navigates back to the users dashboard when Back to Users is clicked", async () => {
        getUserFromDBMock.mockResolvedValue(mockUser);

        renderUserDetails(["/dashboard/users", "/users/1"], 1);

        fireEvent.click(await screen.findByRole("button", { name: /back to users/i }));

        await waitFor(() => {
            expect(screen.getByRole("heading", { name: /users dashboard/i })).toBeInTheDocument();
        });
    });
});
