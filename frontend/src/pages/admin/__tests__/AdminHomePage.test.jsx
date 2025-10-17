import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminHomePage from "../AdminHomePage";
import wisewasteAPI from "../../../api/wiseWasteAPI";

// Mock API module
jest.mock("../../../api/wiseWasteAPI", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

// Mock child components to simplify rendering
jest.mock("../../../components/AdminNav", () => () => <div data-testid="admin-nav" />);
jest.mock("../../../components/Footer", () => () => <div data-testid="footer" />);
jest.mock("../../../components/Map", () => (props) => (
  <div
    data-testid="map"
    onClick={() =>
      props.onRequestSelect({
        _id: "1",
        wasteCode: "WC123",
        pickupOption: "Flexible Pickup",
        status: "pending",
        wasteItems: [],
        location: { address: "Test Address" },
      })
    }
  >
    Mock Map
  </div>
));
jest.mock("../../../components/Button", () => ({ text, onClick, className }) => (
  <button data-testid={text} onClick={onClick} className={className}>
    {text}
  </button>
));
jest.mock("../../../components/AdminStats", () => () => <div data-testid="admin-stats" />);

describe("AdminHomePage", () => {
  const mockWasteRequests = [
    {
      _id: "1",
      user: { name: "Alice" },
      location: { address: "123 Street" },
      wasteItems: [{ type: "Plastic", quantity: 5 }],
      status: "pending",
      pickupOption: "Flexible Pickup",
    },
    {
      _id: "2",
      user: { name: "Bob" },
      location: { address: "456 Avenue" },
      wasteItems: [{ type: "Metal", quantity: 10 }],
      status: "assigned",
      pickupOption: "Scheduled Pickup",
      pickupDate: "2024-10-20T00:00:00Z",
      assignedDriver: { name: "Driver1" },
    },
  ];

  const mockDrivers = [
    { _id: "d1", name: "Driver1" },
    { _id: "d2", name: "Driver2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    wisewasteAPI.get.mockImplementation((url) => {
      if (url.includes("all-waste-requests")) return Promise.resolve({ data: mockWasteRequests });
      if (url.includes("drivers")) return Promise.resolve({ data: mockDrivers });
    });
  });

  it("renders the Admin Dashboard correctly", async () => {
    render(<AdminHomePage />);
    expect(await screen.findByText("Admin Dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("admin-nav")).toBeInTheDocument();
    expect(screen.getByTestId("admin-stats")).toBeInTheDocument();
  });

  it("loads waste requests and drivers from API", async () => {
    render(<AdminHomePage />);
    await waitFor(() => {
      expect(wisewasteAPI.get).toHaveBeenCalledWith("/waste-requests/all-waste-requests");
      expect(wisewasteAPI.get).toHaveBeenCalledWith("/users/drivers");
    });
    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("filters requests by status", async () => {
    render(<AdminHomePage />);
    await screen.findByText("Alice");
    fireEvent.click(screen.getByText("Pending"));
    expect(screen.getByText("Alice")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Assigned"));
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("selects a request from the map and shows details", async () => {
    render(<AdminHomePage />);
    await waitFor(() => screen.getByTestId("map"));
    fireEvent.click(screen.getByTestId("map"));
    expect(await screen.findByText(/Waste Collection Request/)).toBeInTheDocument();
    expect(screen.getByText("Waste Code:")).toBeInTheDocument();
  });

  it("assigns a driver successfully", async () => {
    wisewasteAPI.post.mockResolvedValue({ data: {} });
    render(<AdminHomePage />);
    await waitFor(() => screen.getByTestId("map"));
    fireEvent.click(screen.getByTestId("map")); // select a request

    fireEvent.change(screen.getByLabelText("Select Driver:"), { target: { value: "d1" } });
    fireEvent.click(screen.getByText("Assign Driver"));

    await waitFor(() =>
      expect(wasteAPI.post).toHaveBeenCalledWith(
        "/waste-requests/assign-driver",
        expect.objectContaining({ driverId: "d1", requestId: "1" })
      )
    );
  });

  it("opens and closes the reject modal", async () => {
    render(<AdminHomePage />);
    await waitFor(() => screen.getByTestId("map"));
    fireEvent.click(screen.getByTestId("map")); // select request

    fireEvent.click(screen.getByText("Reject"));
    expect(await screen.findByText("Reject Waste Request")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));
    await waitFor(() => {
      expect(screen.queryByText("Reject Waste Request")).not.toBeInTheDocument();
    });
  });

  it("rejects a request successfully", async () => {
    wisewasteAPI.post.mockResolvedValue({});
    render(<AdminHomePage />);
    await waitFor(() => screen.getByTestId("map"));
    fireEvent.click(screen.getByTestId("map"));
    fireEvent.click(screen.getByText("Reject"));

    fireEvent.change(screen.getByLabelText(/Select Preferred Pickup Date/i), {
      target: { value: "2025-10-20" },
    });
    fireEvent.click(screen.getByText("Confirm Reject"));

    await waitFor(() =>
      expect(wisewasteAPI.post).toHaveBeenCalledWith(
        "/waste-requests/reject-request",
        expect.objectContaining({ message: "Not eligible" })
      )
    );
  });
});
