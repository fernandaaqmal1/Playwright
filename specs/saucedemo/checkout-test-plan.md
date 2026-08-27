# Checkout Test Plan

## Application

- Base URL: `https://www.saucedemo.com/`
- Username: `standard_user`
- Password: `secret_sauce`
- Scope: Checkout
- Browser: Chromium

---

## Normal Test

### TC-CHK-001 — Complete checkout successfully

**Precondition:** Fresh browser state.

#### Steps

1. Open `https://www.saucedemo.com/`.
2. Enter `standard_user` in the Username field.
3. Enter `secret_sauce` in the Password field.
4. Click **Login**.
5. Add **Sauce Labs Backpack** to the cart.
6. Open the shopping cart.
7. Click **Checkout**.
8. Enter:
   - First Name: `John`
   - Last Name: `Doe`
   - Zip/Postal Code: `12345`
9. Click **Continue**.
10. Verify the checkout overview page.
11. Verify the selected product and total price.
12. Click **Finish**.

#### Expected Results

- Login succeeds.
- Product is added to the cart.
- Checkout information is accepted.
- Checkout overview displays the correct product and total.
- Order completes successfully.
- Confirmation message `Thank you for your order!` appears.

---

## Abnormal Test

### TC-CHK-002 — Checkout with missing required information

**Precondition:** Fresh browser state.

#### Steps

1. Open `https://www.saucedemo.com/`.
2. Enter `standard_user` in the Username field.
3. Enter `secret_sauce` in the Password field.
4. Click **Login**.
5. Add **Sauce Labs Backpack** to the cart.
6. Open the shopping cart.
7. Click **Checkout**.
8. Leave First Name, Last Name, and Zip/Postal Code empty.
9. Click **Continue**.

#### Expected Results

- Validation error appears.
- User cannot continue to the checkout overview.
- User remains on the checkout information page.
- No order is created.
- Cart contents remain unchanged.

### TC-CHK-003 — Checkout with invalid postal code

**Precondition:** Fresh browser state.

#### Steps

1. Open `https://www.saucedemo.com/`.
2. Log in using:
   - Username: `standard_user`
   - Password: `secret_sauce`
3. Add **Sauce Labs Backpack** to the cart.
4. Open the shopping cart.
5. Click **Checkout**.
6. Enter:
   - First Name: `John`
   - Last Name: `Doe`
   - Zip/Postal Code: `abc`
7. Click **Continue**.

#### Expected Results

- Invalid postal code is rejected, or an appropriate validation message appears.
- User cannot complete checkout with invalid data.
- No order is created.