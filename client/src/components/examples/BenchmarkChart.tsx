import BenchmarkChart from '../BenchmarkChart';

export default function BenchmarkChartExample() {
  return (
    <div className="p-8">
      <BenchmarkChart
        userAmount={58500}
        asfaComfortable={72000}
        asfaModest={46620}
        agePension={35849}
      />
    </div>
  );
}
