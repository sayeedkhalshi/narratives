// src/components/design/RightSideDrawer.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { openDrawer } from "@/redux/features/drawer.slice";
import RightSideDrawer from "@/components/universal-designs/drawer/RightSideDrawer";

function renderWithProvider(ui: React.ReactNode) {
    return render(<Provider store={store}>{ui}</Provider>);
}

describe("RightSideDrawer (with real store)", () => {
    beforeEach(() => {
        // Reset state before each test
        store.dispatch({ type: "drawer/close" });
    });

    it("renders when open", () => {
        store.dispatch(openDrawer());
        renderWithProvider(<RightSideDrawer />);

        expect(
            screen.getByText(/This is the drawer content/i)
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /close drawer/i })
        ).toBeInTheDocument();
    });

    it("is hidden when closed", () => {
        renderWithProvider(<RightSideDrawer />);
        const drawer = screen.getByRole("complementary");
        expect(drawer).toHaveClass("translate-x-full");
    });

    it("closes when clicking the backdrop", () => {
        store.dispatch(openDrawer());
        renderWithProvider(<RightSideDrawer />);

        fireEvent.click(screen.getByTestId("drawer-backdrop"));

        const drawer = screen.getByRole("complementary");
        expect(drawer).toHaveClass("translate-x-full");
    });

    it("closes when clicking the close button", () => {
        store.dispatch(openDrawer());
        renderWithProvider(<RightSideDrawer />);

        fireEvent.click(screen.getByRole("button", { name: /close drawer/i }));

        const drawer = screen.getByRole("complementary");
        expect(drawer).toHaveClass("translate-x-full");
    });
});
