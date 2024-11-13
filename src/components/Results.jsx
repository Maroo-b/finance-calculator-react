import { calculateInvestmentResults, formatter } from "../util/investment";

export default function Results({ input }) {
  const data = calculateInvestmentResults(input);
  const { initialInvestment } = input;
  function totalInterest({ valueEndOfYear, annualInvestment, year }) {
    return valueEndOfYear - annualInvestment * year - initialInvestment;
  }

  function totalAmountInvested(entry) {
    const { valueEndOfYear } = entry;
    return valueEndOfYear - totalInterest(entry);
  }

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry) => {
          return (
            <tr key={entry.year}>
              <td>{entry.year}</td>
              <td>{formatter.format(entry.valueEndOfYear)}</td>
              <td>{formatter.format(entry.interest)}</td>
              <td>{formatter.format(totalInterest(entry))}</td>
              <td>{formatter.format(totalAmountInvested(entry))}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
