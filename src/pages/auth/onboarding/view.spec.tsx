// import { render, screen, fireEvent } from "@testing-library/react";
// import {OnboardingForm} from "./view";

// test("renders first name and last name input fields", () => {
//   render(<OnboardingForm />);

//   const firstNameInput = screen.getByPlaceholderText("First name");
//   const lastNameInput = screen.getByPlaceholderText("Last name");

//   expect(firstNameInput).toBeInTheDocument();
//   expect(lastNameInput).toBeInTheDocument();
// });

// test("updates first name value on input change", () => {
//   render(<OnboardingForm />);

//   const firstNameInput = screen.getByPlaceholderText("First name");

//   fireEvent.change(firstNameInput, { target: { value: "John" } });

//   expect(firstNameInput.value).toBe("John");
// });

// test("updates last name value on input change", () => {
//   render(<OnboardingForm />);

//   const lastNameInput = screen.getByPlaceholderText("Last name");

//   fireEvent.change(lastNameInput, { target: { value: "Doe" } });

//   expect(lastNameInput.value).toBe("Doe");
// });

// test("triggers form submission on continue button click", () => {
//   render(<OnboardingForm />);

//   const continueButton = screen.getByText("Continue");

//   fireEvent.click(continueButton);

//   // Add assertions for form submission here
// });
