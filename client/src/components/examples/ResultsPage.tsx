import ResultsPage from '../ResultsPage';

export default function ResultsPageExample() {
  return (
    <ResultsPage
      weeklyAmount={1250.50}
      yearlyAmount={65026.00}
      isCouple={true}
      isHomeOwner={true}
      yearsToRetirement="5-10"
      onBack={() => console.log('Back clicked')}
      onRestart={() => console.log('Restart clicked')}
    />
  );
}
