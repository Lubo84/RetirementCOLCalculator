import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProgressIndicator from "./ProgressIndicator";
import CostBreakdown from "./CostBreakdown";
import PercentageToggle from "./PercentageToggle";
import BenchmarkChart from "./BenchmarkChart";
import InfoCard from "./InfoCard";
import { FileDown, RotateCcw, ArrowLeft, ExternalLink, AlertCircle, CheckCircle } from "lucide-react";

interface ResultsPageProps {
  weeklyAmount: number;
  yearlyAmount: number;
  isCouple: boolean;
  isHomeOwner: boolean;
  yearsToRetirement: string;
  onBack: () => void;
  onRestart: () => void;
}

export default function ResultsPage({
  weeklyAmount,
  yearlyAmount,
  isCouple,
  isHomeOwner,
  yearsToRetirement,
  onBack,
  onRestart,
}: ResultsPageProps) {
  const [percentage, setPercentage] = useState(100);

  const adjustedWeekly = (weeklyAmount * percentage) / 100;
  const adjustedYearly = (yearlyAmount * percentage) / 100;

  const asfaComfortable = isCouple ? 72000 : 52085;
  const asfaModest = isCouple ? 46620 : 32300;
  const basePension = isCouple ? 46202 : 30646;
  const rentAssistance = isCouple ? 5283 : 5600;
  const agePension = isHomeOwner ? basePension : basePension + rentAssistance;

  const getTimeframeMessage = () => {
    if (yearsToRetirement === "<5") {
      return {
        icon: <CheckCircle className="h-5 w-5 text-chart-4 flex-shrink-0" />,
        text: "As you're within 5 years of retirement, this estimate provides a reasonable indication of your likely retirement income needs.",
        color: "bg-chart-4/10 border-chart-4/20",
      };
    } else if (yearsToRetirement === ">10") {
      return {
        icon: <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />,
        text: "With more than 10 years until retirement, use this as a guide only. We recommend reviewing your estimate periodically as your circumstances change and you get closer to retirement.",
        color: "bg-amber-50 border-amber-200",
      };
    }
    return {
      icon: <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />,
      text: "With 5-10 years until retirement, this provides a good baseline estimate. Consider reviewing it annually as you approach retirement age.",
      color: "bg-blue-50 border-blue-200",
    };
  };

  const timeframeMessage = getTimeframeMessage();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <ProgressIndicator currentStep={3} totalSteps={3} />
          <h2 className="text-3xl font-semibold text-foreground mt-6 mb-2">
            Your Retirement Cost of Living Snapshot
          </h2>
          <p className="text-muted-foreground">
            Here's your estimated cost of living in retirement
          </p>
        </div>

        <div className="space-y-8">
          <CostBreakdown weeklyAmount={adjustedWeekly} yearlyAmount={adjustedYearly} />

          <Card className="p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Adjust for Retirement Lifestyle
            </h3>
            <InfoCard className="mb-6">
              <p>
                As a rule of thumb, you typically need between <strong>70-90% of your current cost of living</strong> in 
                retirement. Work-related expenses like commuting, professional clothing, and daily coffees are no longer 
                applicable. Use the toggle below to see how your retirement needs might differ.
              </p>
            </InfoCard>
            <PercentageToggle value={percentage} onChange={setPercentage} />
          </Card>

          <Card className={`p-6 border ${timeframeMessage.color}`}>
            <div className="flex gap-3">
              {timeframeMessage.icon}
              <p className="text-sm text-foreground">{timeframeMessage.text}</p>
            </div>
          </Card>

          <BenchmarkChart
            userAmount={adjustedYearly}
            asfaComfortable={asfaComfortable}
            asfaModest={asfaModest}
            agePension={agePension}
          />

          <Card className="p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Understanding the Benchmarks
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-3 w-3 rounded-sm bg-chart-2" />
                  <h4 className="font-semibold text-foreground">ASFA Comfortable</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  ${asfaComfortable.toLocaleString()} per year for a {isCouple ? "couple" : "single person"}. 
                  Covers private health insurance, regular dining out, domestic and occasional international travel, 
                  and a good standard of living.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-3 w-3 rounded-sm bg-chart-3" />
                  <h4 className="font-semibold text-foreground">ASFA Modest</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  ${asfaModest.toLocaleString()} per year for a {isCouple ? "couple" : "single person"}. 
                  Covers basic health cover, limited leisure and travel, and essential needs. Better than relying 
                  on the Age Pension alone.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-3 w-3 rounded-sm bg-chart-4" />
                  <h4 className="font-semibold text-foreground">Full Age Pension</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  ${agePension.toLocaleString()} per year for a {isCouple ? "couple" : "single person"}
                  {!isHomeOwner && " including maximum rent assistance"}. The maximum government support available, 
                  subject to income and asset tests.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-hostplus-yellow-light border-hostplus-yellow/20">
            <h3 className="text-xl font-semibold text-foreground mb-4">Next Steps</h3>
            <p className="text-foreground mb-6">
              You've just taken the first step by calculating your current cost of living. Now, see how you're tracking for retirement.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Use our <strong>Retirement Projection Calculator</strong> to estimate how your super and other savings stack up 
              against your future income needs. Your inputs from this calculator will carry over automatically—you'll just need 
              to add a few extra details like your super balance, expected retirement age, etc.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Seeing if you're on track helps you plan with confidence—and make changes if needed.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-hostplus-navy hover:bg-hostplus-navy-dark text-white"
              data-testid="button-projection-calculator"
            >
              <a
                href="https://hostplus.com.au/members/retirement/forms-and-resources/super-calculator"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to Retirement Projection Calculator
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </Card>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={onBack}
                data-testid="button-back"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onRestart}
                data-testid="button-restart"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Start Over
              </Button>
            </div>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground"
              onClick={() => console.log('Generate PDF')}
              data-testid="button-generate-pdf"
            >
              <FileDown className="mr-2 h-5 w-5" />
              Generate PDF Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
