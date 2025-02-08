import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      console.log("action", action);

      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    currencyConverting(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

//thunk middleware for async actions

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // eslint-disable-next-line no-unused-vars
  return async function (dispatch, getState) {
    // Api call
    dispatch({ type: "account/currencyConverting" });
    const resp = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}?&from=${currency}&to=USD`
    );
    const data = await resp.json();
    console.log(data);
    const convertedAmount = data.rates?.USD;

    // return action
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

export default accountSlice.reducer;
// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,

//         isLoading: false,
//       };
//     case "account/withdraw":
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };

//     case "account/loan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/currencyConverting":
//       return {
//         ...state,
//         isLoading: true,
//       };

//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         balance: state.balance - state.loan,
//         loanPurpose: "",
//       };
//     default:
//       return state;
//   }
// }

// // Action creators

// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   // eslint-disable-next-line no-unused-vars
//   return async function (dispatch, getState) {
//     // Api call
//     dispatch({ type: "account/currencyConverting" });
//     // fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`)
//     //   .then((resp) => resp.json())
//     //   .then((data) => {
//     //     const convertedAmount = (amount * data.rates["USD"]).toFixed(2);
//     //     console.log(convertedAmount);

//     //     return dispatch({ type: "account/deposit", payload: convertedAmount });
//     //     alert(`${amount} ${from} = ${convertedAmount} ${to}`);
//     //   });
//     const resp = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}?&from=${currency}&to=USD`
//     );
//     const data = await resp.json();
//     console.log(data);

//     const convertedAmount = data.rates.USD;

//     // return action

//     dispatch({ type: "account/deposit", payload: convertedAmount });
//   };
// }

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return { type: "account/loan", payload: { amount, purpose } };
// }

// export function payLoan() {
//   return { type: "account/payLoan" };
// }
