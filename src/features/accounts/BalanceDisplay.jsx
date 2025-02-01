import { connect } from "react-redux";

// old to subscribe to the redux store using the connect API
function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

function mapStateToProps(store) {
  return {
    balance: store.account.balance,
  };
}

export default connect(mapStateToProps)(BalanceDisplay);
